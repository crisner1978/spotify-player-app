import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline'
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'

import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { isPlayingState, songIdState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

const Player = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [songId, setSongId] = useRecoilState(songIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now Playing', data.body?.item)
        setSongId(data.body?.item?.id)
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !songId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [songId, spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume)
    }
  }, [volume])

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {})
    }, 500),
    []
  )

  return (
    <div
      className="grid h-[90px] grid-cols-3 bg-gradient-to-t from-black
    to-stone-900 px-4 text-xs md:text-base"
    >
      {/* Artist Info and Image */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-14 w-14 md:inline"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
        <div className="whitespace-nowrap truncate">
          <h3 className="text-sm font-medium ">{songInfo?.name}</h3>
          <p className="text-[10px] text-gray-400">
            {songInfo?.artists?.[0]?.name}
          </p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center justify-center space-x-5">
        <SwitchHorizontalIcon className="btn" />
        <RewindIcon
          className="btn"
          // onClick={() => spotifyApi.skiptToPrevious()}
        />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="btn h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="btn h-10 w-10" />
        )}
        <FastForwardIcon
          className="btn"
          // onClick={() => spotifyApi.skiptToNext()}
        />
        <ReplyIcon className="btn" />
      </div>
      
      {/* Volume Controls */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          className="btn"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          className="w-14 md:w-28"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          type="range"
          min={0}
          max={100}
        />
        <VolumeUpIcon
          className="btn"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  )
}

export default Player
