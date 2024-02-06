import { useState, useRef } from 'react'
import { Cell } from './Cell'
import { safeCellsPositions } from '../logic/safeCells'
import { generateMines } from '../logic/generateMines'
import { generateBoardNumbers } from '../logic/generateBoard'
import { CELL_CONTENT } from '../utils/constants'
import { getValidNearbyCells } from '../logic/getValidNearbyCells'

export const Board = ({ dimension, minesNumber }) => {
	const initialBoard = Array(dimension.x * dimension.y).fill(0)
	const [board, setBoard] = useState(initialBoard)
	const [click, setClick] = useState('first')
	const boardRef = useRef()
	const cellsRefs = useRef([])

	const boardStyle = {
		gridTemplateColumns: `repeat(${dimension.x}, auto)`
	}

	const clickActions = {
		first: (index) => {
			createBoard(index)
			setClick('default')
		},
		default: (index) => {
			// const newBoard = revealCells(board, index, dimension)
			// setBoard(newBoard)
		}
	}

	const handleClick = (element) => {
		if (element === boardRef.current) return

		const parent = element.parentNode
		const index = Array.from(parent.children).indexOf(element)

		clickActions[click](index)
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

	const getNearbyRefs = (index) => {
		const validCells = getValidNearbyCells(index, dimension)
		const nearbyRefs = []

		validCells.forEach((cellIndex) => {
			nearbyRefs.push(cellsRefs.current[cellIndex])
		})

		return nearbyRefs
	}

	return (
		<div
			className="grid gap-2 select-none"
			style={boardStyle}
			onContextMenu={(e) => e.preventDefault()}
			onClick={(e) => handleClick(e.target)}
			ref={boardRef}
		>
			{board.map((value, index) => (
				<Cell
					key={index}
					index={index}
					bounds={dimension}
					getNearbyRefs={getNearbyRefs}
					ref={(el) => (cellsRefs.current[index] = el)}
				>
					{formatValue(value)}
				</Cell>
			))}
		</div>
	)
}
