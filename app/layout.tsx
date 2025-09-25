import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastBox from "@/components/Toast";
import PageLoader from "@/components/Loader";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Admin Panel - Events',
 description: 'Admin panel for managing events and schedules',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastBox/>
      
      <PageLoader/>{children}</body>
    </html>
  );
}
