import ActionState from "./components/ActionState"
import ActionStateForm from "./components/ActionStateForm"
import React18 from "./components/React18"
import React19 from "./components/React19"
import FormStatus from "./components/FormStatus"
import Optimistic from "./components/Optimistic"
import UseHook from "./components/UseHook"
import ConditionUseHook from "./components/ConditionUseHook"

export default function App() {
  return (
    <div>
      <section>
        <h2>React 18</h2>
        <React18 />
      </section>
      <section>
        <h2>React 19</h2>
        <React19 />
      </section>
      <section>
        <h2>useActionState</h2>
        <ActionState />
      </section>
      <section>
        <h2>useActionState - form</h2>
        <ActionStateForm />
      </section>
      <section>
        <h2>useFormStatus</h2>
        <FormStatus />
      </section>
      <section>
        <h2>Optimistic</h2>
        <Optimistic />
      </section>
      <section>
        <h2>use</h2>
        <UseHook />
      </section>
      <section>
        <h2>conditionally use</h2>
        <ConditionUseHook />
      </section>
    </div>
  )
}
