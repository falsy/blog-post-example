import { useDispatch, useSelector } from "react-redux"
import { todoAdded, todoToggled } from "../reducers/todos"

export default function Todo() {
  const todos = useSelector((state: any) => state.todos)
  const dispatch = useDispatch()

  const addTodo = () => {
    dispatch(todoAdded({ id: todos.length + 1, text: "New Todo" }))
  }

  const toggleTodo = (id: number) => {
    dispatch(todoToggled(id))
  }

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo: any) => (
        <div key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text} {todo.completed.toString()}
        </div>
      ))}
    </div>
  )
}
