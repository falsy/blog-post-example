import { useOptimistic, useState, useTransition } from "react"

let toggle = true

function updateName(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (toggle) {
        resolve({
          success: true,
          name: name,
        })
      } else {
        reject("Error")
      }
      toggle = !toggle
    }, 1000)
  })
}

export default function Optimistic() {
  const [originData, setOriginData] = useState("")
  const [optimisticName, setOptimisticName] = useOptimistic(originData)
  const [name, setName] = useState(originData)
  const [error, setError] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {
    setError(false)
    startTransition(async () => {
      setOptimisticName(name)
      try {
        const { name: resName } = await updateName(name)
        setOriginData(resName)
      } catch (e) {
        setError(true)
      }
    })
  }

  return (
    <div>
      <p>name: {optimisticName}</p>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>error</p>}
    </div>
  )
}
