import type { Difficulty } from "@astral-mines/types/difficulty"

export const DIFFICULTIES: Record<string, Difficulty> = {
  easy: {
    LABEL: "Easy 😀",
    MINES: 8,
    BOARD_SIZE: { width: 9, height: 7 },
  },
  medium: {
    LABEL: "Medium 😐",
    MINES: 12,
    BOARD_SIZE: { width: 9, height: 7 },
  },
  hard: {
    LABEL: "Hard 😵",
    MINES: 18,
    BOARD_SIZE: { width: 12, height: 7 },
  },
}
