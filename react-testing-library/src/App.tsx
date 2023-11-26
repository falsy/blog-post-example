import React, { useState } from 'react'

export default () => {

  const [display, setDisplay] = useState(false)

  const handleClickDisplay = () => {
    setDisplay(!display)
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