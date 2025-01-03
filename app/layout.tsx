import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastBox from "@/components/Toast";
import PageLoader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Prism Bulletin',
  description: 'Prism Bulletin is a news portal launched in 2024, under Prism Foundation.',
  keywords: ['Prism', 'Foundation', 'Bulletin', 'News', 'Portal', 'Garden','Markaz'],
  metadataBase: new URL('https://bulletin.prismonline.org/'),
  openGraph: {
    url: "https://bulletin.prismonline.org/",
    description: 'Prism Bulletin is a news portal launched in 2024, under Prism Foundation.',
    images:["https://bulletin.prismonline.org/prism thumb.jpg"]
  },
  
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
