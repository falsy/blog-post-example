import { lazy, Suspense, useState } from "react"
import Portal from "./Portal"
import Batching from "./Batching"
import Batching2 from "./Batching2"
import Transition from "./Transition"
import TransitionState from "./TransitionState"

const LazyComponent = lazy(() => import("./LazyComponent"))

export default function App() {
  const [load, setLoad] = useState(false)

  return (
    <div>
      <h1>Basic React</h1>
      <section>
        <h2>Portal</h2>
        <Portal />
      </section>
      <section>
        <h2>Lazy</h2>
        <button onClick={() => setLoad(true)}>Load</button>
        {load && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
          </Suspense>
        )}
      </section>
      <section>
        <h2>Batching</h2>
        <Batching />
        <Batching2 />
      </section>
      <section>
        <h2>Transition</h2>
        <Transition />
        <TransitionState />
      </section>
    </div>
  )
}
