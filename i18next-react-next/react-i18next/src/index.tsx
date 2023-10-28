import React from 'react'
import ReactDOM from 'react-dom/client'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container as HTMLElement)

import './locales/i18n'
import { useTranslation } from 'react-i18next'

const App = () => {
  const { i18n, t } = useTranslation()

  const handleClickChangeLng = () => {
    i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko')
  }

  return (
    <>
      <div>{t('안녕하세요')}</div>
      <p onClick={handleClickChangeLng}>언어변경</p>
    </>
  )
}

root.render(
  <App />
)