const net = require("net")

const tcpServer = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(`TCP 요청: ${data}`)
    // 통신 지연 시뮬레이션
    setTimeout(() => {
      socket.write(`TCP 응답: ${data}`)
    }, Math.random() * 5000)
  })

  socket.on("close", () => {
    console.log("TCP 중단")
  })
})

tcpServer.listen(8000, "localhost", () => {
  console.log("TCP 서버가 포트 8000에 실행 중입니다.")
})
