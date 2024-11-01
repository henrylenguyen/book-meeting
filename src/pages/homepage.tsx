import CalenadarContainer from '@/components/layouts/calendar/calendarContainer'
import React from 'react'

interface IHomePageProps { }

const HomePage: React.FunctionComponent<IHomePageProps> = React.memo(() => {
  return <CalenadarContainer />
})

export default HomePage
