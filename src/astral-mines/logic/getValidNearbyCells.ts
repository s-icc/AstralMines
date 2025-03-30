import type { Coord } from "@astral-mines/types/game"
import type { Dimension } from "@astral-mines/types/difficulty"
import { NEARBY_CELLS } from "@astral-mines/utils/constants"

export const getValidNearbyCells = (centerCoords: Coord, bounds: Dimension) => {
  const coords = []

  // loop through the nearby cells
  for (const cell of NEARBY_CELLS) {
    // calculate the position
    const x = centerCoords.x + cell.x
    const y = centerCoords.y + cell.y

    // filter out the out of bounds positions
    if (x < 0) continue
    if (x >= bounds.width) continue
    if (y < 0) continue
    if (y >= bounds.height) continue

    // calculate the index from coordinates
    const coord = { x, y }

    coords.push(coord)
  }

  return coords
}
