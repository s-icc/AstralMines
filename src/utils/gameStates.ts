import type { GameState } from '../types/gameState'

export const GAME_STATES = new Object() as {
	IDLE: GameState
	PLAYING: GameState
	WIN: GameState
	LOSE: GameState
	MODAL_OPEN: GameState
}

GAME_STATES.MODAL_OPEN = {
	status: 'modalOpen'
}

GAME_STATES.IDLE = {
	status: 'idle'
}

GAME_STATES.PLAYING = {
	status: 'playing'
}

GAME_STATES.WIN = {
	status: 'win'
}

GAME_STATES.LOSE = {
	status: 'lose'
}
