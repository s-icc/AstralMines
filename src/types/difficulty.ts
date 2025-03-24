export interface Dimension {
  width: number
  height: number
}

export interface Difficulty {
  VALUE: string
  LABEL: string
  MINES: number
  BOARD_SIZE: Dimension
}
