import type { Difficulty } from '../types/difficulty'

export const DIFFICULTIES = new Object() as {
	EASY: Difficulty
	MEDIUM: Difficulty
	HARD: Difficulty
}

DIFFICULTIES.EASY = {
	VALUE: 'easy',
	LABEL: 'Easy 😀',
	MINES: 8,
	BOARD_SIZE: { x: 9, y: 7 }
}

DIFFICULTIES.MEDIUM = {
	VALUE: 'medium',
	LABEL: 'Medium 😐',
	MINES: 12,
	BOARD_SIZE: { x: 9, y: 7 }
}

DIFFICULTIES.HARD = {
	VALUE: 'hard',
	LABEL: 'Hard 😵',
	MINES: 18,
	BOARD_SIZE: { x: 12, y: 7 }
}
