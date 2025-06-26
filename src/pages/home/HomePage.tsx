import ProductsFilters from '@/components/products/ProductsFilters'
import ProductsList from '@/components/products/productsList'

export default function HomePage () {
  return (
    <>
      <h1 className='mb-6 text-2xl font-semibold'>Conoce nuestros productos</h1>
      <ProductsFilters />
      <ProductsList />
    </>
  )
}
