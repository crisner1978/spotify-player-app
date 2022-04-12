import {
  LibraryIcon, 
  RssIcon,
  SearchIcon
} from '@heroicons/react/outline'
import { PlusCircleIcon, HomeIcon, HeartIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'

const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  console.log("playlistId", playlistId)
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div
      className="h-screen overflow-y-scroll border-r border-gray-900 p-5
     text-stone-300/90 scrollbar-hide text-xs lg:text-sm sm:max-w-[12rem] 
     lg:max-w-[15rem] hidden md:inline-flex pb-36"
    >
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-6 w-6" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-6 w-6" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-6 w-6" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-6 w-6" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <div className='bg-gradient-to-br from-indigo-600/80 via-indigo-400/70 to-white/50'>
          <HeartIcon className="h-5 w-5 p-0.5 m-0.5" />  
          </div>
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-6 w-6" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className={`cursor-pointer hover:text-white ${playlistId === playlist.id && "text-white"}`}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
