import { ProductsService } from '@/services/products'
import type { Product } from '@/types/product'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'

const DEFAULT_LIMIT = 15

export default function useProducts () {
  const [data, setData] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const prevSearch = useRef<string | null>(null)
  const prevPage = useRef<number | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') || '1', 10)
  const query = searchParams.get('query') || ''

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      if (prevSearch.current === query && prevPage.current === page) return
      prevSearch.current = query
      prevPage.current = page

      try {
        const res = await ProductsService.getProducts({
          page,
          query,
          limit: DEFAULT_LIMIT
        })

        setData(res.products)
        setTotal(res.total)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        }
        setError('Error al obtener los productos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [page, query])

  const totalPages = Math.ceil(total / DEFAULT_LIMIT)

  return {
    data,
    totalPages,
    isLoading,
    error,
    currentPage: page,
    currentQuery: query,
    reset: () => setSearchParams(new URLSearchParams())
  }
}
