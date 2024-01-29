import { useState, useEffect } from 'react'
import { loadTimerSeconds, saveTimerSeconds } from '../storage/timerSeconds'

export const Timer = () => {
	const [seconds, setSeconds] = useState(() => {
		return loadTimerSeconds() ?? 0
	})

	// TODO: stop timer when game is over
	// update timer every second
	useEffect(() => {
		const interval = setInterval(() => setSeconds(seconds + 1), 1000)
		return () => clearInterval(interval)
	}, [seconds])

	// save to localStorage
	useEffect(() => {
		saveTimerSeconds(seconds)
	}, [seconds])

	return (
		<h1>
			{seconds >= 60 ? Math.floor(seconds / 60) + 'm ' : ' '}
			{seconds % 60}s
		</h1>
	)
}
