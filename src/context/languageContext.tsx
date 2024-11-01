import { i18n } from '@/i18n'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LanguageContext = createContext({
  language: 'en',
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars, prettier/prettier
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
      navigate(`/${lang}/${currentPath}`, { replace: true })
    },
    [location.pathname, navigate]
  )

  useEffect(() => {
    const currentLangFromURL = (location.pathname.split('/')[1] || localStorage.getItem('appLanguage')) ?? 'en'
    if (currentLangFromURL !== language) {
      OnChangeLanguage(currentLangFromURL)
    }
  }, [location.pathname, OnChangeLanguage, language])

  useEffect(() => {
    if (location.pathname === '/') {
      const storedLanguage = localStorage.getItem('appLanguage') ?? 'en'
      navigate(`/${storedLanguage}`, { replace: true })
    }
  }, [location.pathname, navigate])

  const contextValue = React.useMemo(() => ({ language, OnChangeLanguage }), [OnChangeLanguage, language])

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}
