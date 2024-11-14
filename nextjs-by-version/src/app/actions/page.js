import { revalidatePath } from "next/cache"

export default async function Page() {
  const response = await fetch("http://localhost:4000/test")
  const data = await response.json()

  const postAction = async (formData) => {
    "use server"

    await fetch("http://localhost:4000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email")
      })
    })

    revalidatePath("/actions")
  }

  return (
    <div>
      <h1>Actions</h1>
      <div>
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.email}</p>
            </div>
          ))}
      </div>
      <div>
        <form action={postAction}>
          <input type="text" name="name" />
          <input type="text" name="email" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
