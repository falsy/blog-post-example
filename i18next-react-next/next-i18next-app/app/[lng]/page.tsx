'use client'

import { fallbackLng, languages } from '../i18n/settings'
import { useTranslation } from '../i18n'

export default async function Page({ 
  params: { 
    lng 
  } 
}: { 
  params: { 
    lng: string 
  }
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const { t } = await useTranslation(lng)

  const handleClickChangeLng = () => {
    const newlng = lng === 'ko' ? '/en' : '/ko'
    const { protocol, host, pathname } = window.location
    const newPath = pathname.replace(/^\/en|ko(\/|$)/g, '/')
    window.location.href = protocol + '//' + host + newlng + newPath
  }

  return (
    <>
      <p>{t('안녕하세요')}</p>
      <p onClick={handleClickChangeLng}>언어변경</p>
    </>
  )
}

