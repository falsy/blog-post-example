const WebSocket = require("ws")
const dgram = require("dgram")

const wss = new WebSocket.Server({ port: 8080 })
const udpClient = dgram.createSocket("udp4")

const CHUNK_SIZE = 8 * 1024 // 8KB

// UDP 서버로부터 응답 수신
udpClient.on("message", (msg, rinfo) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  })
})

wss.on("connection", (ws) => {
  console.log("웹 소캣 연결")

  ws.on("message", (message) => {
    console.log("이미지 데이터를 수신했습니다. UDP 서버로 전송합니다.")
    let offset = 0

    while (offset < message.length) {
      const chunk = message.slice(offset, offset + CHUNK_SIZE)
      udpClient.send(chunk, 7000, "localhost", (err) => {
        if (err) console.error("UDP 서버에 전송 실패:", err)
      })
      offset += CHUNK_SIZE
    }
  })
})
