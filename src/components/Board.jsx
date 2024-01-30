import { useEffect, useState } from 'react'
import { Cell } from './Cell'
import { safeCellsPositions } from '../utils/safeCells'
import { generateMines } from '../utils/generateMines'
import { generateBoardNumbers } from '../utils/generateBoard'

export const Board = ({ dimension, minesNumber }) => {
	const [firstClick, setFirstClick] = useState(null)
	const [board, setBoard] = useState(Array(dimension.x * dimension.y).fill(0))
	const boardStyle = {
		gridTemplateColumns: `repeat(${dimension.x}, auto)`
	}

	const handleFirstClick = (child) => {
		// if (!child instanceof Cell) return
		if (firstClick) return

		const parent = child.parentNode
		const index = Array.from(parent.children).indexOf(child)
		setFirstClick(index)
	}

	// TODO: generate board randomly
	const createBoard = () => {
		const bounds = {
			min: 0,
			max: board.length
		}
		const safeCells = safeCellsPositions(firstClick, dimension)
		const minesPositions = generateMines(minesNumber, safeCells, bounds)
		setBoard(generateBoardNumbers(dimension, minesPositions))
	}

	// create board on first click
	useEffect(() => {
		createBoard()
	}, [firstClick])

	return (
		<div
			className="grid gap-2 select-none text-accent"
			style={boardStyle}
			onContextMenu={(e) => e.preventDefault()}
			onClick={(e) => handleFirstClick(e.target)}
		>
			{board.map((value, index) => (
				<Cell key={index}> {value} </Cell>
			))}
		</div>
	)
}
