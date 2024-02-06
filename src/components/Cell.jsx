import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'

export const Cell = forwardRef(({ children, index, getNearbyRefs }, ref) => {
	const [isRevealed, setRevealed] = useState(false)
	const [isMarked, setMarked] = useState(false)

	const handleClick = () => {
		if (!isMarked) setRevealed(true)
	}

	const handleContextMenu = () => {
		if (!isRevealed) setMarked(!isMarked)
	}

	// execute when the cell is revealed
	useEffect(() => {
		if (isRevealed) {
			const nearbyRefs = getNearbyRefs(index)
			// if the content is empty, reveals the nearby cells
			if (children === '') nearbyRefs.map((cell) => cell.reveal())
		}
	}, [isRevealed])

	useImperativeHandle(ref, () => ({
		reveal: () => handleClick()
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
			{isRevealed ? children : isMarked ? '🚩' : ''}
		</button>
	)
})
