import { Fragment } from 'react'
import NavBar from '../components/navbar'
import '../styles/globals.css'
import '../styles/index.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700;800&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Athiti:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" rel="stylesheet" />
        <title>Almanac Database</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
