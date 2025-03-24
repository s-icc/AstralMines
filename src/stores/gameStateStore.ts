import { atom } from "nanostores"
import { Game } from "../utils/game"
import type { GameStatus } from "@/types/game"

export const gameState = atom(Game.IDLE)

export const setAction = (status: GameStatus, action: Function) => {
  Game[status].action = action
}

gameState.subscribe((state) => {
  state.action()
})
