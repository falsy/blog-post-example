import { createContext } from "react"

const NewContext = createContext()

export default function ProviderComp({ children }) {
  return <NewContext value={{ name: "Provider" }}>{children}</NewContext>
}
