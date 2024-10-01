import { ReactNode, useState } from "react"
import ReactDOM from "react-dom"

const Modal = ({ children }: { children: ReactNode }) => {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal-root") as HTMLElement
  )
}

export default function Portal() {
  const [isModalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <div>
      <h1>React Portals</h1>
      <button onClick={toggleModal}>
        {isModalOpen ? "Close Modal" : "Open Modal"}
      </button>

      {isModalOpen && (
        <Modal>
          <div>
            <h2>Modal</h2>
            <button onClick={toggleModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
