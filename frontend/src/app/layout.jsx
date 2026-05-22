import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from '../components/Navbar';
import { AppProvider } from "@/context/AppContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Waggle: AI Dataset Hub",
  description: "Upload, manage, and preview large-scale image and video datasets.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <AppProvider>
          <Toaster position="bottom-right" />
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}