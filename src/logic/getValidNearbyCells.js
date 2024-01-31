import { NEARBY_CELLS } from '../utils/constants'
import { indexToCoords, coordsToIndex } from '../utils/indexCoords'

export const getValidNearbyCells = (center, bounds) => {
	// calculate the center position as x and y
	const centerCoods = indexToCoords(center, bounds.x)

	let positions = []

	// loop through the nearby cells
	NEARBY_CELLS.forEach((cell) => {
		// calculate the position
		let x = centerCoods.x + cell.x
		let y = centerCoods.y + cell.y

		// filter out the out of bounds positions
		if (x < 0) return
		if (x >= bounds.y) return
		if (y < 0) return
		if (y >= bounds.x) return

		// calculate the index from coordinates
		const index = coordsToIndex(x, y, bounds.x)

		positions.push(index)
	})

	return positions
}
