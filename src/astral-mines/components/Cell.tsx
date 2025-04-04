import { useEffect } from "react"
import { getCellContent } from "@astral-mines/utils/game"
import {
  flagCell,
  getFlaggedCells,
  getMineCells,
  revealCell,
} from "@astral-mines/stores/board"
import type { Cell, Coord } from "@astral-mines/types/game"
import { getValidNearbyCells } from "@astral-mines/logic/getValidNearbyCells"
import { gameState } from "../stores/gameStateStore"
import { useStore } from "@nanostores/react"
import { cn } from "@/lib/utils"

interface CellProps {
  cell: Cell
  coords: Coord
  checkWin: () => void
}

export const CellButton = ({ cell, coords, checkWin }: CellProps) => {
  const $gameState = useStore(gameState)
  const nearbyCells = getValidNearbyCells(coords)

  const handleClick = () => {
    if ($gameState === "LOSE" || $gameState === "WIN") return

    revealCell(coords)
  }

  const handleContextMenu = () => {
    if ($gameState === "LOSE" || $gameState === "WIN") return

    const flaggedCells = getFlaggedCells().length
    const minesCells = getMineCells().length

    // limit the number of flagged cells to the number of mines
    if (flaggedCells < minesCells) {
      flagCell(coords, !cell.isFlagged)
      return
    }

    if (cell.isFlagged) {
      flagCell(coords, false)
    }
  }

  // execute when the cell is revealed
  useEffect(() => {
    if (!cell.isRevealed) return

    // if there are no mines nearby, reveals the nearby cells
    if (cell.adjacentMines === 0)
      nearbyCells.forEach((nearCoords) => revealCell(nearCoords))
    // after revealing the cell, check if the game is won
    else checkWin()
  }, [cell.isRevealed])

  return (
    <button
      className={cn(
        "btn text-xl w-12 h-12 text-base-content",
        cell.isMine && cell.isRevealed ? "btn-error" : "btn-primary",
        cell.isRevealed && (cell.isMine ? "btn-outline" : "btn-disabled")
      )}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {getCellContent(cell)}
    </button>
  )
}
