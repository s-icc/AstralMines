import { useStore } from '@nanostores/react'
import { gameState } from '../stores/gameStateStore'
import { time } from '../stores/timeStore'
import { useEffect, useRef, useState } from 'react'
import { GAME_STATES } from '../utils/gameStates'

export const GameOverModal = () => {
	const $gameState = useStore(gameState)
	const $time = useStore(time)
	const modalRef = useRef()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const handleClick = () => {
		gameState.set(GAME_STATES.IDLE)
	}

	const modalLabels = {
		win: {
			title: 'You Win!',
			description: 'Congratulations!'
		},
		lose: {
			title: 'Game Over',
			description: 'Better luck next time'
		}
	}

	useEffect(() => {
		if ($gameState === GAME_STATES.MODAL_OPEN) {
			modalRef.current.showModal()
			setTitle(modalLabels[GAME_STATES.MODAL_OPEN.status].title)
			setDescription(modalLabels[GAME_STATES.MODAL_OPEN.status].description)
		}
	}, [$gameState])

	return (
		<dialog
			id="my_modal_5"
			className="modal modal-bottom sm:modal-middle"
			ref={modalRef}
		>
			<div className="modal-box flex flex-col items-center gap-2">
				<h3 className="font-bold text-xl">{title}</h3>
				<h4 className="font-bold text-3xl">{$time}</h4>
				<p className="py-4">{description}</p>
				<div className="modal-action">
					<form method="dialog" className="flex gap-2">
						<button className="btn btn-primary" onClick={handleClick}>
							Restart
						</button>
					</form>
					<a href="/" className="btn btn-outline btn-secondary">
						Home
					</a>
				</div>
			</div>
		</dialog>
	)
}
