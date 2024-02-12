import { atom } from 'nanostores'
import { GAME_STATES } from '../utils/constants'

export const gameState = atom(GAME_STATES.IDLE)
