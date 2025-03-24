import { generateBoard } from "@/logic/generateBoard"
import { generateMines } from "@/logic/generateMines"
import { safeCellsPositions } from "@/logic/safeCells"
import type { Dimension } from "@/types/difficulty"
import { atom } from "nanostores"
import { gameState } from "./gameStateStore"
import { Game } from "@/utils/game"
import type { Board, Cell, Coord } from "@/types/game"
import { indexToCoords } from "@/utils/coords"

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
  const safeCells = safeCellsPositions(
    indexToCoords(centerIndex, dimension.width),
    dimension
  )
  const minesPositions = generateMines(minesNumber, safeCells, dimension)
  const board = boardState.get()

  boardState.set(generateBoard(board, dimension, minesPositions))
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
  const game = gameState.get()

  if (!cell.isFlagged) {
    cell.isRevealed = true
    setCell(coord, cell)
  }

  if (game === Game.LOSE || game === Game.WIN) return

  if (cell.isMine) {
    gameState.set(Game.LOSE)
  }
}

export const markCell = (coord: Coord, isFlagged: boolean) => {
  const cell = getCell(coord)
  const game = gameState.get()

  if (game === Game.LOSE || game === Game.WIN) return

  cell.isFlagged = isFlagged
  setCell(coord, cell)
}

export const getRevealedCells = () =>
  boardState
    .get()
    .map((row) => row.filter((cell) => cell.isRevealed))
    .flat()

export const getMarkedCells = () =>
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

export const markMines = () => {
  const mineCells = getMineCells()
  mineCells.forEach((cell) => {
    const coords = getCellCoords(cell)
    if (coords) markCell(coords, true)
  })
}
