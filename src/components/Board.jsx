import { useState, useRef } from 'react'
import { Cell } from './Cell'
import { safeCellsPositions } from '../logic/safeCells'
import { generateMines } from '../logic/generateMines'
import { generateBoardNumbers } from '../logic/generateBoard'
import { CELL_CONTENT } from '../utils/constants'

export const Board = ({ dimension, minesNumber }) => {
	const initialBoard = Array(dimension.x * dimension.y).fill(0)
	const [board, setBoard] = useState(initialBoard)
	const [clicked, setClicked] = useState(false)
	const boardRef = useRef()
	const boardStyle = {
		gridTemplateColumns: `repeat(${dimension.x}, auto)`
	}

	const handleFirstClick = (child) => {
		if (clicked) return
		// if the board is clicked, we don't want to create a new board
		if (boardRef.current === child) return

		const parent = child.parentNode
		const index = Array.from(parent.children).indexOf(child)
		setClicked(true)
		createBoard(index)
	}

	// generate board randomly
	const createBoard = (centerIndex) => {
		const bounds = {
			min: 0,
			max: board.length
		}
		const safeCells = safeCellsPositions(centerIndex, dimension)
		const minesPositions = generateMines(minesNumber, safeCells, bounds)
		setBoard(generateBoardNumbers(dimension, minesPositions))
	}

	const formatValue = (value) => {
		if (value === CELL_CONTENT.EMPTY) return ''
		if (value === CELL_CONTENT.MINE) return '💣'
		return value
	}

	return (
		<div
			className="grid gap-2 select-none"
			style={boardStyle}
			onContextMenu={(e) => e.preventDefault()}
			onClick={(e) => handleFirstClick(e.target)}
			ref={boardRef}
		>
			{board.map((value, index) => (
				<Cell key={index}>{formatValue(value)}</Cell>
			))}
		</div>
	)
}
