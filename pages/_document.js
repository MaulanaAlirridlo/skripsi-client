import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
