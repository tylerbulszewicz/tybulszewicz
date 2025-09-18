import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import "../fonts/sentient.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tybulszewicz",
  description: "Tyler Bulszewicz Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
