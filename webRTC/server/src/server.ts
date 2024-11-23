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

const clients: Map<string, WebSocket> = new Map()

wss.on("connection", (socket) => {
  const clientId = Math.random().toString(36).substring(2, 9)
  clients.set(clientId, socket)
  console.log(`클라이언트 ${clientId} 연결됨`)

  socket.on("message", (message) => {
    const data = JSON.parse(message.toString())
    const { to } = data

    if (clients.has(to)) {
      const targetSocket = clients.get(to)
      if (targetSocket && targetSocket.readyState === WebSocket.OPEN) {
        targetSocket.send(JSON.stringify({ ...data, from: clientId }))
      }
    }
  })

  socket.on("close", () => {
    console.log(`클라이언트 연결 종료: ${clientId}`)
    clients.delete(clientId)
  })

  socket.send(JSON.stringify({ type: "join", id: clientId }))
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
