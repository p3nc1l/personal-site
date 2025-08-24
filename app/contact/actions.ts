"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";
import { PrismaClient } from "@/generated/prisma";
import * as z from "zod";

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

const prisma = new PrismaClient();

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
  prisma.message.deleteMany({
    where: {
      timestamp: {
        lt: Date.now() - messageLifetime
      }
    }
  });
}

setInterval(WipeOldMessages, wipeFrequency);

export const VerifyEmail = async (token: string): Promise<boolean> => {
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
}

export const SendMessage = async (formData: FormData): Promise<MessageBoxData> => {
  const token = crypto.randomBytes(32).toString("hex");

  const dataSchema = z.object({
    content: z.string(),
    email: z.email(),
    fullName: z.string(),
    subject: z.string()
  })

  let submittedData;
  
  try {
    submittedData = dataSchema.parse({ content: formData.get("content"), email: formData.get("email"), fullName: formData.get("fullName"), subject: formData.get("subject") });
  }
  catch {
    return { message: "The data you submitted was not correct!", error: true }
  }

  try {
    await prisma.message.create({
      data: {
        content: submittedData.content,
        email: submittedData.email,
        name: submittedData.fullName,
        subject: submittedData.subject,
        token: token,
        timestamp: Date.now()
      }
    });
    await transporter.sendMail({
      from: `"No Reply - David Szocs" <${process.env.SMTP_USER}>`,
      to: submittedData.email,
      subject: "Email address verification",
      html: EmailTemplate(`${process.env.NEXT_PUBLIC_BASE_URL}/contact/${token}`),
      text: `In order for your message to be sent you need to verify the ownership of this email address. To complete the verification process, please click on the link down below:\n\n${process.env.NEXT_PUBLIC_BASE_URL}/contact/${token}\n\nIf you did not submit the contact form on my website, please ignore this email.`
    });
  }
  catch (err) {
    console.error(err);
    return { message: "A system error occurred while trying to send the verification email. Please try again later!", error: true }
  }
  return { message: `An email has been sent to your address to verify it's ownership. Please click on the link in the next ${messageLifetime / (1000 * 60)} minutes, before it expires.` };
}