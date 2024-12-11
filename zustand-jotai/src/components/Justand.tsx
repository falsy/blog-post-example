import { useCounter } from "../hooks/useCounter"
import ChildJustand from "./ChildJustand"

export default function Justand() {
  const [count, setCount] = useCounter()

  return (
    <div>
      <h2>Justand</h2>
      <p>Count: {count}</p>
      <div>
        <ChildJustand />
      </div>
      <div>
        <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      </div>
    </div>
  )
}
