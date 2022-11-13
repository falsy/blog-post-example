import Head from 'next/head'
import React from 'react'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>nexjt - fcm</title>
        <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
