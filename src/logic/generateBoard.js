import { NEARBY_CELLS } from '../utils/constants'
import { indexToCoords, coordsToIndex } from '../utils/indexCoords'
import { getValidNearbyCells } from './getValidNearbyCells'

export const generateBoardNumbers = (dimension, mines) => {
	let board = Array(dimension.x * dimension.y).fill(0)

	mines.forEach((mineIndex) => {
		const validNearbyCells = getValidNearbyCells(mineIndex, dimension)
		board[mineIndex] = -1

		// loop through the nearby cells to increment the numbers
		// around the mine
		validNearbyCells.forEach((cell) => {
			// filter out the mines
			if (board[cell] > -1) board[cell]++
		})
	})

	return board
}
