/**
 * @jest-environment jsdom
 */
import React, { TouchEvent, useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const App = () => {
  const [touchStatus, setTouchStatus] = useState('')

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touchY = e.touches[0].clientY
    setTouchStatus(`start clientY: ${touchY}`)
  }

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY
    setTouchStatus(`move clientY: ${touchY}`)
  }

  const handleTouchEnd = () => {
    setTouchStatus('end')
  }

  return (
    <div 
      className='event-area' 
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e) => handleTouchMove(e)}
      onTouchEnd={handleTouchEnd}
    >
      hello world
      <p>{touchStatus}</p>
    </div>
  )
}

test('터치 이벤트 상태의 변화에 따른 값을 테스트 할 수 있다.', async () => {
  render(
    <App />
  )

  const eventArea = document.querySelector('.event-area')

  fireEvent.touchStart(eventArea, { touches: [{ clientY: 100 }] })
  expect(screen.getByText('start clientY: 100')).toBeInTheDocument()

  fireEvent.touchMove(eventArea, { touches: [{ clientY: 50 }] })
  expect(screen.getByText('move clientY: 50')).toBeInTheDocument()
  
  fireEvent.touchEnd(eventArea)
  expect(screen.getByText('end')).toBeInTheDocument()
})