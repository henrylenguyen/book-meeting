/* eslint-disable @typescript-eslint/no-explicit-any */
import DateTimePicker from '@/components/ui/dateTimePicker'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import EventLoop from '@/components/ui/eventLoop'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import MultiSelect from '@/components/ui/multiSelect'
import Editor from '@/components/ui/richEditer'
import SingleSelect from '@/components/ui/singleSelect'
import TimezoneDropdown from '@/components/ui/timezone'
import { CalendarClock, CalendarFold, Clock, FileType2, Palette, Repeat, UserPlus } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'

const FormInputField = React.memo(({ name, placeholder, icon: Icon, isAutofocus }: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isAutofocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAutofocus])

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='flex gap-2 items-center'>
              <Icon className='w-6 h-6 text-blue-dark' />
              <Input placeholder={placeholder} {...field} ref={inputRef} className='border-0 border-b rounded-none' />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

const FormMultiSelectField = React.memo(({ name, placeholder, data }: any) => (
  <FormField
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
))

const FormDateTimeField = React.memo(({ name }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 items-center'>
            <Clock className='w-6 h-6 text-blue-dark' />
            <DateTimePicker {...field} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
))

const FormTimeZoneField = React.memo(({ name }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 items-center'>
            <CalendarClock className='w-6 h-6 text-blue-dark' />
            <TimezoneDropdown onChange={field.onChange} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
))

const FormLoopEventField = React.memo(({ name }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 items-center'>
            <Repeat className='w-6 h-6 text-blue-dark' />
            <EventLoop value={field.value} onChange={field.onChange} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
))

const FormColorPickerField = React.memo(({ name }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 items-center'>
            <Palette className='w-6 h-6 text-blue-dark' />
            <Dialog>
              <DialogTrigger className='ml-2 border-0 border-b rounded-none border-solid py-2 border-input'>
                Pick color
              </DialogTrigger>
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
))

const FormRichEditorField = React.memo(({ name }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 mb-8'>
            <FileType2 className='w-6 h-6 text-blue-dark' />
            <Editor placeholder='Enter your description' value={field.value} onChange={field.onChange} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
))
const FormSigleSelectField = React.memo(({ name, placeholder, data }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 items-center'>
            <CalendarFold className='w-6 h-6 text-blue-dark' />
            <SingleSelect onChange={field.onChange} placeholder={placeholder} data={data} value={field.value || ''} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
))
export {
  FormColorPickerField,
  FormDateTimeField,
  FormInputField,
  FormLoopEventField,
  FormMultiSelectField,
  FormRichEditorField,
  FormSigleSelectField,
  FormTimeZoneField
}
