import { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>next-i18next</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(App)