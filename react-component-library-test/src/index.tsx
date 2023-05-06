import React from 'react'
import ReactDOM from 'react-dom/client'
import Test from 'react-component-library'

const App = () => (
  <div>
    <Test />
  </div>
)

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(<App />)