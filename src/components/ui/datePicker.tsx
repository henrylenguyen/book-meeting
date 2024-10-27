import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLanguage } from '@/context/languageContext'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import React from 'react'

interface DatePickerProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const { language } = useLanguage()
  const formatLanguage = language === 'en' ? 'MM/dd/yyyy' : 'dd/MM/yyyy'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
        >
          <CalendarIcon />
          {value ? format(value, formatLanguage) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
