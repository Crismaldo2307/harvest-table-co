import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harvest Table Co. | Premium Catering Powered by Intelligent Tech",
  description:
    "Harvest Table Co. delivers premium catering for corporate and private events, blending culinary excellence with intelligent technology.",
  metadataBase: new URL("https://www.harvesttableco.com"),
  openGraph: {
    title: "Harvest Table Co. | Premium Catering Powered by Intelligent Tech",
    description:
      "Premium catering services for corporate and private events, enhanced by intelligent solutions.",
    url: "https://www.harvesttableco.com",
    siteName: "Harvest Table Co.",
    locale: "en_US",
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
