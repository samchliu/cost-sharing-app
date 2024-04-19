import { Inter } from 'next/font/google';
import './globals.css';
import LiffProvider from './components/liff-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cost Sharing App',
  description: 'A tool for splitting costs',
};

export default function RootLayout({ children }) {
  return (
    <html lang='zh-TW'>
      <LiffProvider>
        <body className={inter.className}>{children}</body>
      </LiffProvider>
    </html>
  );
}
