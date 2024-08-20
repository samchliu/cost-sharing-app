import '@/app/ui/globals.css';
import { inter, notoSansJP, notoSansTC } from '@/app/ui/fonts';
import { Providers } from '@/app/_components/frontendData/fetchData/Providers';

export const metadata = {
  title: 'Cost Sharing App',
  description: 'A tool for splitting costs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
        <Providers>
            <body
              className={`${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} min-h-screen w-full font-sans antialiased`}
            >
              <main className="h-dvh min-h-screen w-full bg-neutrals-0">{children}</main>
            </body>
        </Providers>
    </html>
  );
}
