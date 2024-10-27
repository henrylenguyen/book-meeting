import { LoadingIcon } from '@/assets/icons'
import { Input } from '@/components/ui/input'
import { getFirstAndLastChar } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface SingleSelectProps {
  value: string | null | undefined
  onChange: (selected: string) => void
  placeholder?: string
  data: { id: number; tickets_by: string; name: string }[]
}

const SingleSelect: React.FC<SingleSelectProps> = ({ value, onChange, placeholder, data }) => {
  const [query, setQuery] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<{ id: number; tickets_by: string; name: string }[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  const containerRef = useRef(null)

  useOnClickOutside(containerRef, () => setIsPopoverOpen(false))

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true)
      setTimeout(() => {
        const results = data.filter((item) => item.tickets_by.toLowerCase().includes(query.toLowerCase()))
        setFilteredOptions(results)
        setLoading(false)
      }, 500)
    } else {
      setFilteredOptions(data)
    }
  }, [query, data])

  const handleSelectOption = (option: { id: number; tickets_by: string }) => {
    onChange(option.tickets_by)
    setQuery('')
    setIsPopoverOpen(false)
  }

  const renderResults = () => {
    if (loading) {
      return (
        <div className='flex items-center w-full justify-center py-4'>
          <LoadingIcon />
        </div>
      )
    } else if (filteredOptions.length === 0) {
      return <div className='px-2 py-4 text-gray-500'>No results found. Check spelling or try another name.</div>
    } else {
      return (
        <ul>
          {filteredOptions.map((option) => (
            <li key={option.id}>
              <button
                className='p-2 hover:bg-gray-100 cursor-pointer flex gap-2 w-full'
                onClick={() => handleSelectOption(option)}
              >
                <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-dark rounded-full'>
                  <span className='font-medium text-white '>{getFirstAndLastChar(option.name)}</span>
                </div>

                <div className='flex flex-col gap-2 items-start'>
                  <div className='font-bold'>{option.name}</div>
                  <div className='text-[12px] text-gray-500'>{option.tickets_by}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )
    }
  }

  return (
    <div className='w-full' ref={containerRef}>
      <div className='relative'>
        <Input
          type='text'
          className='flex-grow border-0 border-b rounded-none'
          value={query}
          placeholder={placeholder ?? 'Type to search...'}
          onFocus={() => setIsPopoverOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isPopoverOpen && (
          <div className='absolute top-full left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-[999999] p-2 h-[200px]'>
            {renderResults()}
          </div>
        )}
      </div>
      {value && (
        <div className='mt-2'>
          <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full'>{value}</span>
        </div>
      )}
    </div>
  )
}

export default SingleSelect
