"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";
import { PrismaClient } from "@/generated/prisma";

export type MessageBoxData = {
  error?: boolean,
  message: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const messageLifetime = 1000 * 60 * 15; //15 minutes
const wipeFrequency = 1000 * 60; //every minute

const EmailTemplate = (link: string): string => {
  return `
    <table style="background-color: #111; color: #eee; border-spacing: 20px; font-size: 20px;">
      <tr>
        <td>In order for your message to be sent you need to verify the ownership of this email address. To complete the verification process, please click on the button down below:</td>
      </tr>
      <tr>
        <td style="text-align: center;"><a href='${link}' style="text-decoration: none"><span style="display: inline-block; padding: 10px; background-color: #eee; color: #000; border-radius: 3px;">VERIFY</span></a></td>
      </tr>
      <tr>
        <td>If you did not submit the contact form on my website, please ignore this email.</td>
      </tr>
    </table>
  `;
}

const WipeOldMessages = () => {
  const prisma = new PrismaClient();
  prisma.message.deleteMany({
    where: {
      timestamp: {
        lt: Date.now() - messageLifetime
      }
    }
  });
  prisma.$disconnect();
}

setInterval(WipeOldMessages, wipeFrequency);

export const VerifyEmail = async (token: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  try {
    const message = await prisma.message.delete({
      where: {
        token: token
      }
    });
    if (message.timestamp < Date.now() - messageLifetime) throw new Error("Message expired!");
    await transporter.sendMail({
      from: `"${message.name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_ADDRESS,
      subject: message.subject,
      html: message.content
    })
    return true;
  }
  catch (err) {
    console.error("There was an error sending the message!", err);
    return false;
  }
  prisma.$disconnect();
}

export const SendMessage = async (formData: FormData): Promise<MessageBoxData> => {
  const token = crypto.randomBytes(32).toString("hex");
  const prisma = new PrismaClient();

  try {
    await prisma.message.create({
      data: {
        content: formData.get("content") as string,
        email: formData.get("email") as string,
        name: formData.get("fullName") as string,
        subject: formData.get("subject") as string,
        token: token,
        timestamp: Date.now()
      }
    });
    await transporter.sendMail({
      from: `"No Reply - David Szocs" <${process.env.SMTP_USER}>`,
      to: formData.get("email") as string,
      subject: "Email address verification",
      html: EmailTemplate(`${process.env.NEXT_PUBLIC_BASE_URL}/contact/${token}`),
      text: `In order for your message to be sent you need to verify the ownership of this email address. To complete the verification process, please click on the link down below:\n\n${process.env.NEXT_PUBLIC_BASE_URL}/contact/${token}\n\nIf you did not submit the contact form on my website, please ignore this email.`
    });
    prisma.$disconnect();
    return { message: `An email has been sent to your address to verify it's ownership. Please click on the link in the next ${messageLifetime / (1000 * 60)} minutes, before it expires.` };
  }
  catch {
    prisma.$disconnect();
    return { message: "A system error occurred while trying to send the verification email. Please try again later!", error: true }
  }
}