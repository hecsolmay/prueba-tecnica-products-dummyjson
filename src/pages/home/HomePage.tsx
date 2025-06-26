import CreateProductButton from '@/components/products/CreateProductButton'
import ProductFormModal from '@/components/products/ProductFormModal'
import ProductsFilters from '@/components/products/ProductsFilters'
import ProductsList from '@/components/products/productsList'
import { ProductFormProvider } from '@/context/ProductFormContext'

export default function HomePage () {
  return (
    <ProductFormProvider>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <h1 className='mb-6 text-2xl font-semibold'>
          Conoce nuestros productos
        </h1>
        <CreateProductButton />
      </div>

      {/* Product Form Modal */}
      <ProductFormModal />

      <ProductsFilters />
      <ProductsList />
    </ProductFormProvider>
  )
}
