import type { Metadata } from "next";
import { Nunito, Dancing_Script } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday! 🎂",
  description: "A special birthday experience made just for you.",
  openGraph: {
    title: "Happy Birthday! 🎂",
    description: "A special birthday experience made just for you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${dancingScript.variable}`}>
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
