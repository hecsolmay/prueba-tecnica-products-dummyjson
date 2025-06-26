import type { Product, ProductCreateDto } from '@/types/product'
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

    params.set('q', query)

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

  static async createProduct (product: ProductCreateDto): Promise<Product> {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })

    if (!res.ok) throw new Error('No se pudieron crear el producto')

    const data = await res.json()
    return data
  }

  static async updateProduct (
    id: number,
    product: Partial<Omit<Product, 'id'>>
  ): Promise<Product> {
    const updateUrl = `https://dummyjson.com/products/${id}`

    const res = await fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer dummy' },
      body: JSON.stringify(product)
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Error status:', res.status)
      console.error('Error body:', errorText)
      throw new Error('No se pudo actualizar el producto')
    }

    const data = await res.json()
    return data
  }
}
