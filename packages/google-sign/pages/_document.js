import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />

          {/* https://developers.google.com/api-client-library/javascript/start/start-js */}
          <script async defer src="https://apis.google.com/js/api.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
