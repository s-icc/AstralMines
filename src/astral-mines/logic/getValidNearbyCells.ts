import type { Coord } from "@astral-mines/types/game"
import { NEARBY_CELLS } from "@astral-mines/lib/constants"
import { DIFFICULTIES } from "@astral-mines/lib/difficulties"
import { difficultyStore } from "@astral-mines/stores/difficulty"

export const getValidNearbyCells = (centerCoords: Coord) => {
  const bounds = DIFFICULTIES[difficultyStore.get()].BOARD_SIZE
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
