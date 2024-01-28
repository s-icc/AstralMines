import Cell from './Cell'

export default function Tablero({ dimension, minesNumber }) {
	/*
	 * 0 = empty
	 * 1,2,3,... = number
	 * -1 = mine
	 */

	// TODO: generate board randomly

	const boardNumbers = [
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, -1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, -1, 1, 0, 0, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	]
	const boardStyle = {
		gridTemplateColumns: `repeat(${dimension[0]}, auto)`
	}

	return (
		<div
			className="grid gap-2 select-none text-accent"
			style={boardStyle}
			onContextMenu={(e) => e.preventDefault()}
		>
			{boardNumbers.map((casilla, index) => (
				<Cell key={index} valor={casilla} />
			))}
		</div>
	)
}
