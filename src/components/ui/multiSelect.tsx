// MultiSelect.tsx
import { LoadingIcon } from '@/assets/icons'
import { Input } from '@/components/ui/input'
import { getFirstAndLastChar } from '@/lib/utils'
import { SearchDataResult } from '@/types/searchUser'
import React, { useEffect, useState } from 'react'

interface MultiSelectProps {
  value: SearchDataResult[]
  onChange: (selected: SearchDataResult[]) => void
  placeholder?: string
  data: SearchDataResult[]
}

const MultiSelect: React.FC<MultiSelectProps> = ({ value, onChange, placeholder, data }) => {
  const [query, setQuery] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<SearchDataResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true)
      setTimeout(() => {
        const results = data.filter((data) => data.name.toLowerCase().includes(query.toLowerCase()))
        setFilteredOptions(results)
        setLoading(false)
      }, 500)
    } else {
      setFilteredOptions([])
    }
  }, [query])

  const handleSelectOption = (option: SearchDataResult) => {
    if (!value.find((selected) => selected.id === option.id)) {
      onChange([...value, option])
    }
    setQuery('')
  }

  const handleRemoveOption = (id: number) => {
    onChange(value.filter((option) => option.id !== id))
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectOption(option)
                  }
                }}
                tabIndex={0}
              >
                <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-dark rounded-full'>
                  <span className='font-medium text-white '>{getFirstAndLastChar(option.name)}</span>
                </div>

                <div className='flex flex-col gap-2 items-start'>
                  <div className='font-bold'>{option.name}</div>
                  <div className='text-[12px] text-gray-500'>{option.email}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )
    }
  }

  return (
    <div className='w-full'>
      <div className='relative'>
        <div className='flex items-center flex-wrap gap-2 p-1 '>
          {value.map((option) => (
            <span key={option.id} className='flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full'>
              {option.name}
              <button onClick={() => handleRemoveOption(option.id)} className='ml-2 text-blue-700 hover:text-blue-900'>
                &times;
              </button>
            </span>
          ))}
          <Input
            type='text'
            className='flex-grow border-0 border-b rounded-none'
            value={query}
            placeholder={placeholder ?? 'Type to search...'}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {query.length > 0 && (
          <div className='absolute top-full left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10'>
            {renderResults()}
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiSelect
