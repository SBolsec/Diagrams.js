import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next Qt</title>
        <meta name="description" content="Qt WASM App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <ul>
          <li><Link href="/addressbook"><a>Address Book</a></Link></li>
          <li><Link href="/clock"><a>Analog clock</a></Link></li>
          <li><Link href="/calendar"><a>Calendar</a></Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
