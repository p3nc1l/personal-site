"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";
import { PrismaClient } from "@/generated/prisma";

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

export const SendMessage = async (formData: FormData) => {
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
      html: `${process.env.NEXT_PUBLIC_BASE_URL}/contact/${token}`
    });
  }
  catch (err) {
    console.error("An error occured while trying to send the verification email.", err);
  }
  prisma.$disconnect();
}