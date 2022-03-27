import type { NextPage } from 'next'
import Head from 'next/head'

import AddressBookCanvas from '../../components/AddressBookCanvas'

const ClockPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next Qt</title>
        <meta name="description" content="Qt WASM App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddressBookCanvas />
    </div>
  )
}

export default ClockPage
