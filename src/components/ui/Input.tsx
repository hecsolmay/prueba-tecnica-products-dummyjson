/* eslint-disable better-tailwindcss/enforce-consistent-line-wrapping */
import { cn } from '@/lib/cn'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  allowShowPassword?: boolean
  ref?: React.Ref<HTMLInputElement>
}
export default function Input ({
  label,
  error,
  className,
  allowShowPassword = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  if (allowShowPassword && props.type === 'password') {
    const toggleShowPassword = () => setShowPassword(!showPassword)
    return (
      <div className='w-full'>
        {label && (
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            {label}
          </label>
        )}

        <div className='relative'>
          <input
            className={cn(
              'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900',
              `
            placeholder-gray-400
            focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-400
          `,
              'disabled:cursor-not-allowed disabled:bg-gray-100',
              error &&
                `
              border-red-500
              focus:border-red-500 focus:ring-red-500 focus:outline-red-400
              `,
              className
            )}
            {...props}
            type={showPassword ? 'text' : 'password'}
          />

          <button
            onClick={toggleShowPassword}
            type='button'
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-500'
            title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    )
  }

  return (
    <div className='w-full'>
      {label && (
        <label className='mb-2 block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}

      <input
        className={cn(
          'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900',
          `
            placeholder-gray-400
            focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-400
          `,
          'disabled:cursor-not-allowed disabled:bg-gray-100',
          error &&
            `
              border-red-500
              focus:border-red-500 focus:ring-red-500 focus:outline-red-400
            `,
          className
        )}
        {...props}
      />

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  )
}
