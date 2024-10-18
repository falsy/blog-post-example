import { useState, useActionState } from "react"

function updateName(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        name: name,
      })
    }, 1000)
  })
}

export default function ActionState() {
  const [name, setName] = useState("")

  const [state, action, pending] = useActionState(
    async (previousState, newState) => {
      const res = await updateName(newState.nam)
      return res
    },
    { name: "" }
  )

  const handleClick = () => {
    action({ name })
  }

  return (
    <div>
      <p>name: {state.name}</p>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleClick} disabled={pending}>
        Update
      </button>
    </div>
  )
}
