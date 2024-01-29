export const saveTimerSeconds = (seconds) => {
	window.localStorage.setItem('timerSeconds', JSON.stringify(seconds))
}

export const loadTimerSeconds = () => {
	const seconds = JSON.parse(window.localStorage.getItem('timerSeconds'))
	return seconds
}
