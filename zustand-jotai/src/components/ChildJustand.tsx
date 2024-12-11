import { useCounter } from "../hooks/useCounter"

export default function ChildJustand() {
  const [count] = useCounter()

  return (
    <>
      <p>[ChildComp]</p>
      <p>Count: {count}</p>
    </>
  )
}
