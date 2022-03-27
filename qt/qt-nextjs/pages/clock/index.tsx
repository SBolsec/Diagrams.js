import type { NextPage } from 'next'
import Head from 'next/head'

import AnalogClockCanvas from '../../components/AnalogClockCanvas'

const ClockPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next Qt</title>
        <meta name="description" content="Qt WASM App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnalogClockCanvas></AnalogClockCanvas>
    </div>
  )
}

export default ClockPage
