import { Button } from '@/components/ui/button'
import DateTimePicker from '@/components/ui/dateTimePicker'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import MultiSelect from '@/components/ui/multiSelect'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrentTime } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, PencilIcon, UserPlus } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

interface IEventDialogProps { }

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
  })
})

const EventDialog: React.FunctionComponent<IEventDialogProps> = () => {
  const { t } = useTranslation()
  const currentTime = formatCurrentTime()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      eventTime: {
        startDate: new Date(),
        startTime: currentTime,
        endDate: new Date(),
        endTime: currentTime
      }
    }
  })
  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className='max-w-[60%] '>
        <Tabs defaultValue='appointment' className='w-full p-4'>
          <TabsList className='w-full justify-start h-[50px] bg-transparent rounded-none'>
            <TabsTrigger
              value='appointment'
              className='capitalize data-[state=active]:text-blue-dark data-[state=active]:shadow-none font-bold  data-[state=active]:border-b data-[state=active]:border-blue-dark data-[state=active]:border-solid rounded-none'
            >
              {t('appointment')}
            </TabsTrigger>
            <TabsTrigger
              value='event'
              className='capitalize data-[state=active]:text-blue-dark data-[state=active]:shadow-none font-bold data-[state=active]:border-b data-[state=active]:border-blue-dark data-[state=active]:border-solid rounded-none'
            >
              {t('event')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value='appointment'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleOnSubmit)} className='space-y-8'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='flex gap-2 items-center'>
                          <PencilIcon className='w-6 h-6 text-blue-dark' />
                          <Input
                            placeholder='Add title (required)'
                            {...field}
                            className='border-0 border-b  rounded-none '
                            autoFocus
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='atendess'
                  render={({ field }) => {
                    console.log(field.value)
                    return (
                      <FormItem>
                        <FormControl>
                          <div className='flex gap-2 items-center'>
                            <UserPlus className='w-6 h-6 text-blue-dark' />
                            <MultiSelect
                              value={field.value || []}
                              onChange={field.onChange}
                              placeholder='Add optional atendess'
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='eventTime'
                  render={({ field }) => {
                    console.log(field.value)
                    return (
                      <FormItem>
                        <FormControl>
                          <div className='flex gap-2 items-center'>
                            <Clock className='w-6 h-6 text-blue-dark' />
                            <div>
                              <DateTimePicker {...field} />
                            </div>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button
                  type='submit'
                  className='bg-blue-dark hover:bg-transparent border border-solid hover:border-blue-dark hover:text-blue-dark'
                >
                  Submit
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value='event'>Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default EventDialog
