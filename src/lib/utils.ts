/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITimeOption } from '@/types/timePicker'
import { clsx, type ClassValue } from 'clsx'
import { format, isValid, parseISO } from 'date-fns'
import moment from 'moment-timezone'
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

export const getEventTime: any = (selectedDateRange: { start: string; end: string } | null) => {
  // Hàm định dạng thời gian
  const formatTime = (date: Date) => {
    return format(date, 'hh:mm a') // Định dạng theo kiểu 12-hour: 12:31 AM
  }

  // Hàm định dạng ngày
  const formatDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd') // Định dạng ngày giống như new Date().toISOString().split('T')[0]
  }

  const parseDateTime = (dateTimeStr: string | number | string[] | Date) => {
    if (Array.isArray(dateTimeStr)) {
      throw new Error('Invalid dateTimeStr: cannot be an array')
    }

    const date = typeof dateTimeStr === 'string' ? parseISO(dateTimeStr) : new Date(dateTimeStr)
    if (!isValid(date)) {
      return {
        date: new Date(), // Trả về ngày hiện tại nếu không hợp lệ
        time: formatTime(new Date()) // Sử dụng hàm formatCurrentTime cho giá trị giờ hiện tại
      }
    }

    return {
      date,
      time: dateTimeStr.toString().includes('T') ? formatTime(date) : formatTime(new Date())
    }
  }

  const start = parseDateTime(selectedDateRange?.start || new Date())
  const end = parseDateTime(selectedDateRange?.end || new Date())

  return {
    startDate: formatDate(start.date), // Giữ ngày dưới dạng yyyy-MM-dd
    startTime: start.time,
    endDate: formatDate(end.date),
    endTime: end.time
  }
}

export const formatTimezone = (tz: string) => {
  const offset = moment.tz(tz).utcOffset() / 60
  const sign = offset >= 0 ? '+' : '-'
  return `${tz} (UTC ${sign}${Math.abs(offset)})`
}
export const systemTimezone = formatTimezone(moment.tz.guess())

export const generateJitsiURL = () => {
  const roomName = 'room-' + Math.random().toString(36).substring(2, 10) + Date.now()
  const jitsiURL = `https://meet.jit.si/${roomName}?config.prejoinPageEnabled=false&config.startWithAudioMuted=true`

  return jitsiURL
}

// Function to convert date and time to ISO format
export const formatDateTimeToIOS = (date: string, time: string, timezone: string) => {
  // Combine date and time strings
  const dateTimeString = `${date} ${time}`

  try {
    // Parse and format with timezone support
    const formattedDateTime = moment.tz(dateTimeString, timezone).format('YYYY-MM-DDTHH:mm:ssZ')
    return formattedDateTime
  } catch (error) {
    console.error('Error formatting date and time:', error)
    return null
  }
}
