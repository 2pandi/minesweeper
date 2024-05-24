import localFont from "next/font/local";
import type { Metadata } from "next";
import "@/style/global.scss";
import "@/style/components.scss";

const myLocalFont = localFont({
  src: [
    { path: "./fonts/jaro-subset.woff" },
    { path: "./fonts/pacifico-subset.woff" },
    { path: "./fonts/dunggeunmo-subset.woff" },
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
    <html lang="ko" className={myLocalFont.className}>
      <head>
        <link rel="preload" href="/" as="font" type="font/woff2" />
      </head>
      <body>{children}</body>
    </html>
  );
}
