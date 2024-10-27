import { EarthIcon } from '@/assets/icons'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useLanguage } from '@/context/languageContext'
import React from 'react'

const LanguageSwitcher: React.FC = () => {
  const { OnChangeLanguage, language } = useLanguage()

  const handleLanguageChange = (value: string) => {
    OnChangeLanguage(value)
  }

  return (
    <div>
      <Select onValueChange={handleLanguageChange} defaultValue={language}>
        <SelectTrigger className='w-fit outline-none focus:ring-0 ring-0'>
          <EarthIcon className='w-6 h-6 text-blue-dark' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='en'>English</SelectItem>
          <SelectItem value='vi'>Tiếng Việt</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default LanguageSwitcher
