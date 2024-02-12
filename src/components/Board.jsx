import { useState, useRef, useEffect } from 'react'
import { Cell } from './Cell'
import { safeCellsPositions } from '../logic/safeCells'
import { generateMines } from '../logic/generateMines'
import { generateBoardNumbers } from '../logic/generateBoard'
import { getValidNearbyCells } from '../logic/getValidNearbyCells'
import { gameState } from '../stores/gameState'
import { GAME_STATES } from '../utils/constants'

export const Board = ({ dimension, minesNumber }) => {
	const initialBoard = Array(dimension.x * dimension.y).fill(0)
	const [board, setBoard] = useState(initialBoard)
	const [firstClick, setFirstClick] = useState(true)
	const [cellsRevealed, setCellsRevealed] = useState(0)
	const boardRef = useRef()
	const cellsRefs = useRef([])
	const mineCellsRefs = useRef([])
	const safeCellsNum = dimension.x * dimension.y - minesNumber

	const boardStyle = {
		gridTemplateColumns: `repeat(${dimension.x}, auto)`
	}

	const handleClick = (element) => {
		if (element === boardRef.current) return
		if (!firstClick) return

		const parent = element.parentNode
		const index = Array.from(parent.children).indexOf(element)
		createBoard(index)
		gameState.set(GAME_STATES.PLAYING)
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
		setFirstClick(false)
	}

	const getNearbyRefs = (index) => {
		const validCells = getValidNearbyCells(index, dimension)
		const nearbyRefs = []

		validCells.forEach((cellIndex) => {
			nearbyRefs.push(cellsRefs.current[cellIndex])
		})

		return nearbyRefs
	}

	useEffect(() => {
		if (cellsRevealed === safeCellsNum) gameState.set(GAME_STATES.WIN)
	}, [cellsRevealed])

	useEffect(() => {
		if (board === initialBoard) return

		mineCellsRefs.current = cellsRefs.current.filter((cell) => cell.isMine())
	}, [board])

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
					getNearbyRefs={getNearbyRefs}
					ref={(el) => (cellsRefs.current[index] = el)}
					incrementCellsRevealed={() => setCellsRevealed((prev) => prev + 1)}
				>
					{value}
				</Cell>
			))}
		</div>
	)
}
