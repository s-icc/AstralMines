import { atom } from "nanostores"
import type { GameState, GameStatus } from "@astral-mines/types/game"

export const Game: Record<GameStatus, GameState> = {
  IDLE: {
    action: () => {},
  },
  PLAYING: {
    action: () => {},
  },
  WIN: {
    action: () => {},
  },
  LOSE: {
    action: () => {},
  },
}

export const gameState = atom<GameStatus>("IDLE")

export const setAction = (status: GameStatus, action: Function) => {
  Game[status].action = action
}

gameState.subscribe((status) => {
  if (!Game) return

  Game[status].action()
})
