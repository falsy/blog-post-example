import { forwardRef, useRef } from "react"

const ChildRef = forwardRef(function ChildRef(_, ref) {
  return <input ref={ref} />
})

export default function ParentRef() {
  const TestRef = useRef(null)

  return (
    <div>
      <ChildRef ref={TestRef} />
      <button onClick={() => TestRef.current.focus()}>Focus</button>
    </div>
  )
}
