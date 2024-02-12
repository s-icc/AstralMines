import { useStore } from '@nanostores/react'
import { gameState } from '../stores/gameState'
import { time } from '../stores/time'
import { useEffect, useRef, useState } from 'react'
import { GAME_STATES } from '../utils/constants'

export const GameOverModal = () => {
	const $gameState = useStore(gameState)
	const $time = useStore(time)
	const modalRef = useRef()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	useEffect(() => {
		if ($gameState === GAME_STATES.LOSE || $gameState === GAME_STATES.WIN) {
			modalRef.current.showModal()
			setTitle($gameState === GAME_STATES.LOSE ? 'Game Over' : 'You Win!')
			setDescription(
				$gameState === GAME_STATES.LOSE
					? 'Better luck next time'
					: 'Congratulations!'
			)
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
					<form method="dialog">
						<button className="btn btn-outline btn-primary">Close</button>
					</form>
				</div>
			</div>
		</dialog>
	)
}
