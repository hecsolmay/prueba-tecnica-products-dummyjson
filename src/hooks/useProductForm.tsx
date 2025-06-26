import { useProductFormContext } from '@/context/ProductFormContext'

export default function useProductForm () {
  const {
    isOpen,
    mode,
    defaultValues,
    isSubmitting,
    openCreate,
    openEdit,
    close,
    setSubmitting
  } = useProductFormContext()

  return {
    isOpen,
    mode,
    defaultValues,
    isSubmitting,
    openCreate,
    openEdit,
    close,
    setSubmitting
  }
}
