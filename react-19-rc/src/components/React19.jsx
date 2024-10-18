import { useState, useTransition } from "react"

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

export default function React19() {
  const [displayName, setDisplayName] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {
    const cache = name
    startTransition(async () => {
      setDisplayName(name)
      const { success, name: resName } = await updateName(name)
      if (success === false) {
        setError(true)
        setDisplayName(cache)
        return
      }
    })
  }

  return (
    <div>
      <p>name: {displayName}</p>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>error</p>}
    </div>
  )
}
