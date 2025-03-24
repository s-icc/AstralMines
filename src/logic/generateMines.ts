import type { Dimension } from "@/types/difficulty"
import type { Coord } from "@/types/game"

export const generateMines = (
  mines: number,
  safeCells: Coord[],
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

  while (minesPositions.length < mines) {
    let position = generatePosition()
    if (position) minesPositions.push(position)
  }

  return minesPositions
}

const includesCoord = (arr: Coord[], coord: Coord) => {
  return arr.some((c) => c.x === coord.x && c.y === coord.y)
}
