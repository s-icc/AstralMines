import type { ModalContent } from "@/types/game"

export const GAME_TITLE = "Astral Mines"

export const DEFAULT_THEME = "forest"

export const THEMES = {
  Default: DEFAULT_THEME,
  Retro: "retro",
  Dracula: "dracula",
  Valentine: "valentine",
  Night: "night",
}

export const THEMES_VALUES = Object.values(THEMES)

export const NEARBY_CELLS = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
]

export const CELL_MARK = "🚩"
export const CELL_MINE = "💣"

export const MODAL_LABELS: Record<string, ModalContent> = {
  WIN: {
    title: "You Win!",
    description: "Congratulations!",
  },
  LOSE: {
    title: "Game Over",
    description: "Better luck next time",
  },
}
