import type { Product, ProductCreateDto } from '@/types/product'
import { createContext, useContext, useState } from 'react'

type Mode = 'create' | 'edit'

interface ProductFormContextProps {
  isOpen: boolean
  mode: Mode
  defaultValues: Partial<ProductCreateDto> | null
  isSubmitting: boolean
  openCreate: () => void
  openEdit: (product: Product) => void
  close: () => void
  setSubmitting: (value: boolean) => void
}

const ProductFormContext = createContext<ProductFormContextProps | undefined>(
  undefined
)

export const ProductFormProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('create')
  const [defaultValues, setDefaultValues] = useState<Partial<Product> | null>(
    null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openCreate = () => {
    setMode('create')
    setDefaultValues(null)
    setIsOpen(true)
  }

  const openEdit = (product: Product) => {
    setMode('edit')
    setDefaultValues(product)
    setIsOpen(true)
  }

  const close = () => {
    if (!isSubmitting) {
      setIsOpen(false)
      setDefaultValues(null)
    }
  }

  const setSubmitting = (value: boolean) => {
    setIsSubmitting(value)
  }

  return (
    <ProductFormContext.Provider
      value={{
        isOpen,
        mode,
        defaultValues,
        isSubmitting,
        openCreate,
        openEdit,
        close,
        setSubmitting
      }}
    >
      {children}
    </ProductFormContext.Provider>
  )
}

export const useProductFormContext = () => {
  const context = useContext(ProductFormContext)
  if (!context) {
    throw new Error(
      'useProductFormContext must be used within a ProductFormProvider'
    )
  }
  return context
}
