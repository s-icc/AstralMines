import type { Cell } from "@astral-mines/types/game"
import { CELL_FLAG, CELL_MINE } from "./constants"
import { gameState } from "@astral-mines/stores/gameStateStore"

export const getCellContent = (cell: Cell) => {
  if (gameState.get() === "LOSE" && cell.isMine && cell.isFlagged)
    return CELL_MINE

  if (cell.isFlagged) return CELL_FLAG
  if (cell.isMine && cell.isRevealed) return CELL_MINE
  if (cell.adjacentMines === 0 || !cell.isRevealed) return ""

  return cell.adjacentMines
}
