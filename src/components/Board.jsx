import { useState, useRef, useEffect, useMemo } from 'react'
import { Cell } from './Cell'
import { safeCellsPositions } from '../logic/safeCells'
import { generateMines } from '../logic/generateMines'
import { generateBoardNumbers } from '../logic/generateBoard'
import { getValidNearbyCells } from '../logic/getValidNearbyCells'
import { gameState } from '../stores/gameStateStore'
import { GAME_STATES } from '../utils/gameStates'
import { useStore } from '@nanostores/react'
import { sleep } from '../utils/sleep'
import { CELL_CONTENT } from '../utils/constants'

export const Board = ({ dimension, minesNumber }) => {
	const initialBoard = Array(dimension.x * dimension.y).fill(0)
	const [board, setBoard] = useState(initialBoard)
	const [firstClick, setFirstClick] = useState(true)
	const boardRef = useRef()
	const cellsRefs = useRef([])
	const mineCellsRefs = useRef([])
	const $gameState = useStore(gameState)
	const safeCellsNum = dimension.x * dimension.y - minesNumber

	const boardStyle = {
		gridTemplateColumns: `repeat(${dimension.x}, auto)`
	}

	const handleClick = (element) => {
		if (element === boardRef.current) return

		if (firstClick) {
			const parent = element.parentNode
			const index = Array.from(parent.children).indexOf(element)
			createBoard(index)
			gameState.set(GAME_STATES.PLAYING)
		} else {
		}
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

	const checkWin = () => {
		const revealedCells = cellsRefs.current.filter((cell) => cell.isRevealed())

		if (revealedCells.length === safeCellsNum) {
			gameState.set(GAME_STATES.WIN)
		}
	}

	const formatValue = (value) => {
		for (let item of Object.values(CELL_CONTENT)) {
			if (item.VALUE === value) return item.LABEL
		}
		return value
	}

	useEffect(() => {
		GAME_STATES.IDLE.action = () => {
			cellsRefs.current.forEach((cell) => cell.reset())
			setBoard(initialBoard)
			setFirstClick(true)
		}

		GAME_STATES.WIN.action = async () => {
			mineCellsRefs.current.forEach((cell) => cell.mark())
			await sleep(1000)
			GAME_STATES.MODAL_OPEN.status = 'win'
			gameState.set(GAME_STATES.MODAL_OPEN)
		}

		GAME_STATES.LOSE.action = async () => {
			for (let cell of mineCellsRefs.current) {
				await sleep(500)
				cell.revealMine()
			}
			await sleep(1000)
			GAME_STATES.MODAL_OPEN.status = 'lose'
			gameState.set(GAME_STATES.MODAL_OPEN)
		}
	}, [])

	useEffect(() => {
		$gameState.action?.call()
	}, [$gameState])

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
					checkWin={checkWin}
				>
					{formatValue(value)}
				</Cell>
			))}
		</div>
	)
}
