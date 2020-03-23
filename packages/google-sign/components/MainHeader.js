import Head from 'next/head'

function MainHeader() {
  const clientId = process.env.GOOGLE_API_KEY
  console.log('clientId', clientId)

  return (
    <div>
      <Head>
        <title>
          Danailov Consulting: Javascript Consultant and Remote architect
        </title>
        <meta
          name="description"
          content="Javascript Consultant and Remote architect"
        />
        <meta name="author" content="Dimitar Danailov" />
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="google-signin-client_id" content={clientId}></meta>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        ></link>
      </Head>
    </div>
  )
}

export default MainHeader
