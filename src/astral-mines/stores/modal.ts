import { atom } from "nanostores"
import type { ModalContent, ModalState } from "@astral-mines/types/game"

export const modalState = atom<ModalState>({
  isOpen: false,
  content: { title: "", description: "" },
})

export const setModalContent = (content: ModalContent) => {
  modalState.set({ isOpen: true, content })
}

export const closeModal = () => {
  modalState.set({ isOpen: false, content: { title: "", description: "" } })
}
