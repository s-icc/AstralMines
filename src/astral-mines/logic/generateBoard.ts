import type { Coord } from "@astral-mines/types/game"
import { getValidNearbyCells } from "./getValidNearbyCells"
import type { Board } from "@astral-mines/types/game"
import type { Dimension } from "@astral-mines/types/difficulty"

export const generateBoard = (
  board: Board,
  dimension: Dimension,
  mines: Coord[]
) => {
  for (const mine of mines) {
    const validNearbyCells = getValidNearbyCells(mine, dimension)
    board[mine.y][mine.x].isMine = true

    // loop through the nearby cells to increment the numbers
    // around the mine
    validNearbyCells.forEach((cell) => {
      // filter out the mines
      if (board[cell.y][cell.x].isMine) return

      board[cell.y][cell.x].adjacentMines++
    })
  }

  return board
}
