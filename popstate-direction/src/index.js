import { useRef, useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom/client'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container)

const App = () => {
  const pushState = useRef(window.history.pushState)
  const replaceState = useRef(window.history.replaceState)

  const [historyIndex, setHistoryIndex] = useState(0)
  const [direction, setDirection] = useState('None')

  useEffect(() => {
    const index = window.history?.state?.index
    if(index) {
      setHistoryIndex(index)
    } else {
      window.history.replaceState({ index: 0 }, '')
    }
  }, [])

  useEffect(() => {
    window.history.pushState = (state, ...arg) => {
      const index = historyIndex + 1
      setHistoryIndex(index)
      return pushState.current.apply(
        window.history, 
        [{...state, index }, ...arg]
      )
    }
    window.history.replaceState = (state, ...arg) => {
      return replaceState.current.apply(
        window.history, 
        [{...state, index: historyIndex }, ...arg]
      )
    }
    window.addEventListener('popstate', popState)
    return () => {
      window.removeEventListener('popstate', popState)
    }
  }, [historyIndex])

  const popState = useCallback(() => {
    const { state } = window.history
    if (!state) window.history.replaceState({ index: historyIndex + 1 }, '')

    const index = state ? state.index : historyIndex + 1
    setHistoryIndex(index)
    setDirection(index > historyIndex ? 'forward' : 'back')
  }, [historyIndex])

  const handleClickLink = useCallback((hash) => {
    window.history.pushState({}, '', hash)
  }, [])

  return (
    <div>
      <h1>Direction: {direction}</h1>
      <ul>
        <li onClick={() => handleClickLink('#1')}>#1</li>
        <li onClick={() => handleClickLink('#2')}>#2</li>
        <li onClick={() => handleClickLink('#3')}>#3</li>
      </ul>
    </div>
  )
}

root.render(
  <App />
)