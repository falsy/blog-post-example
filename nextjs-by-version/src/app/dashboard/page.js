"use client"
import { useState } from "react"

export default function Page() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>button</button>
    </div>
  )
}
