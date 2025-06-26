import Button from '@/components/ui/Button'
import useProductForm from '@/hooks/useProductForm'

export default function CreateProductButton () {
  const { openCreate } = useProductForm()

  return (
    <Button size='sm' onClick={openCreate}>
      Crear Producto
    </Button>
  )
}
