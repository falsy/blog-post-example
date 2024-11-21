import Koa from "koa"
import cors from "@koa/cors"
import { WebSocketServer, WebSocket } from "ws"

const app = new Koa()

const allowedOrigins = ["http://localhost:2000"]

app.use(
  cors({
    origin: (ctx) => {
      const origin = ctx.request.header.origin
      if (origin && allowedOrigins.includes(origin)) {
        return origin
      }
      return ""
    }
  })
)

const wss = new WebSocketServer({ noServer: true })

interface Client {
  id: string
  socket: WebSocket
}

const clients: Client[] = []

wss.on("connection", (socket) => {
  const clientId = Math.random().toString(36).substring(2, 9)
  clients.push({ id: clientId, socket })

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString())

    clients.forEach((client) => {
      if (
        client.socket !== socket &&
        client.socket.readyState === WebSocket.OPEN
      ) {
        client.socket.send(
          JSON.stringify({
            ...parsedMessage,
            from: clientId
          })
        )
      }
    })
  })

  socket.on("close", () => {
    const index = clients.findIndex((client) => client.id === clientId)
    if (index !== -1) clients.splice(index, 1)
  })
})

const server = app.listen(7777, () => {
  console.log("Koa, WebSocket 서버가 http://localhost:7777 에서 실행 중입니다.")
})

server.on("upgrade", (request, socket, head) => {
  const origin = request.headers.origin

  if (!origin || !allowedOrigins.includes(origin)) {
    socket.write("HTTP/1.1 403 Forbidden\r\n\r\n")
    socket.destroy()
    return
  }

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request)
  })
})
