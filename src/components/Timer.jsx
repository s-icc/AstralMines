import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { gameState } from '../stores/gameState'
import { GAME_STATES } from '../utils/constants'
import { time } from '../stores/time'

export const Timer = () => {
	const [seconds, setSeconds] = useState(0)
	const $gameState = useStore(gameState)

	// start timer when the game is playing
	useEffect(() => {
		if ($gameState === GAME_STATES.PLAYING) {
			const interval = setInterval(() => setSeconds(seconds + 1), 1000)
			return () => clearInterval(interval)
		} else time.set(seconds)
	}, [$gameState, seconds])

	return (
		<h1 className="timer">
			{seconds >= 60 ? Math.floor(seconds / 60) + 'm ' : ' '}
			{seconds % 60}s
		</h1>
	)
}
