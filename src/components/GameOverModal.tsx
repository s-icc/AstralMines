import { useStore } from "@nanostores/react"
import { gameState } from "../stores/gameStateStore"
import { time } from "../stores/timeStore"
import { useEffect, useRef, useState } from "react"
import { Game } from "@/stores/gameStateStore"
import type { ModalContent } from "@/types/game"

export const GameOverModal = () => {
  const $gameState = useStore(gameState)
  const $time = useStore(time)
  const modalRef = useRef<HTMLDialogElement | null>(null)
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    description: "",
  })

  const handleClick = () => {
    gameState.set("IDLE")
  }

  useEffect(() => {
    if ($gameState === "MODAL_OPEN") {
      modalRef.current?.showModal()
      setModalContent(Game[$gameState].action())
    }
  }, [$gameState])

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
      ref={modalRef}
    >
      <div className="modal-box flex flex-col items-center gap-2">
        <h3 className="font-bold text-xl">{modalContent.title}</h3>
        <h4 className="font-bold text-3xl">{$time}</h4>
        <p className="py-4">{modalContent.description}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn btn-primary" onClick={handleClick}>
              Restart
            </button>
          </form>
          <a href="/" className="btn btn-outline btn-secondary">
            Home
          </a>
        </div>
      </div>
    </dialog>
  )
}
