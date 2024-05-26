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
      <body>{children}</body>
    </html>
  );
}
