import "~/styles/globals.css";

import localFont from 'next/font/local';
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "Salad",
  description: "Buy archival art from museums",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const generalSans = localFont({
  src: [
    {
      path: './assets/GeneralSans-Variable.woff2',
      style: 'normal',
    },
    {
      path: './assets/GeneralSans-VariableItalic.woff2',
      style: 'italic',
    }
  ],
  display: 'swap',
  variable: '--font-general-sans',
});

const paquito = localFont({
  src: './assets/Paquito-Variable.woff2',
  display: 'swap',
  variable: '--font-paquito',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${paquito.variable} ${generalSans.variable}`}>
      <body className="bg-roseWhite mx-8">
        <Header/>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
