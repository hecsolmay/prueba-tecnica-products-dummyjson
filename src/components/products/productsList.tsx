import Pagination from '@/components/Pagination'
import ProductCard from '@/components/products/productCard'
import Spinner from '@/components/ui/Spinner'
import useProducts from '@/hooks/useProducts'

export default function ProductsList () {
  const { data: products, isLoading, totalPages } = useProducts()

  if (isLoading) {
    return (
      <div className='flex min-h-[50dvh] w-full items-center justify-center'>
        <Spinner className='size-6' />
        <span className='ml-2 text-sm text-gray-500'>Cargando productos...</span>
      </div>
    )
  }

  return (
    <div className='w-full'>
      {/* Products Grid */}
      <div className={`
        mx-auto mb-12 grid max-w-[1600px] grid-cols-1 gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]
      `}

      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} onEdit={(id) => console.log('Edit product', id)} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
      />
    </div>
  )
}
