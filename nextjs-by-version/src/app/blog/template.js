"use client"
import { useState } from "react"

export default function Template({ children }) {
  const [state, setState] = useState(0)

  return (
    <div>
      <p onClick={() => setState((pre) => pre + 1)}>{state}</p>
      <div>{children}</div>
    </div>
  )
}
