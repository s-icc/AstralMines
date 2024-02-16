import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { gameState } from '../stores/gameStateStore'
import { GAME_STATES } from '../utils/gameStates'
import { time } from '../stores/timeStore'

export const Timer = () => {
	const [seconds, setSeconds] = useState(0)
	const $gameState = useStore(gameState)

	const formatTime = (secondsElapsed) => {
		const seconds = secondsElapsed % 60
		let minutes = ''
		let hours = ''
		let minutesSuffix = ''
		let hoursSuffix = ''

		if (secondsElapsed >= 60) {
			minutes = Math.floor(secondsElapsed / 60) % 60
			minutesSuffix = 'm'
		}

		if (secondsElapsed >= 3600) {
			hours = Math.floor(secondsElapsed / 3600)
			hoursSuffix = 'h'
		}

		return (
			<>
				{hours && <span style={{ '--value': hours }}></span>}
				{hoursSuffix}
				{minutes && <span style={{ '--value': minutes }}></span>}
				{minutesSuffix}
				<span style={{ '--value': seconds }}></span>s
			</>
		)
	}

	useEffect(() => {
		if ($gameState === GAME_STATES.IDLE) setSeconds(0)
	}, [$gameState])

	// start timer when the game is playing
	useEffect(() => {
		if ($gameState === GAME_STATES.PLAYING) {
			const interval = setInterval(() => setSeconds(seconds + 1), 1000)
			return () => clearInterval(interval)
		} else time.set(seconds)
	}, [$gameState, seconds])

	return <h1 className="countdown">{formatTime(seconds)}</h1>
}
