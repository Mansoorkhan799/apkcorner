import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { buildSiteMetadata, getSiteDescription, getSiteTitle } from "@/lib/seo";
import { buildSiteGraph } from "@/lib/schema/builders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = buildSiteMetadata(
  getSiteTitle(),
  getSiteDescription()
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-900 text-zinc-100">
        <JsonLd data={buildSiteGraph()} />
        {children}
      </body>
    </html>
  );
}
