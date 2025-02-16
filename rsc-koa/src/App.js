import ClientMessage from "./client/ClientMessage.js"
import ServerMessage from "./server/ServerMessage.server.js"

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Koa + React Server Component Example</title>
      </head>
      <body>
        <div id="root">
          <h1>React Server Component</h1>
          <section>
            <h2>Server</h2>
            <ServerMessage />
          </section>
          <section>
            <h2>Client</h2>
            <ClientMessage />
          </section>
        </div>
      </body>
    </html>
  )
}
