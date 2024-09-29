import { useTodoState } from "../hooks/useTodo"

export default function Todo() {
  const [todos, setTodos] = useTodoState()

  const addTodo = () => {
    setTodos((currVal) => {
      return [
        ...currVal,
        { id: todos.length + 1, text: "New Todo", completed: false },
      ]
    })
  }

  const toggleTodo = (id: number) => {
    setTodos((currVal) => {
      return currVal.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    })
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
