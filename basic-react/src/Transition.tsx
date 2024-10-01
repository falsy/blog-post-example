import { useState, useTransition } from "react"
import PostsTab from "./SlowPost"

export default function Transition() {
  const [_, startTransition] = useTransition()
  const [menu, setMenu] = useState("A")

  const handleClick = (name: string) => {
    startTransition(() => {
      setMenu(name)
    })
  }

  return (
    <div style={{ maxHeight: "200px", overflow: "hidden" }}>
      <p
        onClick={() => handleClick("A")}
        style={{ color: menu === "A" ? "red" : "black" }}
      >
        A
      </p>
      <p
        onClick={() => handleClick("B")}
        style={{ color: menu === "B" ? "red" : "black" }}
      >
        B
      </p>
      <p
        onClick={() => handleClick("C")}
        style={{ color: menu === "C" ? "red" : "black" }}
      >
        C
      </p>
      <div style={{ padding: "5px 10px", background: "#f5f5f5" }}>
        {menu === "A" && <p>A</p>}
        {menu === "B" && <PostsTab />}
        {menu === "C" && <p>C</p>}
      </div>
    </div>
  )
}
