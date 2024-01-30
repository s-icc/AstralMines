import { NEARBY_CELLS } from './constants'
import { coordsToIndex } from './coordsToIndex'
import { indexToCoords } from './indexToCoords'

export const safeCellsPositions = (center, bounds) => {
	// calculate the center position as x and y
	const centerCoods = indexToCoords(center, bounds.x)

	let positions = [center]

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
