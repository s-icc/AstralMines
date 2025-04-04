import { useState, useRef, useEffect, useMemo } from "react"
import { CellButton } from "@astral-mines/components/Cell"
import { gameState, setAction } from "@astral-mines/stores/gameStateStore"
import { useStore } from "@nanostores/react"
import { sleep } from "@astral-mines/utils/sleep"
import { MODAL_LABELS } from "@astral-mines/utils/constants"
import {
  boardState,
  createBoard,
  getRevealedCells,
  initBoard,
  flagMines,
  revealMines,
} from "@astral-mines/stores/board"
import type { Dimension } from "@astral-mines/types/difficulty"
import { setModalContent } from "../stores/modal"

interface BoardProps {
  dimension: Dimension
  minesNumber: number
}

export const Board = ({ dimension, minesNumber }: BoardProps) => {
  const $boardState = useStore(boardState)
  const [firstClick, setFirstClick] = useState(true)
  const boardRef = useRef<HTMLDivElement | null>(null)
  const safeCellsNum = useMemo(
    () => dimension.width * dimension.height - minesNumber,
    []
  )

  const handleClick = (element: Element) => {
    if (element === boardRef.current) return

    if (firstClick) {
      const parent = boardRef.current as HTMLDivElement
      const index = Array.from(parent?.children ?? []).indexOf(element)
      setFirstClick(false)
      createBoard(dimension, minesNumber, index)
      gameState.set("PLAYING")
    }
  }

  const checkWin = () => {
    const revealedCells = getRevealedCells()

    if (revealedCells.length === safeCellsNum) {
      gameState.set("WIN")
    }
  }

  useEffect(() => {
    initBoard(dimension)

    setAction("IDLE", () => {
      initBoard(dimension)
      setFirstClick(true)
    })

    setAction("WIN", async () => {
      flagMines()
      await sleep(2000)
      setModalContent(MODAL_LABELS.WIN)
    })

    setAction("LOSE", async () => {
      revealMines()
      await sleep(2000)
      setModalContent(MODAL_LABELS.LOSE)
    })
  }, [])

  return (
    <div
      className="grid gap-2 select-none"
      style={{
        gridTemplateColumns: `repeat(${dimension.width}, auto)`,
      }}
      onContextMenu={(e) => e.preventDefault()}
      onClick={(e) => handleClick(e.target as Element)}
      ref={boardRef}
    >
      {$boardState.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <CellButton
            key={`${rowIndex}-${cellIndex}`}
            cell={cell}
            coords={{ x: cellIndex, y: rowIndex }}
            checkWin={checkWin}
          />
        ))
      )}
    </div>
  )
}
