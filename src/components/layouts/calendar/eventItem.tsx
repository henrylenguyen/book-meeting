import { CameraIcon } from '@/assets/icons' // Assuming you have an icon like this
import React from 'react'
import { useTranslation } from 'react-i18next'

interface EventItemsProps {
  title: string
  time: string
  url: string
  isAppointment: boolean
  color: string
}

const EventItems: React.FC<EventItemsProps> = ({ title, time, url, isAppointment, color }) => {
  const { t } = useTranslation()
  return (
    <div
      className={`flex items-center px-4 py-6 rounded-lg border-l-[6px] border-blue-dark border`}
      style={{
        backgroundColor: color
      }}
    >
      <div className='flex-grow flex flex-col gap-3'>
        <h3 className='font-bold text-blue-dark '>{title}</h3>
        <p className='text-sm text-blue-light mix-blend-difference'>{time}</p>
        {isAppointment ? (
          <a href={url} target='_blank' className=' underline text-[13px] text-blue-light mix-blend-difference'>
            {t('meet-now')}
          </a>
        ) : (
          <a href={url} target='_blank' className=' underline text-[13px] text-blue-light mix-blend-difference'>
            {t('view-details')}
          </a>
        )}
      </div>
      {isAppointment && (
        <div className='bg-blue-dark mix-blend-multiply rounded-full size-[40px] flex items-center justify-center'>
          <CameraIcon className='w-6 h-6 text-white' />
        </div>
      )}
    </div>
  )
}

export default EventItems
