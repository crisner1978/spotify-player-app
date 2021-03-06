import { nanoid } from "nanoid"
import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song"

export default function Songs() {
  const playlist = useRecoilValue(playlistState)
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((item, i) => (
        <Song key={item.track.id + nanoid()} item={item} order={i} />
      ))}
    </div>
  )
}
