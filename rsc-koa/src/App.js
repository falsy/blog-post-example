import ClientComponent from "./client/ClientComponent.js"

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
            <p>This component was rendered on the server.</p>
          </section>
          <section>
            <h2>Client</h2>
            <ClientComponent />
          </section>
        </div>
      </body>
    </html>
  )
}
