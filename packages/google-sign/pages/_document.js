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

          {/* https://developers.google.com/identity/sign-in/web/sign-in */}
          <script
            async
            defer
            src="https://apis.google.com/js/platform.js"
            async
            defer
          ></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
