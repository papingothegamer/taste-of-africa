import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggle = () => setIsOpen(!isOpen)

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`${
                option.value === value
                  ? 'text-white bg-blue-600'
                  : 'text-gray-900'
              } cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100`}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              <span className={`block truncate ${option.value === value ? 'font-semibold' : 'font-normal'}`}>
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const SelectTrigger: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>
}

export const SelectValue: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>
}

export const SelectContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>
}

export const SelectItem: React.FC<React.PropsWithChildren<{ value: string }>> = ({ children, value }) => {
  return <>{children}</>
}