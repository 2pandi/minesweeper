import type { Metadata } from "next";
import "@/style/global.scss";
import "@/style/components.scss";

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
    <html lang="ko">
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      />

      <body>{children}</body>
    </html>
  );
}
