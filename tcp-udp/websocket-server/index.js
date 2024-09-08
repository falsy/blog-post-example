const WebSocket = require("ws")
const net = require("net")
const dgram = require("dgram")

const wss = new WebSocket.Server({ port: 8080 })

const tcpClient = new net.Socket()
tcpClient.connect(8000, "localhost", () => {
  console.log("TCP 서버와 연결")
})

const udpClient = dgram.createSocket("udp4")

wss.on("connection", (ws) => {
  console.log("웹 소캣 연결")

  ws.on("message", (message) => {
    console.log(`클라이언트에게 받은 메시지: ${message}`)

    // TCP 서버에 메시지 전송
    tcpClient.write(message)

    // UDP 서버에 메시지 전송
    udpClient.send(message, 7000, "localhost", (err) => {
      if (err) console.error("UDP 서버에 전송 실패:", err)
    })
  })
})
