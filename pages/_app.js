import '@/styles/globals.css'
import { DataProvider } from '../utils/Data'

export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  )
}
