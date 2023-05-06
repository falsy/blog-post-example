import React, { useEffect } from 'react'
import styles from './style.scss'

const TestApp = () => {

  useEffect(() => {
    console.log('didmount')
  }, [])
  
  return (
    <p className={styles['test']}>hello world</p>
  )
}

export default TestApp