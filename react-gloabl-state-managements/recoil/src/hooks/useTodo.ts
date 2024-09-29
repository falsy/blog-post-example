import { atom, useRecoilState } from "recoil"

interface ITodo {
  id: number
  text: string
  completed: boolean
}

const todoState = atom({
  key: "todoState",
  default: [] as ITodo[],
})

export const useTodoState = () => {
  return useRecoilState(todoState)
}
