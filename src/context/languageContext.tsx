import { i18n } from '@/i18n'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LanguageContext = createContext({
  language: 'en',
  // eslint-disable-next-line prettier/prettier, unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  OnChangeLanguage: (_lang: string) => { }
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(localStorage.getItem('appLanguage') || 'en')
  const location = useLocation()
  const navigate = useNavigate()

  const OnChangeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang)
      setLanguage(lang)
      localStorage.setItem('appLanguage', lang)

      const currentPath = location.pathname.split('/').slice(2).join('/') || ''
      if (currentPath) {
        navigate(`/${lang}/${currentPath}`, { replace: true })
      } else {
        navigate(`/${lang}`, { replace: true })
      }
    },
    [location.pathname, navigate]
  )

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const urlLang = searchParams.get('lang')

    if (urlLang) {
      OnChangeLanguage(urlLang)
    } else {
      const savedLanguage = localStorage.getItem('appLanguage') ?? 'en'
      OnChangeLanguage(savedLanguage)
    }
  }, [location.search, OnChangeLanguage])

  const contextValue = React.useMemo(() => ({ language, OnChangeLanguage }), [OnChangeLanguage, language])

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}
