import { useState } from 'react'

export const Cell = ({ valor }) => {
	const [disabled, setDisabled] = useState(false)
	const [shot, setShot] = useState(false)

	function handleClick() {
		if (!shot) setDisabled(true)
	}

	function handleContextMenu() {
		if (!disabled) setShot(!shot)
	}

	return (
		<button
			disabled={disabled}
			className="btn btn-primary w-12 h-12 disabled:btn-outline"
			onClick={handleClick}
			onContextMenu={handleContextMenu}
		>
			{disabled ? valor : shot ? 'X' : ''}
		</button>
	)
}
