import Justand from "../libs/justand"

type CountState = {
  count: number
}

const store = new Justand<CountState>({ count: 0 })

export const useCounter = () => {
  const count: number = store.useStore((state) => state.count)
  const setCount = (newCount: number | ((state: number) => number)) => {
    const newState =
      typeof newCount === "function"
        ? (newCount as (state: number) => number)(count)
        : newCount
    return store.setState({ count: newState })
  }

  return [count, setCount] as const
}
