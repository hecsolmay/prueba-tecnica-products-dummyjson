import Button from '@/components/ui/Button'
import type { Product } from '@/types/product'
import { Edit3 } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onEdit: (id: number) => void
}

export default function ProductCard ({ product, onEdit }: ProductCardProps) {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300
        hover:shadow-lg
      `}
    >
      <div className='relative aspect-[4/3] overflow-hidden'>
        <img
          src={product.imageUrl}
          alt={`Imagen del producto ${product.title}`}
          className={`
            h-full w-full object-cover transition-transform duration-300
            group-hover:scale-105
          `}
        />

        {/* Edit button */}
        <button
          onClick={() => onEdit(product.id)}
          className={`
            absolute top-3 right-3 rounded-full bg-white/90 p-2 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200
            group-hover:opacity-100
            hover:scale-110 hover:bg-white
          `}
        >
          <Edit3 size={16} className='text-gray-700' />
        </button>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-y-2 p-6'>
        <h3
          className={`
            mb-2 min-h-14 text-lg font-semibold text-gray-900 transition-colors duration-200
            group-hover:text-blue-600
          `}
        >
          {product.title}
        </h3>

        <p className='mb-4 line-clamp-3 h-[72px] text-sm leading-relaxed text-gray-600'>
          {product.description}
        </p>

        <span className='text-2xl font-bold text-blue-600'>
          ${product.price.toFixed(2)}
        </span>

        <Button size='sm' disabled className='pointer-events-none'>
          próximamente 🛒
        </Button>
      </div>
    </div>
  )
}
