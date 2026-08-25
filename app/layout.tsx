import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '钢铁天空下的花｜爱丽丝主题纪念站',
  description: '一段关于花、记忆与生命之流的沉浸式旅程。',
  openGraph: {
    title: '钢铁天空下的花',
    description: '关于相遇、记忆与生命的旅程',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: '钢铁天空下的花' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '钢铁天空下的花',
    description: '关于相遇、记忆与生命的旅程',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
