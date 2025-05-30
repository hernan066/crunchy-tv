import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ClientLayout } from "./clientLayout";
import { esES } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "CrunchyTv",
  description: "Anime sin propagandas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en">
        <body>
          <ClientLayout> {children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
