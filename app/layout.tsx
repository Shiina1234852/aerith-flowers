import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '钢铁天空下的花｜爱丽丝主题纪念站',
  description: '爱丽丝·盖恩斯巴勒角色档案馆：人物经历、关系图谱、历代形象、战斗资料、官方游戏剧照与多风格二创插画。',
  openGraph: {
    title: '钢铁天空下的花',
    description: '人物档案、官方游戏剧照与多风格二创共同组成的爱丽丝主题纪念站',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: '/og.png', width: 1732, height: 908, alt: '钢铁天空下的花' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '钢铁天空下的花',
    description: '人物档案、官方游戏剧照与多风格二创共同组成的爱丽丝主题纪念站',
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
