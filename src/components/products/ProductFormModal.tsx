import Modal from '@/components/Modal'
import useProductForm from '@/hooks/useProductForm'
import ProductForm from './ProductForm'

export default function ProductFormModal () {
  const { isOpen, close, mode } = useProductForm()

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={mode === 'create' ? 'Crear producto' : 'Editar producto'}
    >
      {isOpen && <ProductForm />}
    </Modal>
  )
}
