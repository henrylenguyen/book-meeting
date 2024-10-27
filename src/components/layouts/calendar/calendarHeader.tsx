import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/ui/languageSwitcher'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLanguage } from '@/context/languageContext'
import { mapViewName } from '@/lib/utils'
import FullCalendar from '@fullcalendar/react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import moment, { Moment } from 'moment-timezone'
import React, { RefObject, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type CalendarHeaderProps = {
  calendarRef: RefObject<FullCalendar>
}

const views = [
  { label: 'day', view: 'timeGridDay' },
  { label: 'week', view: 'timeGridWeek' },
  { label: 'month', view: 'dayGridMonth' },
  { label: 'year', view: 'multiMonthYear' }
]

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ calendarRef }) => {
  const [currentView, setCurrentView] = useState<string>('month')
  const [date, setDate] = useState<Moment | null>(moment(calendarRef.current?.getApi().getDate()))

  const { language } = useLanguage()
  const { t } = useTranslation()

  // Get current view name
  useEffect(() => {
    const calApi = calendarRef.current?.getApi()
    if (calApi) {
      setCurrentView(mapViewName(calApi.view.type))
    }
  }, [calendarRef])

  const renderDate = useCallback((): string => {
    if (language === 'vi') {
      return date?.format('[Tháng] M [Năm] YYYY') ?? ''
    } else {
      return date?.format('MMMM YYYY') ?? ''
    }
  }, [date, language])

  const handleViewChange = (viewName: string) => {
    const calApi = calendarRef.current?.getApi()
    if (calApi) {
      calApi.changeView(viewName)
      setCurrentView(mapViewName(viewName))
    }
  }

  const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
    const calApi = calendarRef.current?.getApi()

    if (calApi) {
      if (direction === 'prev') {
        calApi.prev()
      } else if (direction === 'next') {
        calApi.next()
      } else {
        calApi.today()
      }
    }
    if (calApi) {
      setDate(moment(calApi.getDate()))
    }
  }

  return (
    <header className='calendar-header '>
      <div className='flex items-center justify-between'>
        <div className='flex gap-4 items-center'>
          <Button
            className='border border-blue-light hover:bg-blue-dark  border-solid bg-transparent min-w-[70px] h-[30px] rounded-[10px] text-blue-dark hover:text-white capitalize'
            onClick={(): void => handleDateChange('today')}
          >
            <span>{t('today')}</span>
          </Button>
          <div className='flex gap-5'>
            <button onClick={(): void => handleDateChange('prev')}>
              <ChevronLeft className='w-6 h-6 text-blue-dark' />
            </button>
            <button onClick={(): void => handleDateChange('next')}>
              <ChevronRight className='w-6 h-6 text-blue-dark' />
            </button>
          </div>
          <span className='text-blue-dark font-extrabold text-[20px] capitalize'>{renderDate()}</span>
        </div>
        <div className='flex gap-4 items-center'>
          <Popover>
            <PopoverTrigger asChild>
              <Button className='bg-blue-dark hover:bg-transparent border border-solid hover:border-blue-dark hover:text-blue-dark text-white w-[100px] h-[30px] capitalize'>
                <span>{t(currentView)}</span>
                <ChevronDown className='w-4 h-4 ' />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='flex flex-col'>
                {views.map(({ label, view }) => (
                  <Button key={view} variant={'outline'} className='capitalize ' onClick={() => handleViewChange(view)}>
                    {t(label)}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

export default CalendarHeader
