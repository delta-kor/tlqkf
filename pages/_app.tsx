import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from '@next/font/google';

const font = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
