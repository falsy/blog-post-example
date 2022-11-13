import React, { useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage, getToken } from 'firebase/messaging'

const Index = () => {

  const onMessageFCM = async () => {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return 

    const firebaseApp = initializeApp({
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: ''
    })

    const messaging = getMessaging(firebaseApp)

    getToken(messaging, { vapidKey: '' }).then((currentToken) => {
      if (currentToken) {
        console.log(currentToken)
      } else {
        console.log('No registration token available. Request permission to generate one.')
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
    })
  }

  useEffect(() => {
    onMessageFCM()
  }, [])

  return (
    <div>
      <h1>hello world</h1>
    </div>
  )
}

export default Index