import { useSyncExternalStore } from "react"

type Listener<T> = (state: T) => void

export default class Justand<T> {
  private state: T
  private listeners = new Set<Listener<T>>()

  private getState() {
    return this.state
  }

  private subscribe(listener: Listener<T>) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  constructor(initialState: T) {
    this.state = initialState
  }

  setState(updater: T | ((state: T) => T)) {
    this.state =
      typeof updater === "function"
        ? (updater as (state: T) => T)(this.state)
        : updater
    this.listeners.forEach((listener) => listener(this.state))
  }

  useStore<U>(selector: (state: T) => U): U {
    return useSyncExternalStore(
      (listener) => this.subscribe(listener),
      () => selector(this.getState())
    )
  }
}
