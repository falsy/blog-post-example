import ClientMessage from "../components/ClientMessage.js"
import DataFetch from "./DataFetch.server.js"
import ServerMessage from "./ServerMessage.server.js"

export default function App() {
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
            <ServerMessage />
          </section>
          <section>
            <h2>Client</h2>
            <ClientMessage />
          </section>
          <section>
            <h2>Data Fetch</h2>
            <DataFetch />
          </section>
        </div>
      </body>
    </html>
  )
}
