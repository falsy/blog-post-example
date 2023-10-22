import { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom/client'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container)

const App = () => {
  const [historyIndex, setHistoryIndex] = useState(0)
  const [direction, setDirection] = useState('None')

  useEffect(() => {
    const index = window.history.state?.index
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
      return History.prototype.pushState.apply(
        window.history, 
        [{ ...state, index }, ...arg]
      )
    }
    window.history.replaceState = (state, ...arg) => {
      return History.prototype.replaceState.apply(
        window.history, 
        [{ ...state, index: historyIndex }, ...arg]
      )
    }
    window.addEventListener('popstate', onPopstate)
    return () => {
      window.removeEventListener('popstate', onPopstate)
    }
  }, [historyIndex])

  const onPopstate = useCallback(() => {
    const { state } = window.history
    if (!state) window.history.replaceState({ index: historyIndex + 1 }, '')

    const index = state ? state.index : historyIndex + 1
    setHistoryIndex(index)
    setDirection(index > historyIndex ? 'forward' : 'back')
  }, [historyIndex])

  return (
    <div>
      <h1>Direction: {direction}</h1>
      <ul>
        <li onClick={() => window.history.pushState({}, '', '#1')}>#1</li>
        <li onClick={() => window.history.pushState({}, '', '#2')}>#2</li>
        <li onClick={() => window.history.pushState({}, '', '#3')}>#3</li>
      </ul>
    </div>
  )
}

root.render(
  <App />
)