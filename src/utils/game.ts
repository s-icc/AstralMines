import type { Cell } from "@/types/game"
import { CELL_MARK, CELL_MINE } from "./constants"
import { gameState } from "@/stores/gameStateStore"

export const getCellContent = (cell: Cell) => {
  if (gameState.get() === "LOSE" && cell.isMine) return CELL_MINE

  if (cell.isFlagged) return CELL_MARK
  if (!cell.isRevealed) return ""
  if (cell.isMine) return CELL_MINE
  if (cell.adjacentMines === 0) return ""

  return cell.adjacentMines
}
