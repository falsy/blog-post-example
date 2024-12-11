import { useAtom } from "../libs/zutai"
import { stepAtom } from "../atoms/stepAtom"
import ChildZotai from "./ChildZotai"

export default function Zotai() {
  const [step, setStep] = useAtom(stepAtom)

  return (
    <div>
      <h2>Zotai</h2>
      <p>Step: {step}</p>
      <div>
        <ChildZotai />
      </div>
      <div>
        <button onClick={() => setStep((prev) => prev + 1)}>Increment</button>
      </div>
    </div>
  )
}
