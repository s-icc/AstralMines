import type { Coord } from "@/types/game"
import { getValidNearbyCells } from "./getValidNearbyCells"
import type { Dimension } from "@/types/difficulty"

export const safeCellsPositions = (centerCoords: Coord, bounds: Dimension) => {
  const positions = [centerCoords]
  positions.push(...getValidNearbyCells(centerCoords, bounds))

  return positions
}
