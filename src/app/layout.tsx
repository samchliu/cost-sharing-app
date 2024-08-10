import '@/app/ui/globals.css';
import { inter, notoSansJP, notoSansTC } from '@/app/ui/fonts';
import { Providers } from '@/app/_components/frontendData/fetchData/Providers';
import { CalcProvider } from '@/app/_components/frontendData/sharedFunction/CalcProvider';
import LiffProvider from './_components/liff-provider';

export const metadata = {
  title: 'Cost Sharing App',
  description: 'A tool for splitting costs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      {/* <LiffProvider> */}
        <Providers>
          <CalcProvider>
            <body
              className={`${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} min-h-screen w-full font-sans antialiased`}
            >
              <main className="h-dvh min-h-screen w-full bg-neutrals-0">{children}</main>
            </body>
          </CalcProvider>
        </Providers>
      {/* </LiffProvider> */}
    </html>
  );
}
