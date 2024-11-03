/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import {
  FormColorPickerField,
  FormDateTimeField,
  FormInputField,
  FormLoopEventField,
  FormMultiSelectField,
  FormRichEditorField,
  FormSigleSelectField,
  FormTimeZoneField
} from '@/components/ui/formField'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { MOCK_DATA_USER } from '@/constants/mock-user'
import { useFetchOnlineEvents } from '@/hooks/useAppointmentEvent'
import eventDialogSchema from '@/schema/eventDialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarClock, Clock, FileType2, Palette, PencilIcon, Repeat, UserPlus } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface IEventDialogProps {
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
  eventData: any
}

const EventDialog: React.FC<IEventDialogProps> = ({ isDialogOpen, setIsDialogOpen, eventData }) => {
  console.log("eventData:", eventData)
  const { t } = useTranslation()

  const { data: onlineEvents } = useFetchOnlineEvents()
  const [isEdit, setIsEdit] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)

  const form = useForm({
    resolver: zodResolver(eventDialogSchema),
    defaultValues: eventData
  })
  useEffect(() => {
    form.reset(eventData)
    return () => { }
  }, [eventData, form])

  const handleOnSubmit = useCallback(async (values: any) => {
    alert('Tính năng đang được phát triển')
  }, [])

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        setIsDialogOpen(false)
      }}
    >
      <DialogTitle />
      <DialogContent className='max-w-[60%] max-h-[600px] flex flex-col'>
        <div className='flex items-center space-x-2'>
          <Switch id='airplane-mode' onCheckedChange={() => setIsEdit(!isEdit)} />
          <Label htmlFor='airplane-mode'>Edit mode</Label>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className='overflow-y-auto h-full max-h-[500px] p-4 flex flex-col space-y-8'
          >
            {isEdit && (
              <>
                <FormInputField name='title' placeholder='Add title (required)' icon={PencilIcon} isAutofocus />
                {eventData?.category === 'appointment' ? (
                  <FormMultiSelectField name='attendees' placeholder='Add optional attendees' data={MOCK_DATA_USER} />
                ) : (
                  <FormSigleSelectField name='events' placeholder='Choose event' data={onlineEvents} />
                )}
                <FormDateTimeField name='eventTime' />
                <div className='grid grid-cols-3  gap-4 items-center'>
                  <FormLoopEventField name='recurrence' />
                  <FormTimeZoneField name='timezone' />
                  <FormColorPickerField name='color' />
                </div>
                <FormRichEditorField name='description' />
                <div className='absolute bottom-0 bg-white left-0 right-0 p-4 flex items-center justify-end'>
                  <Button type='submit' disabled={loadingBtn} className='capitalize'>
                    {loadingBtn ? <LoadingIcon /> : t('save')}
                  </Button>
                </div>
              </>
            )}
            {!isEdit && (
              <>
                <FormInputField name='title' icon={PencilIcon} disabled />
                {eventData?.category === 'appointment' && eventData?.attendees && (
                  <FormInputField
                    name='attendees'
                    icon={UserPlus}
                    disabled
                    value={form
                      .watch('attendees')
                      ?.map((attendee: any) => attendee.name)
                      .join(', ')}
                  />
                )}
                {eventData?.category === 'event' && eventData?.events && (
                  <FormInputField name='events' icon={UserPlus} disabled value={form.watch('events')?.name} />
                )}
                <FormInputField
                  name='eventTime'
                  icon={Clock}
                  disabled
                  value={`${form.watch('eventTime.startDate')}  ${form.watch('eventTime.startTime')} - ${form.watch('eventTime.endDate')}  ${form.watch('eventTime.endTime')}`}
                />
                <div className='grid grid-cols-3 gap-4 items-center'>
                  <FormInputField
                    name='recurrence'
                    icon={Repeat}
                    disabled
                    value={form.watch('recurrence.repeatUnit')}
                  />
                  <FormInputField name='timezone' icon={CalendarClock} disabled value={form.watch('timezone')} />
                  <FormInputField name='color' icon={Palette} disabled value={form.watch('color')} />
                </div>
                {form.watch('description') && (
                  <div className='flex gap-2 items-center w-full mb-[50px!important]'>
                    <FileType2 className='w-6 h-6 text-blue-dark' />
                    <div className='border-0 border-b rounded-none border-solid py-2 border-input w-full flex flex-wrap'>
                      <div
                        className='pl-2 w-full leading-6'
                        dangerouslySetInnerHTML={{
                          __html: form.watch('description')
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                <div className='absolute bottom-0 bg-white left-0 right-0 p-4 flex items-center justify-end'>
                  <Button disabled={loadingBtn} className='capitalize'>
                    {loadingBtn ? <LoadingIcon /> : t('delete')}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default React.memo(EventDialog)
