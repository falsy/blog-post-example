import { useSyncExternalStore } from "react"

type Listener<T> = (value: T) => void

class Atom<T> {
  private value: T
  private listeners = new Set<Listener<T>>()

  constructor(initialValue: T) {
    this.value = initialValue
  }

  get() {
    return this.value
  }

  set(newValue: T | ((prev: T) => T)) {
    this.value =
      typeof newValue === "function"
        ? (newValue as (prev: T) => T)(this.value)
        : newValue
    this.listeners.forEach((listener) => listener(this.value))
  }

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }
}

export const atom = <T>(initialValue: T) => new Atom<T>(initialValue)

export const useAtom = <T>(
  atom: Atom<T>
): [T, (value: T | ((prev: T) => T)) => void] => {
  const value = useSyncExternalStore(
    (listener) => atom.subscribe(listener),
    () => atom.get()
  )
  const setValue = (newValue: T | ((prev: T) => T)) => atom.set(newValue)

  return [value, setValue]
}
