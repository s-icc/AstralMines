import type { Cell, GameState, GameStatus } from "@/types/game"
import { CELL_MARK, CELL_MINE } from "./constants"
import { gameState } from "@/stores/gameStateStore"

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
  MODAL_OPEN: {
    action: () => {},
  },
}

export const getCellContent = (cell: Cell) => {
  if (gameState.get() === Game.LOSE && cell.isMine) return CELL_MINE

  if (cell.isFlagged) return CELL_MARK
  if (!cell.isRevealed) return ""
  if (cell.isMine) return CELL_MINE
  if (cell.adjacentMines === 0) return ""

  return cell.adjacentMines
}
