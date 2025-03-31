import type { Coord } from "@astral-mines/types/game"
import { getValidNearbyCells } from "./getValidNearbyCells"
import type { Board } from "@astral-mines/types/game"
import type { Dimension } from "@astral-mines/types/difficulty"
import { indexToCoords } from "../utils/coords"

export const generateBoard = (
  board: Board,
  centerIndex: number,
  dimension: Dimension,
  minesNumber: number
) => {
  const centerCoord = indexToCoords(centerIndex, dimension.width)
  const safeCells = safeCellsPositions(centerCoord, dimension)

  const mines = generateMines(safeCells, minesNumber, dimension)

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

const generateMines = (
  safeCells: Coord[],
  minesNumber: number,
  dimension: Dimension
) => {
  const minesPositions: Coord[] = []

  const generatePosition = () => {
    let position: Coord = {
      x: Math.floor(Math.random() * dimension.width),
      y: Math.floor(Math.random() * dimension.height),
    }
    // filter out the safe cells and the mines positions
    if (includesCoord(minesPositions, position)) return
    if (includesCoord(safeCells, position)) return

    return position
  }

  while (minesPositions.length < minesNumber) {
    let position = generatePosition()
    if (position) minesPositions.push(position)
  }

  return minesPositions
}

const includesCoord = (arr: Coord[], coord: Coord) => {
  return arr.some((c) => c.x === coord.x && c.y === coord.y)
}

const safeCellsPositions = (centerCoords: Coord, bounds: Dimension) => {
  const positions = [centerCoords]
  positions.push(...getValidNearbyCells(centerCoords, bounds))

  return positions
}
