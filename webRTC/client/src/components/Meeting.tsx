import { useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"

export default function Meeting() {
  const ws = useRef<WebSocket | null>(null)
  const pc = useRef<RTCPeerConnection | null>(null)
  const localVideo = useRef<HTMLVideoElement>(null)
  const remoteVideo = useRef<HTMLVideoElement>(null)
  const inputEl = useRef<HTMLInputElement>(null)

  const [clinetId, setClientId] = useState<string>("")
  const [remoteClientId, setRemoteClientId] = useState<string>("")

  const getUserMedia = async () => {
    try {
      const localStream = await window.navigator.mediaDevices.getUserMedia({
        video: true
      })
      return localStream
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const setPeerConnection = (localStream: MediaStream) => {
    const RTCPC = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    })

    localStream
      .getTracks()
      .forEach((track) => RTCPC.addTrack(track, localStream))

    RTCPC.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0]
    }

    RTCPC.onicecandidate = (event) => {
      if (event.candidate && ws.current) {
        ws.current.send(
          JSON.stringify({
            type: "candidate",
            candidate: event.candidate
          })
        )
      }
    }

    pc.current = RTCPC
  }

  const setWebRTC = async () => {
    const localStream = await getUserMedia()
    if (!localStream) return

    setPeerConnection(localStream)

    localVideo.current.srcObject = localStream

    ws.current = new WebSocket("ws://localhost:7777")

    ws.current.onmessage = async (message) => {
      const data = JSON.parse(message.data)

      switch (data.type) {
        case "join":
          setClientId(data.id)
          break
        case "offer":
          setRemoteClientId(data.from)
          await pc.current.setRemoteDescription(data.offer)
          const answer = await pc.current.createAnswer()
          await pc.current.setLocalDescription(answer)

          ws.current.send(
            JSON.stringify({ type: "answer", to: data.from, answer })
          )
          break
        case "answer":
          await pc.current.setRemoteDescription(data.answer)
          break
        case "candidate":
          await pc.current.addIceCandidate(data.candidate)
          break
      }
    }

    ws.current.onopen = async () => {
      const offer = await pc.current.createOffer()
      await pc.current.setLocalDescription(offer)

      ws.current.send(JSON.stringify({ type: "offer", offer }))
    }
  }

  const startMeeting = async () => {
    if (!inputEl.current.value) {
      window.alert("Enter Client ID")
      return
    }

    if (ws.current) {
      const offer = await pc.current.createOffer()
      await pc.current.setLocalDescription(offer)

      ws.current.send(
        JSON.stringify({ type: "offer", to: inputEl.current.value, offer })
      )
      setRemoteClientId(inputEl.current.value)
    }
  }

  useEffect(() => {
    setWebRTC()

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [])

  return (
    <div>
      <h1>WebRTC Meeting</h1>
      <input ref={inputEl} type="text" placeholder="Enter Client ID" />
      <button onClick={startMeeting}>Start Meeting</button>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        `}
      >
        <div>
          <p>Client ID: {clinetId}</p>
          <video ref={localVideo} autoPlay muted playsInline />
        </div>
        <div>
          <p>Remote Client ID: {remoteClientId}</p>
          <video ref={remoteVideo} autoPlay muted playsInline />
        </div>
      </div>
    </div>
  )
}
