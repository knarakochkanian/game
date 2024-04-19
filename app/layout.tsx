import type { Metadata } from "next";

import "./globals.css";
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
      <body className="container">{children}</body>
    </Suspense>
    </html>
  );
}
