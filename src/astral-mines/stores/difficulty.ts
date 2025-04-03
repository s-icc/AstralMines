import { atom } from "nanostores"
import type { DifficultyName } from "@astral-mines/types/difficulty"

export const difficultyStore = atom<DifficultyName>("easy")
