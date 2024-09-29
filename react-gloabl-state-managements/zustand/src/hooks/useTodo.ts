import { create } from "zustand"

interface ITodo {
  id: number
  text: string
  completed: boolean
}

type Todos = {
  list: ITodo[]
  todoAdded: () => void
  todoToggled: (id: number) => void
}

const useStore = create<Todos>()((set) => ({
  list: [],
  todoAdded: () =>
    set((Todos) => ({
      list: [
        ...Todos.list,
        { id: Todos.list.length + 1, text: "New Todo", completed: false },
      ],
    })),
  todoToggled: (id: number) =>
    set((Todos) => ({
      list: Todos.list.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}))

export default useStore
