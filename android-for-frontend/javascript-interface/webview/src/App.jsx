import React from "react"

const App = () => {
  
  const handleClickToast = () => {
    if(window.Android) {
      window.Android.showToast('show toast')
    }
  }

  return (
    <>
      <button onClick={handleClickToast}>Show Toast</button>
    </>
  )
}

export default App