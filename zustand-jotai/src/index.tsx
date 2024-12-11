import ReactDOM from "react-dom/client"
import Dashboard from "./components/Dashboard"

const container = document.getElementById("wrap")
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return <Dashboard />
}

root.render(<App />)
