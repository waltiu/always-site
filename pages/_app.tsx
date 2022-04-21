import '../styles/globals.css'
import '../styles/scrollbar.scss'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import type { AppProps } from 'next/app'
dayjs.locale('zh-cn')
function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  return <Component {...pageProps} />
}

export default MyApp
