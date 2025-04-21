import '@/app/ui/globals.css';
import { inter, notoSansJP, notoSansTC } from '@/app/ui/fonts';
import { Providers } from '@/app/_components/frontendData/fetchData/Providers';

export const metadata = {
  title: 'Chill後算帳',
  description: 'Chill Trips, Easy Splits.',
  metadataBase: new URL('https://cost-sharing-app.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'zh-TW': '/zh-TW',
    },
  },
  openGraph: {
    title: 'Chill後算帳',
    description: 'Chill Trips, Easy Splits.',
    url: 'https://cost-sharing-app.vercel.app',
    siteName: 'Chill後算帳',
    images: [
      {
        url: '/images/1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'A descriptive alt text for the image',
      },
      {
        url: '/images/600x315.jpg',
        width: 600,
        height: 315,
        alt: 'A descriptive alt text for the image',
      },
      {
        url: '/images/200x200.jpg',
        width: 200,
        height: 200,
        alt: 'A descriptive alt text for the image',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <Providers>
          <head>
            <meta property="og:title" content="Cost Sharing App'" />
            <meta property="og:description" content="A tool for splitting costs" />
            <meta property="og:url" content="https://cost-sharing-app.vercel.app/group/" />
            <meta property="og:site_name" content="Cost Sharing App" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:image:url" content="/images/1200_630.jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="My custom alt" />
            <meta property="og:type" content="website" />
          </head>
          <body
            className={`${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} min-h-screen w-full bg-neutrals-80 font-sans antialiased`}
          >
            <main className="relative mx-auto min-h-screen w-full min-w-[320px] bg-neutrals-0">
              {children}
            </main>
          </body>
      </Providers>
    </html>
  );
}
