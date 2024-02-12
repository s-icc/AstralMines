import type { Difficulty } from './interfaces'

export const DIFFICULTIES = new Object() as {
	EASY: Difficulty
	MEDIUM: Difficulty
	HARD: Difficulty
}

DIFFICULTIES.EASY = {
	VALUE: 'easy',
	LABEL: 'Easy 😀',
	MINES: 8
}

DIFFICULTIES.MEDIUM = {
	VALUE: 'medium',
	LABEL: 'Medium 😐',
	MINES: 12
}

DIFFICULTIES.HARD = {
	VALUE: 'hard',
	LABEL: 'Hard 😵',
	MINES: 18
}
