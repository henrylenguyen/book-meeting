import { ArrowDownIcon } from '@/assets/icons'
import IconClock from '@/assets/icons/clock'
import { formatCurrentTime, generateTimeOptions } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
  interval?: number
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, interval = 15 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [times] = useState(generateTimeOptions(interval))

  const initialValue = value || formatCurrentTime()
  const timepickerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLSpanElement>(null)
  const selectedOptionRef = useRef<HTMLButtonElement | null>(null)

  const toggleTimepickerVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleTimeSelection = (hour: string, minute: string, period: 'AM' | 'PM') => {
    const selectedTime = `${hour}:${minute} ${period}`
    onChange(selectedTime)
    setIsVisible(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timepickerRef.current &&
        !timepickerRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll to the selected option when dropdown becomes visible
  useEffect(() => {
    if (isVisible && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({ block: 'center' })
    }
  }, [isVisible])

  return (
    <div className='relative'>
      <div className='relative flex items-center'>
        <span className='absolute left-0 pl-5'>
          <IconClock />
        </span>
        <input
          type='text'
          readOnly
          value={initialValue}
          onClick={toggleTimepickerVisibility}
          className='rounded-none w-[180px]  h-[40px] border-b border-input border-0 bg-transparent  py-2.5 pl-[50px] pr-8  outline-none transition '
          placeholder='Select a time'
        />
        <span className='absolute right-0 cursor-pointer pr-4 ' ref={toggleRef}>
          <ArrowDownIcon />
        </span>
      </div>

      {isVisible && (
        <div
          ref={timepickerRef}
          className='absolute right-0 mt-2 h-[262px] w-full overflow-hidden overflow-y-auto rounded-md border border-stroke bg-white p-2  dark:bg-dark-2 z-[9999]'
        >
          {times.map((time, index) => {
            const timeString = `${time.hour}:${time.minute} ${time.period}`
            const isSelected = timeString === initialValue

            return (
              <button
                key={index}
                ref={isSelected ? selectedOptionRef : null} // Set ref only for the selected option
                className={`time-option w-full flex cursor-pointer justify-between items-center gap-1  rounded-md transition  ${isSelected ? 'selected-time' : ''}`}
                onClick={() => handleTimeSelection(time.hour, time.minute, time.period)}
              >
                <div
                  className={`hour flex h-[46px] w-full max-w-[46px]  items-center justify-center rounded-md text-sm font-medium ${isSelected ? 'bg-blue-dark text-white' : ''}`}
                >
                  {time.hour}
                </div>
                <div>:</div>
                <div
                  className={`minute flex h-[46px] w-full max-w-[46px] items-center justify-center rounded-md text-sm font-medium ${isSelected ? 'bg-blue-dark text-white' : ''}`}
                >
                  {time.minute}
                </div>
                <div
                  className={`period flex h-[46px] w-full max-w-[46px] items-center justify-center rounded-md text-sm font-medium ${isSelected ? 'bg-blue-dark text-white' : ''}`}
                >
                  {time.period}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TimePicker
