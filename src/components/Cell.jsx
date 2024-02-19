import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { CELL_CONTENT, CELL_MARK } from '../utils/constants'
import { GAME_STATES } from '../utils/gameStates'
import { gameState } from '../stores/gameStateStore'
import { useStore } from '@nanostores/react'

export const Cell = forwardRef(
	({ children, index, getNearbyRefs, checkWin }, ref) => {
		const [isRevealed, setRevealed] = useState(false)
		const [isMarked, setMarked] = useState(false)
		const $gameState = useStore(gameState)

		const handleContent = () => {
			if (isRevealed) return children
			return ''
		}

		const handleClick = () => {
			if ($gameState === GAME_STATES.LOSE || $gameState === GAME_STATES.WIN)
				return
			if (!isMarked) setRevealed(true)
		}

		const handleContextMenu = () => {
			if ($gameState === GAME_STATES.LOSE || $gameState === GAME_STATES.WIN)
				return
			setMarked(!isMarked)
		}

		const handleRevealedMine = () => {
			setMarked(false)
			setRevealed(true)
		}

		// execute when the cell is revealed
		useEffect(() => {
			if (!isRevealed) return

			const nearbyRefs = getNearbyRefs(index)

			// if the content is empty, reveals the nearby cells
			if (children === CELL_CONTENT.EMPTY.LABEL)
				nearbyRefs.map((cell) => cell.reveal())

			// if the cell is a mine, game is lose
			if (children === CELL_CONTENT.MINE.LABEL) gameState.set(GAME_STATES.LOSE)
			// else, check if the game is won
			else checkWin()
		}, [isRevealed])

		useImperativeHandle(ref, () => ({
			reveal: () => handleClick(),
			revealMine: () => handleRevealedMine(),
			mark: () => setMarked(true),
			isRevealed: () => isRevealed,
			isMine: () => children === CELL_CONTENT.MINE.LABEL,
			reset: () => {
				setRevealed(false)
				setMarked(false)
			}
		}))

		return (
			<button
				disabled={isRevealed}
				className="btn btn-primary text-xl w-12 h-12 disabled:btn-outline"
				style={{ color: 'oklch(var(--a))' }}
				onClick={handleClick}
				onContextMenu={handleContextMenu}
				ref={ref}
			>
				{isMarked ? CELL_MARK : handleContent()}
			</button>
		)
	}
)
