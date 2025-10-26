import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barcelona Rent Pulse | Cristian & Alonso Data",
  description:
    "Observatorio interactivo sobre la evolución del alquiler en Barcelona y su relación con turismo, comercio y empleo.",
  metadataBase: new URL("https://barcelona-rent-pulse.example"),
  openGraph: {
    title: "Barcelona Rent Pulse | Cristian & Alonso Data",
    description:
      "Analítica urbana que cruza datos de alquiler, turismo y comercio para comprender la presión inmobiliaria en Barcelona.",
    url: "https://barcelona-rent-pulse.example",
    siteName: "Barcelona Rent Pulse",
    locale: "es_ES",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-brand-dark`}>{children}</body>
    </html>
  );
}
