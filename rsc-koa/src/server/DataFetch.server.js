async function apiFetch() {
  try {
    const response = await fetch("http://localhost:3000/api/message")
    const data = await response.json()
    return data.message
  } catch (error) {
    return "Internal Server Error"
  }
}

export default async function DataFetch() {
  const message = await apiFetch()
  return (
    <>
      <div>
        <p>Response Value: {message}</p>
      </div>
      <script
        id="server-data"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ message }),
        }}
      />
    </>
  )
}
