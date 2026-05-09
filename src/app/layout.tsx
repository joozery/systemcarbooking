import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

const notoTh = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Crown Wealth - เชื่อมต่อทุกการเดินทาง มั่นใจทุกบริการ",
  description: "แพลตฟอร์มเรียกรถบรรทุกและรถลากจูง ที่พร้อมดูแลคุณตลอด 24 ชั่วโมง",
  icons: {
    icon: "/logo/logocrownbrowser.png",
    apple: "/logo/logocrownbrowser.png",
  },
};

import { CookieConsent } from "@/components/layout/CookieConsent";
import { ChatWidget } from "@/components/common/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoTh.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body className="min-h-full font-sans" suppressHydrationWarning>
        {children}
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}

