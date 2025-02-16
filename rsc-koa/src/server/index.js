import Koa from "koa"
import Router from "@koa/router"
import serve from "koa-static"
import path from "path"
import { fileURLToPath } from "url"
import { renderToPipeableStream } from "react-dom/server"
import App from "./App.js"

const app = new Koa()
const router = new Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(serve(path.resolve(__dirname, "../../dist"), { index: false }))

router.get("/api/message", async (ctx) => {
  try {
    ctx.body = { message: "hello world" }
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: "Internal Server Error" }
  }
})

router.get("/", async (ctx) => {
  await new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(<App />, {
      bootstrapModules: ["/client/client.bundle.js"],
      onShellReady() {
        ctx.respond = false
        ctx.type = "text/html"
        ctx.status = 200
        pipe(ctx.res)
      },
      onAllReady() {
        resolve()
      },
      onShellError() {
        ctx.status = 500
        reject()
      },
      onError(error) {
        didError = true
        console.error(error)
        reject()
      },
    })
  })
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
})
