import type { Metadata } from "next";
import "./globals.scss";
import {Suspense} from "react";
import Loading from "../components/Loading";


export const metadata: Metadata = {
  title: "Game",
  description: "Game about attacks and protected",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Suspense fallback={<Loading/>}>
      <body>{children}</body>
    </Suspense>
    </html>
  );
}
