import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/global.scss";
import "@/style/components.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minesweeper",
  description: "2pandi's side-project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
