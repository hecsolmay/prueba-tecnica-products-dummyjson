/* eslint-disable better-tailwindcss/enforce-consistent-line-wrapping */
import { cn } from '@/lib/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import Spinner from './Spinner'

const buttonVariants = cva(
  `
    inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-all duration-200
    ease-in-out
    focus:outline-none
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary: `
            transform bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg
            hover:from-blue-800 hover:to-blue-700 hover:shadow-xl
          `,
        warning: `
            transform bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg
            hover:from-amber-400 hover:to-amber-300 hover:shadow-xl
          `,
        outline: `
            border-2 border-blue-900 bg-transparent text-blue-900
            hover:bg-blue-900 hover:text-white
          `
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2 text-base',
        lg: 'px-8 py-4 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const LoadingSpinner = () => (
  <div className='absolute inline-flex items-center justify-center'>
    <Spinner />
  </div>
)

export default function Button ({
  className,
  variant,
  size,
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        isLoading && 'pointer-events-none',
        className
      )}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      <span
        className={cn('transition', isLoading ? 'opacity-0' : 'opacity-100')}
      >
        {children}
      </span>
    </button>
  )
}
