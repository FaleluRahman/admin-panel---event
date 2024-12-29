import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./componets/Footer";
import SideMenu from "./componets/sidemanu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin pannel",
  description: "admin pannel for rend",
};

export default function RootLayout({
  children,
  active,
}: Readonly<{
  children: React.ReactNode;
  active: string;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex bg-orange-50 ">
          <SideMenu active={active} />
          <div className="flex flex-col flex-grow w-full pb-14 relative min-h-screen overflow-x-hidden">
            <div className="p-10 px-14">{children}</div>
            {/* <Footer /> */}
          </div>
        </main>
      </body>
    </html>
  );
}
