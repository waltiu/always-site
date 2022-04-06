import type { NextPage } from 'next'
import Head from 'next/head'
import TopNav from '../compoments/TopNav'
const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>always-site</title>
        <meta name="description" content="Generated by always-site" />
        <link rel="icon" href="//avatars.githubusercontent.com/u/35523427?v=4" />
      </Head>

      <main className='scrollbar-beautiful'>
        <TopNav/>
      </main>


    </div>
  )
}

export default Home
