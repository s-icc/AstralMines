export const generateMines = (mines, safeCells, bounds) => {
	let minesPositions = []

	const generatePosition = () => {
		let position = Math.floor(Math.random() * bounds.max) + bounds.min
		// filter out the safe cells and the mines positions
		if (minesPositions.includes(position)) return
		if (safeCells.includes(position)) return

		return position
	}

	while (minesPositions.length < mines) {
		let position = generatePosition()
		if (position) minesPositions.push(position)
	}

	return minesPositions
}
