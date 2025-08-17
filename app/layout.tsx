import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

const roboto = Roboto({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    default: "David Szocs - Web developer",
    template: "%s - David Szocs"
  },
  description: "David Szocs - Freelance Web Developer specializing in modern, responsive websites and apps using React, Vite, and Next.js. Available for freelance projects worldwide.",
  metadataBase: new URL("https://davidszocs.com")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${roboto.className} antialiased `} >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
