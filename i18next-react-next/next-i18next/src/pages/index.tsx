import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from 'next-i18next'

export default function Home() {
  const { i18n, t } = useTranslation('common')

  const handleClickChangeLng = () => {
    const newlng = i18n.language === 'ko' ? '/en' : ''
    const { protocol, host, pathname } = window.location
    const newPath = pathname.replace(/^\/en(\/|$)/g, '/')
    window.location.href = protocol + '//' + host + newlng + newPath
  }

  return (
    <>
      <div>{t('안녕하세요')}</div>
      <p onClick={handleClickChangeLng}>언어변경2</p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale  }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale as string,
        ['common']
      ))
    }
  }
}