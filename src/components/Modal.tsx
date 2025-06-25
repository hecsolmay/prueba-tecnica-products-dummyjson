/* eslint-disable better-tailwindcss/enforce-consistent-line-wrapping */
import { cn } from '@/lib/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

const modalContainerVariants = cva(
  `
    relative mx-auto flex max-h-[90vh] w-full transform flex-col overflow-hidden rounded-xl border
    border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-out
    open:animate-fade-in open:duration-300
  `,
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'mx-4 max-w-full'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface ModalProps
  extends React.DialogHTMLAttributes<HTMLDialogElement>,
  VariantProps<typeof modalContainerVariants> {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
}

export default function Modal ({
  isOpen,
  onClose,
  title,
  children,
  size,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Efecto para que el se esconda el scroll cuando se abre el modal
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog.close()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Efecto para crear o limpiar eventos al abrir o cerrar el modal
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose()
    const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const handleBackdropClick = (e: MouseEvent) =>
      closeOnBackdropClick && e.target === dialog && onClose()

    dialog.addEventListener('close', handleClose)
    document.addEventListener('keydown', handleKeydown)
    dialog.addEventListener('click', handleBackdropClick)

    return () => {
      dialog.removeEventListener('close', handleClose)
      document.removeEventListener('keydown', handleKeydown)
      dialog.removeEventListener('click', handleBackdropClick)
    }
  }, [onClose, closeOnBackdropClick])

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        `
          fixed inset-0 z-50 size-full bg-transparent p-4
          backdrop:bg-black/50 backdrop:backdrop-blur-sm
          open:flex open:animate-fade-in open:duration-300
        `,
        className
      )}
      {...props}
    >
      <div
        className={cn(modalContainerVariants({ size }), 'open:animate-zoom-in')}
        onClick={e => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div
            className={cn(
              'flex items-center justify-between border-b border-gray-200 p-6',
              !title && 'justify-end'
            )}
          >
            {title && (
              <h2 className='truncate pr-4 text-xl font-semibold text-gray-900'>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`
                  -m-2 flex-shrink-0 cursor-pointer rounded-lg p-2 text-gray-400 transition-colors duration-200
                  hover:bg-gray-100 hover:text-gray-600
                  focus:outline-none
                `}
                aria-label='Close modal'
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className='flex-1 overflow-y-auto p-6'>{children}</div>
      </div>
    </dialog>
  )
}
