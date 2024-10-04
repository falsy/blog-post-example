import { useState } from "react"
import PostsTab from "./SlowPost"

export default function TransitionState() {
  const [menu, setMenu] = useState("A")

  const handleClick = (name: string) => {
    setMenu(name)
  }

  return (
    <div style={{ maxHeight: "200px", overflow: "hidden" }}>
      <button
        onClick={() => handleClick("A")}
        style={{ color: menu === "A" ? "red" : "black" }}
      >
        A
      </button>
      <button
        onClick={() => handleClick("B")}
        style={{ color: menu === "B" ? "red" : "black" }}
      >
        B
      </button>
      <button
        onClick={() => handleClick("C")}
        style={{ color: menu === "C" ? "red" : "black" }}
      >
        C
      </button>
      <div style={{ padding: "5px 10px", background: "#f5f5f5" }}>
        {menu === "A" && <p>A</p>}
        {menu === "B" && <PostsTab />}
        {menu === "C" && <p>C</p>}
      </div>
    </div>
  )
}
