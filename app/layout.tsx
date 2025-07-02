import type { Metadata } from 'next';
import '@/style/global.scss';
import '@/style/components.scss';

export const metadata: Metadata = {
  title: '지뢰찾기 - Minesweeper',
  description:
    '무료 온라인 지뢰찾기 게임! 브라우저에서 바로 플레이하는 고전 Minesweeper.',
  keywords: [
    '지뢰찾기',
    'minesweeper',
    '무료 게임',
    '웹 게임',
    '퍼즐',
    '브라우저',
    '고전 게임',
  ],
  openGraph: {
    title: '지뢰찾기 - Minesweeper',
    description: '무료 온라인 지뢰찾기! 지금 바로 플레이하세요.',
    url: process.env.NEXT_PUBLIC_DOMAIN,
    images: [
      {
        url: process.env.NEXT_PUBLIC_OG_IMAGE || '',
        width: 1200,
        height: 630,
        alt: '지뢰찾기',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <script
        async
        src={process.env.NEXT_PUBLIC_ADS_SRC}
        crossOrigin="anonymous"
      ></script>
      <body>{children}</body>
    </html>
  );
}
