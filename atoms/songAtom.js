import { atom } from "recoil";


export const songIdState = atom({
  key: "songIdState",
  default: null,
})

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
})