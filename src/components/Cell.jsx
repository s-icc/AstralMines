import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { CELL_CONTENT, CELL_MARK } from '../utils/constants'
import { GAME_STATES } from '../utils/gameStates'
import { gameState } from '../stores/gameStateStore'
import { useStore } from '@nanostores/react'

export const Cell = forwardRef(
	({ children, index, getNearbyRefs, checkWin }, ref) => {
		const [isRevealed, setRevealed] = useState(false)
		const [isMarked, setMarked] = useState(false)
		const [formattedContent, setFormattedContent] = useState('')
		const $gameState = useStore(gameState)

		const formatValue = (value) => {
			if (value === CELL_CONTENT.EMPTY.VALUE) return ''
			if (value === CELL_CONTENT.MINE.VALUE) return CELL_CONTENT.MINE.LABEL
			return value
		}

		const handleContent = () => {
			if (isRevealed) return formattedContent
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

		useEffect(() => {
			setFormattedContent(formatValue(children))
		}, [children])

		// execute when the cell is revealed
		useEffect(() => {
			if (!isRevealed) return

			const nearbyRefs = getNearbyRefs(index)

			// if the content is empty, reveals the nearby cells
			if (children === CELL_CONTENT.EMPTY.VALUE)
				nearbyRefs.map((cell) => cell.reveal())

			if (children === CELL_CONTENT.MINE.VALUE) gameState.set(GAME_STATES.LOSE)

			// check if the game is won
			checkWin()
		}, [isRevealed])

		useImperativeHandle(ref, () => ({
			reveal: () => handleClick(),
			revealMine: () => handleRevealedMine(),
			mark: () => setMarked(true),
			isRevealed: () => isRevealed,
			isMine: () => children === CELL_CONTENT.MINE.VALUE,
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
