import { generateBoard } from "@astral-mines/logic/generateBoard"
import type { Dimension } from "@astral-mines/types/difficulty"
import { atom } from "nanostores"
import { gameState } from "./gameStateStore"
import type { Board, Cell, Coord } from "@astral-mines/types/game"

export const boardState = atom<Board>([])

export const initBoard = (dimension: Dimension) => {
  const board: Board = Array.from({ length: dimension.height }, () =>
    Array.from({ length: dimension.width }, () => ({
      adjacentMines: 0,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
    }))
  )

  boardState.set(board)
}

export const createBoard = (
  dimension: Dimension,
  minesNumber: number,
  centerIndex: number
) => {
  const board = boardState.get()

  boardState.set(generateBoard(board, centerIndex, dimension, minesNumber))
}

export const getCell = (coord: Coord) => boardState.get()[coord.y][coord.x]

const setCell = (coord: Coord, cell: Cell) => {
  const newBoard = [...boardState.get()]
  newBoard[coord.y][coord.x] = cell
  boardState.set(newBoard)
}

export const getCellCoords = (cell: Cell) => {
  for (let rowIndex = 0; rowIndex < boardState.get().length; rowIndex++) {
    const row = boardState.get()[rowIndex]

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const col = row[colIndex]
      if (col === cell) return { x: colIndex, y: rowIndex }
    }
  }
}

export const revealCell = (coord: Coord) => {
  const cell = getCell(coord)

  if (cell.isFlagged) return

  if (cell.isMine) {
    gameState.set("LOSE")
  }

  cell.isRevealed = true
  setCell(coord, cell)
}

export const flagCell = (coord: Coord, isFlagged: boolean) => {
  const cell = getCell(coord)

  cell.isFlagged = isFlagged
  setCell(coord, cell)
}

export const getRevealedCells = () =>
  boardState
    .get()
    .map((row) => row.filter((cell) => cell.isRevealed))
    .flat()

export const getFlaggedCells = () =>
  boardState
    .get()
    .map((row) => row.filter((cell) => cell.isFlagged))
    .flat()

export const getMineCells = () =>
  boardState
    .get()
    .map((row) => row.filter((cell) => cell.isMine))
    .flat()

export const revealMines = () => {
  const mineCells = getMineCells()
  mineCells.forEach((cell) => {
    const coords = getCellCoords(cell)
    if (coords) revealCell(coords)
  })
}

export const flagMines = () => {
  const mineCells = getMineCells()
  mineCells.forEach((cell) => {
    const coords = getCellCoords(cell)
    if (coords) flagCell(coords, true)
  })
}
