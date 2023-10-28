import Document, { Head, Html, Main, NextScript } from 'next/document'

class RootDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default RootDocument
