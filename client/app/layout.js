import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. IMPORT the AuthProvider (Adjust the path if your folder is named differently)
import { AuthProvider } from "./context/AuthContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zainab Studio",
  description: "Premium Beauty Salon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. WRAP the children here */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}