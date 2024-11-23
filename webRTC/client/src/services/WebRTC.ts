export default class WebRTC {
  private ws: WebSocket | null = null
  private localStream: MediaStream
  private remoteVideo: HTMLVideoElement
  clientId: string

  constructor(localStream: MediaStream, remoteVideo: HTMLVideoElement) {
    this.ws = new WebSocket("ws://localhost:7777")
    this.localStream = localStream
    this.remoteVideo = remoteVideo
  }

  onOpen() {
    this.ws.onopen = async () => {
      const peerConnection = this.createPeerConnection()

      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)

      this.ws.send(JSON.stringify({ offer }))
    }
  }

  onMessage() {
    this.ws.onmessage = async (message) => {
      const data = JSON.parse(message.data)
      const peerConnection = this.createPeerConnection()

      if (data.type === "welcome") {
        this.clientId = data.id
        console.log(`내 클라이언트 ID: ${this.clientId}`)
      } else if (data.offer) {
        await peerConnection.setRemoteDescription(data.offer)
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)
        this.ws.send(JSON.stringify({ answer }))
      } else if (data.answer) {
        await peerConnection.setRemoteDescription(data.answer)
      } else if (data.candidate) {
        await peerConnection.addIceCandidate(data.candidate)
      }
    }
  }

  close() {
    this.ws.close()
  }

  createPeerConnection() {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    })

    this.localStream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, this.localStream))

    console.log("createPeerConnection", peerConnection)
    peerConnection.ontrack = (event) => {
      console.log("ontrack", event)
      this.remoteVideo.srcObject = event.streams[0]
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.ws!.send(
          JSON.stringify({
            type: "candidate",
            candidate: event.candidate
          })
        )
      }
    }

    return peerConnection
  }
}
