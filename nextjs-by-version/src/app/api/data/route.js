export async function GET() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Response.json({ data: "true" }))
    }, 1000)
  })
}
