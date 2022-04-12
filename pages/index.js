import Sidebar from 'components/Sidebar'
import { getSession } from 'next-auth/react'
import Center from '../components/Center'
import Player from '../components/Player'

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0 text-white'>
        <Player />
      </div>

    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
}
