import type { Metadata } from "next";
import "./globals.css";
import "./tkbees.css";
import { UiProvider } from "@/providers/UiProvider";
import { SiteShell } from "@/components/tkbees/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3001"),
  title: "TKBees — Where Student Ideas Take Flight",
  description:
    "The university entrepreneurship ecosystem that helps students turn brilliant ideas into real startups. Get mentorship, connect with co-founders, and access resources.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "TKBees — Where Student Ideas Take Flight",
    description: "The entrepreneurship ecosystem that helps university students turn brilliant ideas into real startups.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UiProvider>
          <SiteShell>{children}</SiteShell>
        </UiProvider>
      </body>
    </html>
  );
}
