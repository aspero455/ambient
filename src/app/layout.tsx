import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ambient Frames | Premium Photography Collective",
  description: "Experience the art of cinematic photography. Ambient Frames is a premium collective of visual storytellers capturing the essence of life's most profound moments.",
  openGraph: {
    title: "Ambient Frames | Premium Photography Collective",
    description: "Experience the art of cinematic photography.",
    images: ["/ambient_frames_brand_image_1767869437497.png"],
  },
  icons: {
    icon: "/ambient_frames_favicon_1767869461115.png",
    apple: "/ambient_frames_favicon_1767869461115.png",
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
