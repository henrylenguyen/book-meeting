/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
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

const FormInputField = React.memo(
  ({
    name,
    placeholder,
    icon: Icon,
    isAutofocus,
    disabled,
    value,
    ...props
  }: {
    name: string
    placeholder?: string
    icon: React.ElementType
    isAutofocus?: boolean
    disabled?: boolean
    value?: string
  }) => {
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
                <Input
                  placeholder={placeholder}
                  value={value ?? field.value}
                  onChange={field.onChange}
                  ref={inputRef}
                  className='border-0 border-b rounded-none text-[16px]'
                  {...props}
                  disabled={disabled}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
)

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

const FormTimeZoneField = React.memo(({ name, disabled, ...props }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 items-center'>
            <CalendarClock className='w-6 h-6 text-blue-dark' />
            <TimezoneDropdown onChange={field.onChange} {...props} disabled={disabled} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
))

const FormLoopEventField = React.memo(({ name, disabled, ...props }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 items-center w-full '>
            <Repeat className='w-6 h-6 text-blue-dark' />
            <EventLoop value={field.value} onChange={field.onChange} {...props} disabled={disabled} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
))

const FormColorPickerField = React.memo(({ name }: any) => {
  const [open, setOpen] = React.useState(false)
  const [tempColor, setTempColor] = React.useState('')

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='flex gap-2 items-center'>
              <Palette className='w-6 h-6 text-blue-dark' />
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger
                  className='ml-2 border-0 border-b rounded-none border-solid py-2 border-input text-gray-500'
                  style={{ backgroundColor: field.value ?? 'transparent' } as React.CSSProperties}
                >
                  {field.value ?? 'Select color'}
                </DialogTrigger>
                <DialogContent className='max-w-fit p-8 flex flex-col gap-2 items-center'>
                  <HexColorPicker color={tempColor || String(field.value)} onChange={(color) => setTempColor(color)} />
                  <div>
                    <span className='font-bold'>Your color</span>
                    <input
                      type='text'
                      className='border-0 border-b border-solid border-input w-full mt-2'
                      value={tempColor}
                      onChange={(e) => setTempColor(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      field.onChange(tempColor)
                      setOpen(false)
                    }}
                  >
                    Save
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

const FormRichEditorField = React.memo(({ name }: any) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <div className='flex gap-2 mb-[50px]'>
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

