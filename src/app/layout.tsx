import '@/app/ui/globals.css';
import { inter, kumbhSans } from '@/app/ui/fonts';
// import LiffProvider from './_components/liff-provider';

export const metadata = {
  title: 'Cost Sharing App',
  description: 'A tool for splitting costs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      {/* <LiffProvider> */}
      <body className={`${inter.className} min-h-screen w-full bg-primary-100 antialiased`}>
        {children}
      </body>
      {/* </LiffProvider> */}
    </html>
  );
}
