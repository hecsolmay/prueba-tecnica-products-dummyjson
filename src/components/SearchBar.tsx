import { cn } from '@/lib/cn'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onClear?: () => void
  className?: string
}

export default function SearchBar ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
  onClear
}: SearchBarProps) {
  return (
    <div className={cn('relative w-full max-w-md', className)}>
      {/* Search Icon */}
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <Search size={20} className='text-gray-400' />
      </div>

      {/* Input Field */}
      <input
        type='text'
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full rounded-xl border border-gray-300 bg-white py-3 pr-10 pl-10 text-sm text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200
          hover:border-gray-400
          focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none
        `}
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={onClear}
          className={`
            group absolute inset-y-0 right-0 flex items-center rounded-r-xl pr-3 transition-colors duration-200
            hover:bg-gray-50
          `}
        >
          <X
            size={18}
            className={`
              text-gray-400
              group-hover:text-gray-600
            `}
          />
        </button>
      )}
    </div>
  )
}
