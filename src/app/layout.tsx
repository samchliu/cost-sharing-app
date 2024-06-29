import '@/app/ui/globals.css';
import { inter, notoSansJP, notoSansTC } from '@/app/ui/fonts';
import { Providers } from '@/app/_components/frontendData/Providers';
// import LiffProvider from './_components/liff-provider';

export const metadata = {
  title: 'Cost Sharing App',
  description: 'A tool for splitting costs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      {/* <LiffProvider> */}
      <Providers>
        <body
          className={`${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} min-h-screen w-full bg-primary-100 font-sans antialiased`}
        >
          {children}
        </body>
      </Providers>
      {/* </LiffProvider> */}
    </html>
  );
}
