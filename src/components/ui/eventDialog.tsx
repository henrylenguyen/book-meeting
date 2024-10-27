/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import DateTimePicker from '@/components/ui/dateTimePicker'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import EventLoop from '@/components/ui/eventLoop'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import MultiSelect from '@/components/ui/multiSelect'
import Editor from '@/components/ui/richEditer'
import SingleSelect from '@/components/ui/singleSelect'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOCK_DATA_USER } from '@/constants/mock-user'
import { useLanguage } from '@/context/languageContext'
import { getEventTime } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarFold, Clock, FileType2, MapIcon, Palette, PencilIcon, Repeat, UserPlus } from 'lucide-react'
import React, { useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  atendess: z.optional(
    z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string()
      })
    )
  ),
  eventTime: z.object({
    startDate: z.date(),
    startTime: z.string().optional(),
    endDate: z.date(),
    endTime: z.string().optional()
  }),
  events: z.optional(
    z.object({
      id: z.number(),
      tickets_by: z.string()
    })
  ),
  recurrence: z.optional(
    z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      repeatEvery: z.number().positive('Repeat every should be a positive number').optional(),
      repeatUnit: z.string()
    })
  ),
  location: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional()
})

interface IEventDialogProps {
  selectedDateRange: { start: string; end: string } | null
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
}
const EventDialog: React.FC<IEventDialogProps> = ({ selectedDateRange, isDialogOpen, setIsDialogOpen }) => {
  const { language } = useLanguage()
  const { t } = useTranslation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      eventTime: getEventTime(selectedDateRange, language)
    }
  })
  console.log(getEventTime(selectedDateRange, language))
  useEffect(() => {
    if (selectedDateRange) {
      form.reset({
        title: '',
        eventTime: getEventTime(selectedDateRange, language)
      })
    }
    return () => { }
  }, [selectedDateRange?.start])

  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const FormInputField = ({
    name,
    placeholder,
    icon: Icon,
    isAutofocus
  }: {
    name: any
    placeholder: string
    icon: React.ElementType
    isAutofocus?: boolean
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='flex gap-2 items-center'>
              <Icon className='w-6 h-6 text-blue-dark' />
              <Input
                placeholder={placeholder}
                {...field}
                className='border-0 border-b rounded-none'
                autoFocus={isAutofocus}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const FormMultiSelectField = ({ name, placeholder, data }: { name: any; placeholder: string; data: any }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='flex gap-2 items-center'>
              <UserPlus className='w-6 h-6 text-blue-dark' />
              <MultiSelect value={field.value || []} onChange={field.onChange} placeholder={placeholder} data={data} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const FormDateTimeField = ({ name }: { name: any }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        console.log('field:', field)
        return (
          <FormItem>
            <FormControl>
              <div className='flex gap-2 items-center'>
                <Clock className='w-6 h-6 text-blue-dark' />
                <DateTimePicker {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )

  const FormLoopEventField = ({ name }: { name: any }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='flex gap-2 items-center'>
              <Repeat className='w-6 h-6 text-blue-dark' />
              <EventLoop value={field.value} onChange={(newValue: never) => field.onChange(newValue)} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
  const FormColorPickerField = ({ name }: { name: any }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='flex gap-2 items-center mb-8'>
              <Palette className='w-6 h-6 text-blue-dark' />
              <Dialog>
                <DialogTrigger className='ml-2'>Pick color</DialogTrigger>
                <DialogContent className='max-w-fit p-8'>
                  <HexColorPicker color={String(field.value)} onChange={field.onChange} />
                </DialogContent>
              </Dialog>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
  const FormRichEditorField = ({ name }: { name: any }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='flex gap-2'>
              <FileType2 className='w-6 h-6 text-blue-dark' />
              <Editor placeholder='Ender your description' value={field.value} onChange={field.onChange} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='max-w-[60%] max-h-[600px]  '>
        <Tabs defaultValue='appointment' className='w-full'>
          <TabsList className='w-full justify-start h-[50px] bg-transparent rounded-none'>
            <TabsTrigger
              value='appointment'
              className='capitalize font-bold data-[state=active]:border-b data-[state=active]:border-solid data-[state=active]:border-blue-dark data-[state=active]:shadow-none rounded-none data-[state=active]:text-blue-dark'
            >
              {t('appointment')}
            </TabsTrigger>
            <TabsTrigger
              value='event'
              className='capitalize font-bold data-[state=active]:border-b data-[state=active]:border-solid data-[state=active]:border-blue-dark data-[state=active]:shadow-none rounded-none data-[state=active]:text-blue-dark'
            >
              {t('event')}
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className='overflow-y-auto h-full max-h-[500px] p-4'>
              <TabsContent value='appointment' className='  flex flex-col space-y-8 '>
                <FormInputField name='title' placeholder='Add title (required)' icon={PencilIcon} />
                <FormMultiSelectField name='atendess' placeholder='Add optional attendees' data={MOCK_DATA_USER} />
                <FormDateTimeField name='eventTime' />
                <FormLoopEventField name='recurrence' />
                <FormInputField name='location' placeholder='Add location of meeting' icon={MapIcon} />
                <FormRichEditorField name='description' />
                <FormColorPickerField name='color' />
              </TabsContent>
              <TabsContent value='event' className='  flex flex-col space-y-8 '>
                <FormInputField name='title' placeholder='Add title (required)' icon={PencilIcon} />
                <FormMultiSelectField name='atendess' placeholder='Add optional attendees' data={MOCK_DATA_USER} />
                <FormDateTimeField name='eventTime' />
                <FormField
                  control={form.control}
                  name='events'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='flex gap-2 items-center'>
                          <CalendarFold className='w-6 h-6 text-blue-dark' />
                          <SingleSelect
                            value={field?.value?.tickets_by || ''}
                            onChange={field.onChange}
                            placeholder='Choose event'
                            data={[
                              { id: 1, tickets_by: 'Eventbrite', name: 'heheh' },
                              { id: 2, tickets_by: 'Ticketmaster', name: 'henry' },
                              { id: 3, tickets_by: 'StubHub', name: 'thái lê' }
                            ]}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormColorPickerField name='color' />
              </TabsContent>
              <div className='absolute bottom-0 bg-white left-0 right-0 p-4 flex items-center justify-end'>
                <Button
                  type='submit'
                  className='bg-blue-dark hover:bg-transparent  border border-solid hover:text-blue-dark hover:border-blue-dark'
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default EventDialog
