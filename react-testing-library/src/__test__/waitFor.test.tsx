/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

const App = () => {
  const [display, setDisplay] = useState(false)

  const handleClickDisplay = () => {
    setTimeout(() => {
      setDisplay(!display)
    }, 500)
  }

  return (
    <>
      <p className='toggle' onClick={handleClickDisplay}>
        hello
      </p>
      {display && (
        <p className='text'>
          world
        </p>
      )}
    </>
  )
}

test('App에서 hello를 클릭하면 world의 출력을 토글할 수 있다.', async () => {
  render(
    <App />
  )

  const user = userEvent.setup()

  expect(screen.getByText('hello')).toBeInTheDocument()
  expect(document.getElementsByClassName('text').length).toBe(0)

  await user.click(screen.getByText('hello'))
  await waitFor(() => expect(document.getElementsByClassName('text').length).toBe(1))
})