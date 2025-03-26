import { useEffect } from "react"
import { getCellContent } from "../utils/game"
import { markCell, revealCell } from "@/stores/board"
import type { Cell, Coord } from "@/types/game"

interface CellProps {
  cell: Cell
  coords: Coord
  getNearbyCells: (coords: Coord) => Coord[]
  checkWin: () => void
}

export const CellButton = ({
  cell,
  coords,
  getNearbyCells,
  checkWin,
}: CellProps) => {
  const handleClick = () => {
    if (!cell.isFlagged) revealCell(coords)
  }

  const handleContextMenu = () => {
    markCell(coords, !cell.isFlagged)
  }

  // execute when the cell is revealed
  useEffect(() => {
    if (!cell.isRevealed) return

    const nearbyCells = getNearbyCells(coords)
    // if there are no mines nearby, reveals the nearby cells
    if (cell.adjacentMines === 0)
      nearbyCells.forEach((nearCoords) => revealCell(nearCoords))
    // after revealing the cell, check if the game is won
    else checkWin()
  }, [cell.isRevealed])

  return (
    <button
      disabled={cell.isRevealed}
      className="btn btn-primary text-xl w-12 h-12 disabled:btn-outline"
      style={{ color: "oklch(var(--a))" }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {getCellContent(cell)}
    </button>
  )
}
