import { Children, useState } from 'react'

export const Cell = ({ children }) => {
	const [isRevealed, setRevealed] = useState(false)
	const [isFlagged, setFlagged] = useState(false)

	const handleClick = () => {
		if (!isFlagged) setRevealed(true)
	}

	const handleContextMenu = () => {
		if (!isRevealed) setFlagged(!isFlagged)
	}

	return (
		<button
			disabled={isRevealed}
			className="btn btn-primary w-12 h-12 disabled:btn-outline"
			onClick={handleClick}
			onContextMenu={handleContextMenu}
		>
			{isRevealed ? children : isFlagged ? '🏳' : ''}
		</button>
	)
}
