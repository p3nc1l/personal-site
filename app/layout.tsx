import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./ui/root-layout/Header";
import Footer from "./ui/root-layout/Footer";

const roboto = Roboto({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "P3nc1l's Site",
  description: "Personal portfolio site of p3nc1l.",
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
