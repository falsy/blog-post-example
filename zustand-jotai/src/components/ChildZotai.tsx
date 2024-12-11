import { stepAtom } from "../atoms/stepAtom"
import { useAtom } from "../libs/zutai"

export default function ChildZotai() {
  const [step] = useAtom(stepAtom)

  return (
    <>
      <p>[ChildComp]</p>
      <p>Step: {step}</p>
    </>
  )
}
