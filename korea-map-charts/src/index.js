import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import KoreaMap from './components/KoreaMap'

const App = () => {
  return (
    <>
      <KoreaMap />
    </>
  )
}

const container = document.getElementById('app')
const root = ReactDOMClient.createRoot(container)

root.render(<App />)