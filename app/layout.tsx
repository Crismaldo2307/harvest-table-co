import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Harvest Table Co. | Premium Catering Powered by Technology',
  description:
    'Harvest Table Co. delivers premium catering experiences for corporate and private events with intelligent technology and personalized service.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
