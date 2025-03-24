import type { Difficulty } from "../types/difficulty"

export const DIFFICULTIES: Record<string, Difficulty> = {
  EASY: {
    VALUE: "easy",
    LABEL: "Easy 😀",
    MINES: 8,
    BOARD_SIZE: { width: 9, height: 7 },
  },
  MEDIUM: {
    VALUE: "medium",
    LABEL: "Medium 😐",
    MINES: 12,
    BOARD_SIZE: { width: 9, height: 7 },
  },
  HARD: {
    VALUE: "hard",
    LABEL: "Hard 😵",
    MINES: 18,
    BOARD_SIZE: { width: 12, height: 7 },
  },
}
