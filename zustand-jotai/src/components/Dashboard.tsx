import Justand from "./Justand"
import Zotai from "./Zotai"

export default function Dashboard() {
  return (
    <div
      style={{
        margin: "0 auto",
        width: "600px",
        textAlign: "center"
      }}
    >
      <h1>Zustand / Jotai</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <Justand />
        <Zotai />
      </div>
    </div>
  )
}
