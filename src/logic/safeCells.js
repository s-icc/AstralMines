import { getValidNearbyCells } from './getValidNearbyCells'

export const safeCellsPositions = (center, bounds) => {
	let positions = [center]
	positions.push(...getValidNearbyCells(center, bounds))

	return positions
}
