import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Study Assistant",
  description: "Your intelligent AI-powered study companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
