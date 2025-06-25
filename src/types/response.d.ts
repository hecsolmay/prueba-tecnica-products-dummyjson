import type { Product, ProductDummyResult } from './product'

export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface ProductsResponse {
  products: ProductDummyResult[]
  total: number
  skip: number
  limit: number
}

export interface ProductMapResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
