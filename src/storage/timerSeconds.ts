export const saveTimerSeconds = (seconds: number) => {
  window.localStorage.setItem("timerSeconds", JSON.stringify(seconds))
}

export const loadTimerSeconds = () => {
  const seconds: number = JSON.parse(
    window.localStorage.getItem("timerSeconds") || "0"
  )
  return seconds
}
