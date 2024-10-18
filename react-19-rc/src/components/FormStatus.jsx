import { useActionState } from "react"
import FormStatusBtn from "./FormStatusBtn"

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

export default function ActionStateForm() {
  const [state, formAction, pending] = useActionState(
    async (previousState, formData) => {
      const name = formData.get("name")
      const res = await updateName(name)
      return res
    },
    { name: "" }
  )

  return (
    <form action={formAction}>
      <p>name: {state.name}</p>
      <input type="text" id="name" name="name" required />
      <FormStatusBtn />
    </form>
  )
}
