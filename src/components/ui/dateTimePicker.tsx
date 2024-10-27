import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import TimePicker from '@/components/ui/timePicker'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const DateTimePicker = ({ name , isAllDay }: { name: string, isAllDay?: boolean }) => {
  const { control } = useFormContext()
  const [allDay, setAllDay] = useState(false)

  return (
    <div className='flex items-center space-x-4'>
      {/* Start Date */}
      <Controller
        name={`${name}.startDate`}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-[150px] h-[40px]  justify-start text-left font-normal flex gap-2 border border-solid bg-transparent hover:bg-transparent '
              >
                {field.value ? format(new Date(field.value), 'MM/dd/yyyy') : 'Pick Start Date'}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar selected={new Date(field.value)} onSelect={field.onChange} />
            </PopoverContent>
          </Popover>
        )}
      />

      {/* Time Pickers or Duration based on All Day */}
      {!allDay ? (
        <>
          <Controller name={`${name}.startTime`} control={control} render={({ field }) => <TimePicker {...field} />} />

          <span className='mx-2'>→</span>

          <Controller
            name={`${name}.endDate`}
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-[150px] h-[40px]  justify-start text-left font-normal flex gap-2 border border-solid bg-transparent hover:bg-transparent'
                  >
                    {field.value ? format(new Date(field.value), 'MM/dd/yyyy') : 'Pick End Date'}
                    <CalendarIcon  />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar selected={new Date(field.value)} onSelect={field.onChange} />
                </PopoverContent>
              </Popover>
            )}
          />

          <Controller name={`${name}.endTime`} control={control} render={({ field }) => <TimePicker {...field} />} />
        </>
      ) : (
        <>
          <span className='mx-2'>→</span>

          <Controller
            name={`${name}.endDate`}
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-[150px] h-[40px]  justify-start text-left font-normal flex gap-2 border border-solid bg-transparent hover:bg-transparent '
                  >
                    {field.value ? format(new Date(field.value), 'MM/dd/yyyy') : 'Pick End Date'}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar selected={new Date(field.value)} onSelect={field.onChange} />
                </PopoverContent>
              </Popover>
            )}
          />
          <span>1d</span>
        </>
      )}

      {/* All Day Toggle */}
      {isAllDay &&   <div className='flex items-center space-x-2'>
        <Switch checked={allDay} onCheckedChange={setAllDay} />
        <span>All Day</span>
      </div>}
    
    </div>
  )
}

export default DateTimePicker
