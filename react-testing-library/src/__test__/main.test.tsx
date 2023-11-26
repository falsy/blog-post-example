/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'

test('App에서 hello를 클릭하면 world의 출력을 토글할 수 있다.', async () => {

  render(
    <App />
  )

  const user = userEvent.setup()

  expect(screen.getByText('hello')).toBeInTheDocument()
  expect(document.getElementsByClassName('text').length).toBe(0)

  await user.click(screen.getByText('hello'))
  expect(document.getElementsByClassName('text').length).toBe(1)
})