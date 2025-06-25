import type { ProductMapResponse, ProductsResponse } from '@/types/response'

interface GetProductsParams {
  limit?: number
  page?: number
  query?: string
}

const BASE_URL = 'https://dummyjson.com/products/search'

const isValidNumber = (value: number) =>
  !isNaN(value) &&
  value !== Infinity &&
  value !== -Infinity &&
  typeof value === 'number'

export class ProductsService {
  static async getProducts ({
    limit = 10,
    page = 1,
    query = ''
  }: GetProductsParams): Promise<ProductMapResponse> {
    const params = new URLSearchParams()
    params.set('limit', limit.toString())
    params.set('skip', '0')
    if (limit < 10 || !isValidNumber(limit)) {
      params.set('limit', '10')
    }

    if (page >= 1 && isValidNumber(page)) {
      const skip = (page - 1) * limit
      params.set('skip', skip.toString())
    }

    params.set('query', query)

    console.log(`${BASE_URL}?${params.toString()}`)
    const res = await fetch(`${BASE_URL}?${params.toString()}`)

    if (!res.ok) throw new Error('No se pudieron obtener los productos')

    const data = (await res.json()) as ProductsResponse

    const mappedProducts = data.products.map(product => ({
      ...product,
      imageUrl: product.images[0]
    }))

    return {
      products: mappedProducts,
      total: data.total,
      skip: (page - 1) * limit,
      limit
    }
  }
}
