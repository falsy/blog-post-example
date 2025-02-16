import { useState } from "react"

export default function ClientMessage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Client Component</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
