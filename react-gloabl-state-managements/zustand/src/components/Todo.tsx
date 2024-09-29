import useTodo from "../hooks/useTodo"

export default function Todo() {
  const { list, todoAdded, todoToggled } = useTodo()

  const addTodo = () => {
    todoAdded()
  }

  const toggleTodo = (id: number) => {
    todoToggled(id)
  }

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {list.map((todo: any) => (
        <div key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text} {todo.completed.toString()}
        </div>
      ))}
    </div>
  )
}
