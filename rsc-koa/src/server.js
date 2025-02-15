import Koa from "koa"
import Router from "@koa/router"
import { renderToPipeableStream } from "react-dom/server"

function ServerComponent() {
  return (
    <html leng="en">
      <head>
        <meta charSet="utf-8" />
        <title>Koa + React Server Component Example</title>
      </head>
      <body>
        <h1>React Server Component</h1>
        <p>This component was rendered on the server.</p>
      </body>
    </html>
  )
}

const app = new Koa()
const router = new Router()

router.get("/", (ctx) => {
  const { pipe } = renderToPipeableStream(<ServerComponent />, {
    onShellReady() {
      ctx.type = "text/html"
      ctx.status = 200
      pipe(ctx.res)
    },
    onError(error) {
      console.error("An error occurred while rendering: ", error)
      ctx.throw(500, "Server rendering error")
    },
  })
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
})
