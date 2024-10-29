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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOCK_DATA_USER } from '@/constants/mock-user'
import { generateJitsiURL, getEventTime, systemTimezone } from '@/lib/utils'
import eventDialogSchema from '@/schema/eventDialog'
import useAppointmentStore from '@/store/appointment'
import useEventStore from '@/store/event'
import { IAppointmentStore } from '@/types/appointmentType'
import { IEventStore } from '@/types/eventType'
import { zodResolver } from '@hookform/resolvers/zod'
import { PencilIcon } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

interface IEventDialogProps {
  selectedDateRange: { start: string; end: string } | null
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
}

const EventDialog: React.FC<IEventDialogProps> = ({ selectedDateRange, isDialogOpen, setIsDialogOpen }) => {
  const { t } = useTranslation()
  const { createNewAppointment, success } = useAppointmentStore((state) => state as IAppointmentStore)
  const { onlineEvents } = useEventStore((state) => state as IEventStore)

  const [tabValue, setTabValue] = useState('appointment')
  const [loadingBtn, setLoadingBtn] = useState(false)

  const form = useForm({
    resolver: zodResolver(eventDialogSchema),
    defaultValues: useMemo(
      () => ({
        title: '',
        recurrence: { repeatUnit: 'Does not repeat' },
        timezone: systemTimezone ?? 'UTC',
        color: '#ffffff',
        events: '',
        eventTime: getEventTime(selectedDateRange)
      }),
      [selectedDateRange]
    )
  })

  useEffect(() => {
    // Kiểm tra xem selectedDateRange có hợp lệ không
    const isValidRange =
      selectedDateRange?.start &&
      selectedDateRange?.end &&
      new Date(selectedDateRange.start) <= new Date(selectedDateRange.end)

    // Trường hợp không có events được chọn và có selectedDateRange hợp lệ
    if (isValidRange && form.getValues('events') === undefined) {
      form.reset({ ...form.getValues(), eventTime: getEventTime(selectedDateRange) })
    }

    // Trường hợp có sự kiện trong form và tồn tại trong danh sách sự kiện online
    if (form.watch('events') !== undefined) {
      const event = form.watch('events')
      onlineEvents.forEach((item) => {
        if (item.title === event) {
          form.reset({
            ...form.watch(),
            eventTime: {
              startDate: item?.eventTime.startDate,
              endDate: item?.eventTime.endDate,
              startTime: item?.eventTime.startTime,
              endTime: item?.eventTime.endTime
            }
          })
        }
      })
    }
  }, [form.watch('events'), onlineEvents, selectedDateRange])

  const handleOnSubmit = useCallback(
    async (values: any) => {
      if (tabValue === 'appointment') {
        const event = {
          ...values,
          id: uuidv4(),
          url: generateJitsiURL(),
          type: values.recurrence?.repeatUnit !== 'Does not repeat' ? 'recurring' : 'single',
          category: tabValue,
          share_url: ''
        }
        try {
          setLoadingBtn(true)
          await createNewAppointment(event)
          setLoadingBtn(false)
          form.reset({
            title: '',
            recurrence: { repeatUnit: 'Does not repeat' },
            timezone: systemTimezone ?? 'UTC',
            color: '#ffffff'
          })
          setIsDialogOpen(false)
        } catch (error) {
          setLoadingBtn(false)
          console.error('Failed to create appointment:', error)
          toast.error('Failed to create appointment')
        }
      } else {
        const event = {
          ...values,
          id: uuidv4(),
          url: onlineEvents.find((item) => item.title === values.events)?.url,
          type: 'single',
          category: tabValue,
          share_url: ''
        }
        try {
          setLoadingBtn(true)
          await createNewAppointment(event)
          setLoadingBtn(false)
          form.reset({
            title: '',
            recurrence: { repeatUnit: 'Does not repeat' },
            timezone: systemTimezone ?? 'UTC',
            color: '#ffffff'
          })
          setIsDialogOpen(false)
        } catch (error) {
          setLoadingBtn(false)
          console.error('Failed to create event:', error)
          toast.error('Failed to create event')
        }
      }
    },
    [tabValue, createNewAppointment, success, setIsDialogOpen, form]
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        form.reset({
          title: '',
          recurrence: { repeatUnit: 'Does not repeat' },
          timezone: systemTimezone ?? 'UTC',
          color: '#ffffff'
        })
        setIsDialogOpen(false)
      }}
    >
      <DialogTitle />
      <DialogContent className='max-w-[60%] max-h-[600px] flex'>
        <Tabs defaultValue='appointment' className='w-full' onValueChange={setTabValue}>
          <TabsList className='w-full justify-start h-[50px] bg-transparent rounded-none'>
            <TabsTrigger value='appointment' className='capitalize font-bold'>
              {t('appointment')}
            </TabsTrigger>
            <TabsTrigger value='event' className='capitalize font-bold'>
              {t('event')}
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className='overflow-y-auto h-full max-h-[500px] p-4'>
              <TabsContent value='appointment' className='flex flex-col space-y-8'>
                <FormInputField name='title' placeholder='Add title (required)' icon={PencilIcon} isAutofocus />
                <FormMultiSelectField name='attendees' placeholder='Add optional attendees' data={MOCK_DATA_USER} />
                <FormDateTimeField name='eventTime' />
                <div className='flex gap-4 items-center'>
                  <FormLoopEventField name='recurrence' />
                  <FormTimeZoneField name='timezone' />
                  <FormColorPickerField name='color' />
                </div>
                <FormRichEditorField name='description' />
              </TabsContent>
              <TabsContent value='event' className='flex flex-col space-y-8'>
                <FormInputField name='title' placeholder='Add title (required)' icon={PencilIcon} isAutofocus />
                <FormSigleSelectField name='events' placeholder='Choose event' data={onlineEvents} />
                {form.watch('events') && <FormDateTimeField name='eventTime' />}
                <FormRichEditorField name='description' />
              </TabsContent>
              <div className='absolute bottom-0 bg-white left-0 right-0 p-4 flex items-center justify-end'>
                <Button type='submit' disabled={loadingBtn}>
                  {loadingBtn ? <LoadingIcon /> : t('save')}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default React.memo(EventDialog)
