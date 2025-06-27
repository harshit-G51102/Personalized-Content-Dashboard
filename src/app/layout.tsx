import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import SidebarLayout from "@/components/layout/SidebarLayout";

// Load fonts with CSS variable support
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// App-wide metadata
export const metadata: Metadata = {
  title: "Personalized Content Dashboard",
  description: "Track and customize your content feed",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Provider><SidebarLayout>{children}</SidebarLayout></Provider>
      </body>
    </html>
  );
}
