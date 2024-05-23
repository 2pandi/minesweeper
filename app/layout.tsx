import localFont from "next/font/local";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/global.scss";
import "@/style/components.scss";

const inter = Inter({ subsets: ["latin"] });

const myLocalFont = localFont({
  src: [
    { path: "../public/fonts/jaro-subset.woff" },
    { path: "../public/fonts/pacifico-subset.woff" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minesweeper",
  description: "2pandi's toy-project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={myLocalFont.className}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
