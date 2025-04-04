import { useEffect } from "react"
import { getCellContent } from "@astral-mines/utils/game"
import { flagCell, revealCell } from "@astral-mines/stores/board"
import type { Cell, Coord } from "@astral-mines/types/game"
import { getValidNearbyCells } from "@astral-mines/logic/getValidNearbyCells"
import { gameState } from "../stores/gameStateStore"
import { useStore } from "@nanostores/react"

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

    flagCell(coords, !cell.isFlagged)
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
      disabled={cell.isRevealed}
      className="btn btn-primary text-xl w-12 h-12 text-base-content"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {getCellContent(cell)}
    </button>
  )
}
