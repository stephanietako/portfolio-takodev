import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollButtons from "./components/ScrollButtons/ScrollButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio Tech & Art, Takodev",
  description: "développement web créatif",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <ScrollButtons />
      </body>
    </html>
  );
}
