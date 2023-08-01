import React from "react"

const App = () => {

  const handleClickNewWebview = () => {
    if(window.Android) {
      window.Android.newWebView('https://falsy.me/')
    }
  }

  return (
    <p 
      onClick={handleClickNewWebview} 
      style={{
        display: 'inline-block', 
        border: '1px solid #bbb', 
        padding: '8px 14px',
        borderRadius: '5px',
        fontSize: '14px',
        background: '#f5f5f5'
      }}>Open FalsyLab Website</p>
  )
}

export default App