const WebSocket = require("ws")
const net = require("net")
const dgram = require("dgram")

const wss = new WebSocket.Server({ port: 8080 })
const udpClient = dgram.createSocket("udp4")

let startTime = 0

// UDP 서버로부터 응답 수신
udpClient.on("message", (msg, rinfo) => {
  const endTime = Date.now()
  console.log(`UDP 서버 응답 시간: ${endTime - startTime}ms`)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`UDP 서버 응답: ${msg}`)
    }
  })
})

wss.on("connection", (ws) => {
  console.log("웹 소캣 연결")

  ws.on("message", (message) => {
    console.log(`클라이언트에게 받은 메시지: ${message}`)

    startTime = Date.now()

    // TCP 서버에 연결 후 메시지 전송
    const tcpClient = new net.Socket()
    tcpClient.connect(8000, "localhost", () => {
      tcpClient.write(message)
    })

    // TCP 서버로부터 응답 수신
    tcpClient.on("data", (data) => {
      const endTime = Date.now()
      console.log(`TCP 서버 응답 시간: ${endTime - startTime}ms`)
      ws.send(`TCP 서버 응답: ${data}`)
      // 통신 종료 후 TCP 연결 닫기
      tcpClient.end()
    })

    // UDP 서버에 메시지 전송
    udpClient.send(message, 7000, "localhost", (err) => {
      if (err) console.error("UDP 서버에 전송 실패:", err)
    })
  })
})
