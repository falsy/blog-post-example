import { useState } from "react"
import ClientMessage from "../components/ClientMessage.js"

export default function App() {
  const [message, setMessage] = useState(() => {
    const dataEl = document.getElementById("server-data")
    if (dataEl) {
      try {
        const serverData = JSON.parse(dataEl.textContent)
        return serverData.message
      } catch (error) {
        console.error("Failed to parse server data:", error)
        return "Failed to load"
      }
    }
    return ""
  })

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Koa + React Server Component Example</title>
      </head>
      <body>
        <div id="root">
          <h1>React Server Component Example</h1>
          <section>
            <h2>Server</h2>
            <div>
              <p>Server Component</p>
            </div>
          </section>
          <section>
            <h2>Client</h2>
            <ClientMessage />
          </section>
          <section>
            <h2>Data Fetch</h2>
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
          </section>
        </div>
      </body>
    </html>
  )
}
