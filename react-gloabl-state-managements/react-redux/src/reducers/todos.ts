import { createSlice } from "@reduxjs/toolkit"

interface ITodo {
  id: number
  text: string
  completed: boolean
}

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as ITodo[],
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      })
    },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { todoAdded, todoToggled } = todosSlice.actions
export default todosSlice.reducer
