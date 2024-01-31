import { useState } from 'react'

export const Cell = ({ children }) => {
	const [isRevealed, setRevealed] = useState(false)
	const [isMarked, setMarked] = useState(false)

	const handleClick = () => {
		if (!isMarked) setRevealed(true)
	}

	const handleContextMenu = () => {
		if (!isRevealed) setMarked(!isMarked)
	}

	return (
		<button
			disabled={isRevealed}
			className="btn btn-primary text-xl w-12 h-12 disabled:btn-outline"
			style={{ color: 'oklch(var(--a))' }}
			onClick={handleClick}
			onContextMenu={handleContextMenu}
		>
			{isRevealed ? children : isMarked ? '🚩' : ''}
		</button>
	)
}
