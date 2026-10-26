import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://seaavey.com"),
  title: "Muhammad Adriansyah — Full Stack Web Developer & Building Designer | ( SEAVX )",
  description:
    "Portofolio pribadi Muhammad Adriansyah (@seaavey), full stack web developer dan building designer berbasis di Bandung (UTC+7). Fokus pada infrastruktur gateway LLM, UI Swiss brutalist editorial, dan sistem Linux.",
  keywords: [
    "Muhammad Adriansyah",
    "seaavey",
    "SEAVX",
    "Full Stack Web Developer",
    "Building Designer",
    "LLM Gateway",
    "Swiss Brutalist UI",
    "Hyprland",
    "Bandung",
  ],
  authors: [{ name: "Muhammad Adriansyah", url: "https://github.com/seaavey" }],
  creator: "Muhammad Adriansyah (@seaavey)",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://seaavey.com",
    siteName: "( SEAVX ) — Muhammad Adriansyah",
    title: "Muhammad Adriansyah — Full Stack Web Developer & Building Designer | ( SEAVX )",
    description:
      "Infrastruktur gateway LLM, sistem UI Swiss brutalist 12-kolom, dan rekayasa workstation Linux Wayland oleh Muhammad Adriansyah (@seaavey), Bandung UTC+7.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Adriansyah (@seaavey) — Full Stack Web Developer & Building Designer | ( SEAVX )",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Adriansyah — Full Stack Web Developer & Building Designer | ( SEAVX )",
    description:
      "Infrastruktur gateway LLM, UI Swiss brutalist editorial, dan sistem Linux oleh Muhammad Adriansyah (@seaavey).",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
