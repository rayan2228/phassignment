import { Inter } from "next/font/google";
import "./globals.css";
import { dbConnection } from "@/lib/data/dbConnect";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  await dbConnection()
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
