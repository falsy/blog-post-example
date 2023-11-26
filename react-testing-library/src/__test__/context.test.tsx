/**
 * @jest-environment jsdom
 */
import React, { useContext, useState } from 'react'
import { act, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'

const AppContext = React.createContext(null)

const AppProvider = ({ children }) => {
  const [isBoolean, setBoolean] = useState(false)

  return (
    <AppContext.Provider value={{ isBoolean, setBoolean }}>{children}</AppContext.Provider>
  )
}

const useAppHook = () => {
  const { isBoolean, setBoolean } = useContext(AppContext)

  return { isBoolean, setBoolean }
}

test('useAppHook 을 사용하여 isBoolean 값을 토글할 수 있다.', async () => {
  const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>
  const { result } = renderHook(() => useAppHook(), { wrapper })
  
  expect(result.current.isBoolean).toBe(false)

  act(() => {
    result.current.setBoolean(true)
  })

  expect(result.current.isBoolean).toBe(true)
})