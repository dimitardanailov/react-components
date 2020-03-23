import Head from 'next/head'

function MainHeader() {
  const {GOOGLE_ClIENT_ID} = process.env
  console.log('GOOGLE_ClIENT_ID', GOOGLE_ClIENT_ID)

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

        <meta name="google-signin-client_id" content={GOOGLE_ClIENT_ID}></meta>
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
