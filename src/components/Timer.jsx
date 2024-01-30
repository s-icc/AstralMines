import { useState, useEffect } from 'react'

export const Timer = () => {
	const [seconds, setSeconds] = useState(0)

	// TODO: stop timer when game is over
	// update timer every second
	useEffect(() => {
		const interval = setInterval(() => setSeconds(seconds + 1), 1000)
		return () => clearInterval(interval)
	}, [seconds])

	return (
		<h1>
			{seconds >= 60 ? Math.floor(seconds / 60) + 'm ' : ' '}
			{seconds % 60}s
		</h1>
	)
}
