"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";

type Message = {
  name: string,
  email: string,
  subject: string,
  content: string,
  timestamp: number
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

const messagesQueue = new Map<string, Message>()

const messageLifetime = 1000 * 60 * 15; //15 minutes
const wipeFrequency = 1000 * 60; //every minute

const WipeOldMessages = () => {
  messagesQueue.forEach((value, key) => {
    if (value.timestamp > Date.now() - messageLifetime) messagesQueue.delete(key);
  })
}

setInterval(WipeOldMessages, wipeFrequency);

export const VerifyEmail = async (token: string): Promise<boolean> => {
  console.log(messagesQueue);
  const message = messagesQueue.get(token);
  if (message == undefined || message.timestamp < Date.now() - messageLifetime) return false;
  messagesQueue.delete(token)
  try {
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

export const SendMessage = async (formData: FormData) => {
  const token = crypto.randomBytes(32).toString("hex");

  try {
    await transporter.sendMail({
      from: `"No Reply - David Szocs" <${process.env.SMTP_USER}>`,
      to: formData.get("email") as string,
      subject: "Email address verification",
      html: `${process.env.NEXT_PUBLIC_BASE_URL}/contact/${token}`
    });
    messagesQueue.set(token, {
      name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      content: formData.get("content") as string,
      timestamp: Date.now()
    })
  }
  catch (err) {
    console.error("An error occured while trying to send the verification email.", err);
  }
  console.log(messagesQueue);
}