import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps {
  options: { value: string; label: string }[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export const SelectTrigger: React.FC<{ onClick: () => void, selectedLabel: string | undefined, placeholder: string }> = ({ onClick, selectedLabel, placeholder }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      aria-haspopup="listbox"
    >
      <span className="block truncate">
        {selectedLabel || placeholder}
      </span>
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </span>
    </button>
  )
}

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ul
      className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      tabIndex={-1}
      role="listbox"
    >
      {children}
    </ul>
  )
}

export const SelectItem: React.FC<{ option: { value: string, label: string }, isSelected: boolean, onSelect: () => void }> = ({ option, isSelected, onSelect }) => {
  return (
    <li
      key={option.value}
      className={`${
        isSelected ? 'text-white bg-blue-600' : 'text-gray-900'
      } cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100`}
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
    >
      <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>
        {option.label}
      </span>
    </li>
  )
}

export const SelectValue: React.FC<{ value: string | undefined }> = ({ value }) => {
  return <span>{value}</span>
}

export const Select: React.FC<SelectProps> = ({ options, value, onValueChange, placeholder = 'Select an option' }) => {
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
    onValueChange(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative w-full" ref={selectRef}>
      {/* SelectTrigger */}
      <SelectTrigger
        onClick={handleToggle}
        selectedLabel={selectedOption ? selectedOption.label : undefined}
        placeholder={placeholder}
      />

      {/* SelectContent */}
      {isOpen && (
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              option={option}
              isSelected={option.value === value}
              onSelect={() => handleSelect(option.value)}
            />
          ))}
        </SelectContent>
      )}
    </div>
  )
}
