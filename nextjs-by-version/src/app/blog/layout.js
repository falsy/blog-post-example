"use client"
import { useState } from "react"

export default function Layout({ children }) {
  const [state, setState] = useState(0)

  return (
    <div>
      <h1>Blog</h1>
      <p onClick={() => setState((pre) => pre + 1)}>{state}</p>
      <div>{children}</div>
    </div>
  )
}
