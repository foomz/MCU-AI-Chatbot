import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCU AI Assistant | Manila Central University",
  description:
    "AI-powered assistant for Manila Central University students, faculty, and visitors. Get instant answers about academics, admissions, campus life, and more.",
  keywords: [
    "Manila Central University",
    "MCU",
    "AI assistant",
    "chatbot",
    "Philippines education",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 transition-all duration-[400ms] ease-in-out">
        {children}
      </body>
    </html>
  );
}
