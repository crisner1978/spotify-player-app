import { useRecoilState } from 'recoil'
import { isPlayingState, songIdState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { milToMinAndSecs } from '../lib/time'

const Song = ({ item, order }) => {
  const spotifyApi = useSpotify()
  const [songId, setSongId] = useRecoilState(songIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setSongId(item.track.id);
    setIsPlaying(true);
    spotifyApi.play({ 
      uris: [item.track.uri]
    })
  }

  return (
    <div onClick={playSong}
      className="grid grid-cols-2 rounded-md py-2 px-5 text-gray-400 
    hover:bg-neutral-600/60 hover:text-white active:bg-neutral-500"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-11 w-11"
          src={item.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 cursor-pointer truncate font-medium text-white hover:underline lg:w-64">
            {item.track.name}
          </p>
          <p className="w-40 cursor-pointer truncate text-sm hover:underline">
            {item.track.artists[0].name}
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 cursor-pointer text-sm hover:underline md:inline">
          {item.track.album.name}
        </p>
        <p className="text-gray-400">
          {milToMinAndSecs(item.track.duration_ms)}
        </p>
      </div>
    </div>
  )
}

export default Song
