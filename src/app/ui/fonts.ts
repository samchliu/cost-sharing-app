import { Inter, Noto_Sans_JP, Noto_Sans_TC, Lato, Lusitana, Kumbh_Sans } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-notoSansJP',
});

export const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-notoSansTC',
});
export const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});

export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});