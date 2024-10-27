import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/datePicker'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

interface EventLoopProps {
  value?: {
    startDate: Date | undefined
    endDate: Date | undefined
    repeatEvery: number
    repeatUnit: string
  }
  onChange: (value: {
    startDate: Date | undefined
    endDate: Date | undefined
    repeatEvery: number
    repeatUnit: string
  }) => void
}

export const EventLoop = ({ value, onChange }: EventLoopProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(value?.repeatUnit || 'Does not repeat')
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState<boolean>(false)

  const recurrenceOptions = [
    'Does not repeat',
    'Every weekday (Mon - Fri)',
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly',
    'Custom'
  ]

  const handleSaveRecurrence = () => {
    setIsCustomDialogOpen(false)
    onChange({
      ...value,
      repeatEvery: value.repeatEvery,
      repeatUnit: selectedOption
    })
  }

  return (
    <div>
      <Select
        value={selectedOption}
        onValueChange={(newValue) => {
          setSelectedOption(newValue)
          if (newValue === 'Custom') {
            setIsCustomDialogOpen(true)
          } else {
            onChange({ ...value, repeatUnit: newValue, repeatEvery: 1 })
          }
        }}
      >
        <SelectTrigger className='w-[200px]'>
          <SelectValue placeholder={selectedOption} />
        </SelectTrigger>
        <SelectContent>
          {recurrenceOptions.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Custom Dialog */}
      <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Set Recurrence</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSaveRecurrence()
            }}
          >
            {/* Start Date */}
            <div className='mb-4'>
              <span className='block text-sm font-medium text-gray-700'>Start</span>
              <DatePicker
                value={value?.startDate ?? new Date()}
                onChange={(date) => onChange({ ...value, startDate: date })}
              />
            </div>

            {/* Repeat Every */}
            <div className='mb-4 flex items-center space-x-2'>
              <span className='block text-sm font-medium text-gray-700'>Repeat every</span>
              <Input
                type='number'
                value={value?.repeatEvery ?? 1}
                onChange={(e) => onChange({ ...value, repeatEvery: parseInt(e.target.value, 10) })}
                className='w-16'
              />
              <Select
                value={value?.repeatUnit ?? 'Day'}
                onValueChange={(unit) => onChange({ ...value, repeatUnit: unit })}
              >
                <SelectTrigger className='w-[120px]'>
                  <SelectValue placeholder={value?.repeatUnit ?? 'Day'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Day'>Day</SelectItem>
                  <SelectItem value='Week'>Week</SelectItem>
                  <SelectItem value='Month'>Month</SelectItem>
                  <SelectItem value='Year'>Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* End Date */}
            <div className='mb-4'>
              <span className='block text-sm font-medium text-gray-700'>End</span>
              <DatePicker
                value={value?.endDate ?? new Date()}
                onChange={(date) => onChange({ ...value, endDate: date })}
              />
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => setIsCustomDialogOpen(false)}>
                Cancel
              </Button>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EventLoop
