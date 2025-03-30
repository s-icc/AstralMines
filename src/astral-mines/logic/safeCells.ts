import type { Coord } from "@astral-mines/types/game"
import { getValidNearbyCells } from "./getValidNearbyCells"
import type { Dimension } from "@astral-mines/types/difficulty"

export const safeCellsPositions = (centerCoords: Coord, bounds: Dimension) => {
  const positions = [centerCoords]
  positions.push(...getValidNearbyCells(centerCoords, bounds))

  return positions
}
