import type { NextPage } from 'next'
import Head from 'next/head'

import CalendarCanvas from '../../components/CalendarCanvas'

const ClockPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next Qt</title>
        <meta name="description" content="Qt WASM App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CalendarCanvas></CalendarCanvas>
    </div>
  )
}

export default ClockPage
