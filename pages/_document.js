import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <header className='bg-slate-50'>
          <div className='justify-between bg-white shadow-lg text-black flex p-4 px-24 relative'>
            <Link href="/">Data Asli</Link>
            <Link href="/Preprocessing">Preprocessing</Link>
            <Link href="/TfIdf">Pembobotan 1</Link>
            <Link href="/Pembobotan">Pembobotan 2</Link>
            <Link href="/Split">Split Data</Link>
            <Link href="/SVM">SVM</Link>
          </div>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
