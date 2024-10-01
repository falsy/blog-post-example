import { useState } from "react"

export default function Batching2() {
  const [state1, setState1] = useState(0)
  const [state2, setState2] = useState(false)

  const onClick = () => {
    setTimeout(() => {
      setState1((prev) => prev + 1)
      setState2((prev) => !prev)
    }, 500)
  }

  console.log("render")

  return (
    <>
      <div>{state1}</div>
      <div>{state2.toString()}</div>
      <button onClick={onClick}>button</button>
    </>
  )
}
