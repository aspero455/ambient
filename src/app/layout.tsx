import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://afweddingstories.com'),
  title: {
    default: "Ambient Frames | #1 Affordable Premium Photography Studio",
    template: "%s | Ambient Frames - afweddingstories.com"
  },
  description: "Ambient Frames (afweddingstories.com) is the number one choice for affordable, premium photography. Specializing in weddings, events, and cinematic storytelling. Book the best photographers today.",
  keywords: [
    "Ambient Frames", "afweddingstories.com", "AF Wedding Stories",
    "Best Wedding Photographer", "Affordable Wedding Photography",
    "Premium Photography Studio", "Cinematic Wedding Films",
    "Top Rated Photographers", "Budget Friendly Wedding Photography",
    "Professional Event Photography", "Portrait Photography",
    "Candid Wedding Photography", "Luxury Wedding Photography at Affordable Rates"
  ],
  authors: [{ name: "Ambient Frames Team" }],
  creator: "Ambient Frames",
  publisher: "Ambient Frames",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://afweddingstories.com",
    siteName: "Ambient Frames | afweddingstories.com",
    title: "Ambient Frames | Best Affordable Premium Photography",
    description: "Capture your wedding moments with Ambient Frames. The #1 premium photography studio that fits your budget. Visit afweddingstories.com.",
    images: [
      {
        url: "/ambient_frames_brand_image_1767869437497.png",
        width: 1200,
        height: 630,
        alt: "Ambient Frames Premium Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ambient Frames | #1 Affordable Wedding Photography",
    description: "Your dream wedding photos, made affordable. Discover why Ambient Frames (afweddingstories.com) is the top choice for couples.",
    images: ["/ambient_frames_brand_image_1767869437497.png"],
  },
  icons: {
    icon: "/logo/logo.svg",
    apple: "/logo/logo.svg",
  },
  alternates: {
    canonical: "https://afweddingstories.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
