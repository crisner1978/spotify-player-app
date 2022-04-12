import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { songIdState } from "../atoms/songAtom"
import useSpotify from "./useSpotify"

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const [songId, setSongId] = useRecoilState(songIdState)
  const [songInfo, setSongInfo] = useState(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if(songId) {
        const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
          }
        }).then(res => res.json());
        setSongInfo(trackInfo)
      }
    }
    fetchSongInfo()
  }, [songId, spotifyApi])

  
  return songInfo
}

export default useSongInfo