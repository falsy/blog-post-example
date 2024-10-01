import { lazy, Suspense, useState } from "react"
import Portal from "./Portal"

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
    </div>
  )
}
