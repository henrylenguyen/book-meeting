import { ITimeOption } from '@/types/timePicker'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const mapViewName = (viewName: string): string => {
  switch (viewName) {
    case 'timeGridDay':
      return 'day'
    case 'timeGridWeek':
      return 'week'
    case 'dayGridMonth':
      return 'month'
    case 'multiMonthYear':
      return 'year'
    default:
      return 'month'
  }
}

export function getFirstAndLastChar(str: string): string {
  const words = str.split(' ')
  if (words.length === 0) return ''
  const firstChar = words[0].charAt(0)
  const lastChar = words[words.length - 1].charAt(0)
  return firstChar + lastChar
}

export const formatCurrentTime = (): string => {
  const currentDate = new Date()
  let hours = currentDate.getHours()
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12 // Convert to 12-hour format

  return `${hours}:${minutes} ${period}`
}

// Function to generate time options
export const generateTimeOptions = (interval: number): ITimeOption[] => {
  const options: ITimeOption[] = []
  const startTime = new Date()
  startTime.setHours(0, 0, 0, 0)

  for (let i = 0; i < 24 * 60; i += interval) {
    const time = new Date(startTime.getTime() + i * 60000)
    const hour = time.getHours() % 12 || 12 // Convert to 12-hour format
    const minute = time.getMinutes().toString().padStart(2, '0')
    const period = time.getHours() < 12 ? 'AM' : 'PM'

    options.push({ hour: hour.toString().padStart(2, '0'), minute, period: period as 'AM' | 'PM' })
  }

  return options
}
