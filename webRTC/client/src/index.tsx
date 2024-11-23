import ReactDOM from "react-dom/client"
import Meeting from "./components/Meeting"

const container = document.getElementById("wrap")
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <>
      <Meeting />
    </>
  )
}
root.render(<App />)
