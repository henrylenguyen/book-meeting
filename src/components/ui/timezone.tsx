/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { formatTimezone, systemTimezone } from '@/lib/utils'
import moment from 'moment-timezone'

interface TimezoneDropdownProps {
  onChange: (value: string) => void
}

const TimezoneDropdown: React.FC<TimezoneDropdownProps> = ({ onChange }) => {
  const timezones = moment.tz.names()

  const { itemsData } = useInfiniteScroll({
    items: timezones,
    itemsPerPage: 15,
    query: document.querySelector('.timezone-content [data-radix-select-viewport]')
  })

  const handleOnChange = (value: string) => {
    onChange(formatTimezone(value))
  }
  return (
    <Select onValueChange={handleOnChange}>
      <SelectTrigger className='w-[200px] border-0 border-b rounded-none border-solid'>
        <SelectValue placeholder={systemTimezone ?? 'Time Zone'} />
      </SelectTrigger>
      <SelectContent className='timezone-content'>
        {itemsData.map((tz: any) => (
          <SelectItem key={tz} value={tz}>
            {formatTimezone(tz)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TimezoneDropdown
