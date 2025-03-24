export type Coord = {
  x: number
  y: number
}

export type GameStatus = "IDLE" | "PLAYING" | "WIN" | "LOSE" | "MODAL_OPEN"

export interface GameState {
  action: Function
}

export interface ModalContent {
  title: string
  description: string
}

export interface Cell {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
}

export type Board = Cell[][]

export type GameStore = {
  status: GameStatus
  board: Board
}
