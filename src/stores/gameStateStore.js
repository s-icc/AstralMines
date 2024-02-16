import { atom } from 'nanostores'
import { GAME_STATES } from '../utils/gameStates'

export const gameState = atom(GAME_STATES.IDLE)
