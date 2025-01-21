import { StrictMode, useRef } from "react"
import ReactDOM from "react-dom/client"
import IntersectionA from "./components/IntersectionA"
import IntersectionB from "./components/IntersectionB"
import IntersectionC from "./components/IntersectionC"
import IntersectionD from "./components/IntersectionD"
import IntersectionE from "./components/IntersectionE"
import IntersectionF from "./components/IntersectionF"
import IntersectionG from "./components/IntersectionG"
import "./global.css"

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <StrictMode>
      <div className="container">
        <div ref={rootRef} className="observer-container">
          <div className="observer-box">
            <IntersectionA />
            <IntersectionB />
            <IntersectionC />
            <IntersectionD ref={rootRef} />
            <IntersectionE ref={rootRef} />
            <IntersectionF ref={rootRef} />
            <IntersectionG ref={rootRef} />
          </div>
        </div>
      </div>
    </StrictMode>
  )
}

root.render(<App />)
