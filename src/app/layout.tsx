import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./style.scss";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import ModalProvider from "@/providers/modal-provider";
import 'react-loading-skeleton/dist/skeleton.css'
import DialogflowMessenger from "@/components/dialogMessage";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book car",
  description: "Đặt vé xe online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Navbar />
        <ModalProvider />
        {children}
        <div className="p-3 bg-[#f4f4f4]"></div>
        <DialogflowMessenger />
        <Footer />
      </body>
    </html>
  );
}
