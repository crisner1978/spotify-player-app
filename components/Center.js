import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

const colors = [
  'from-indigo-500',
  "from-blue-500",
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-zinc-500',
  'from-purple-500',
  'from-cyan-500',
  'from-rose-500',
  'from-sky-500',
  'from-slate-500',
  "from-amber-500",
  'from-orange-500',
  'from-gray-500',
  'from-fuchsia-500',
  'from-lime-500',
  'from-emerald-500',
  'from-teal-500',
  'from-violet-500',
  'from-neutral-500',
  'from-stone-500',
];

export default function Center() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body)
    }).catch((error) => console.log("Oops!! Something went wrong", error))
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-grow text-white overflow-y-scroll scrollbar-hide h-screen">
      <header className="absolute top-5 right-8">
        <div onClick={signOut}
          className="flex cursor-pointer items-center space-x-3 rounded-full
        bg-black p-1 pr-2 opacity-90 hover:opacity-80"
        >
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="playlist image" />
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
        </div>
      </section>
      <Songs />
    </div>
  )
}
