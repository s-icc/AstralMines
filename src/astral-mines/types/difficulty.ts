export interface Dimension {
  width: number
  height: number
}

export interface Difficulty {
  LABEL: string
  MINES: number
  BOARD_SIZE: Dimension
}

export type DifficultyName = "easy" | "medium" | "hard"
