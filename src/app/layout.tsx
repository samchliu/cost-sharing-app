import '@/app/ui/globals.css';
import { inter, notoSansJP, notoSansTC } from '@/app/ui/fonts';
import { Providers } from '@/app/_components/frontendData/fetchData/Providers';

export const metadata = {
  title: 'Cost Sharing App',
  description: 'A tool for splitting costs',
  metadataBase: new URL('https://nextjs-dasboard-woad.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'zh-TW': '/zh-TW',
    },
  },
  openGraph: {
    title: 'Cost Sharing App',
    description: 'A tool for splitting costs',
    url: 'https://cost-sharing-app.vercel.app/group/',
    siteName: 'Cost Sharing App',
    images: [
      {
        url: '/images/1200_630.jpg',
        width: 1200,
        height: 630,
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
          className={`${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} min-h-screen w-full font-sans antialiased`}
        >
          <main className="h-dvh min-h-screen w-full bg-neutrals-0">{children}</main>
        </body>
      </Providers>
    </html>
  );
}
