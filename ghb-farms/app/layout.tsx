import type { Metadata } from "next";
import { Rubik, Heebo } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const heebo = Heebo({ subsets: ["latin"], variable: "--font-heebo" });

export const metadata: Metadata = {
  title: "GHB Farms",
  description:
    "We hold ourselves to the highest possible standards. The welfare of our pigs is of the highest priority on our farm.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${heebo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
