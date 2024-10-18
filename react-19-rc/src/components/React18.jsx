import { useState } from "react"

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

export default function React18() {
  const [displayName, setDisplayName] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async () => {
    setIsPending(true)
    const { success, name: resName } = await updateName(name)
    setIsPending(false)
    if (success === false) {
      setError(true)
      return
    }
    setDisplayName(resName)
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
