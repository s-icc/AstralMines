import { NEARBY_CELLS } from './constants'
import { coordsToIndex } from './coordsToIndex'
import { indexToCoords } from './indexToCoords'

export const generateBoardNumbers = (dimension, mines) => {
	let board = Array(dimension.x * dimension.y).fill(0)

	mines.forEach((mineIndex) => {
		const mineCoords = indexToCoords(mineIndex, dimension.x)
		board[mineIndex] = -1

		// loop through the nearby cells to increment the numbers
		// around the mine
		NEARBY_CELLS.forEach((cell) => {
			// calculate the position
			let x = mineCoords.x + cell.x
			let y = mineCoords.y + cell.y

			// filter out the out of bounds positions
			if (x < 0) return
			if (x >= dimension.y) return
			if (y < 0) return
			if (y >= dimension.x) return

			// calculate the index from coordinates
			const index = coordsToIndex(x, y, dimension.x)
			// filter out the mines
			if (board[index] === -1) return

			board[index]++
		})
	})

	return board
}
