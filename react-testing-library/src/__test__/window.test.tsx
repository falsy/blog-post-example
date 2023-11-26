/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const App = () => {
  return (
    <p>{window.innerHeight}</p>
  )
}

test('window의 높이 값을 구할 수 있다.', async () => {
  window = Object.create(window)
  Object.defineProperty(window, 'innerHeight', {
    value: 200,
    writable: true
  })

  render(
    <App />
  )

  expect(screen.getByText('200')).toBeInTheDocument()
})