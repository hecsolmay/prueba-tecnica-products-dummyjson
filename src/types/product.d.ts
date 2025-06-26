export interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  imageUrl: string
}

export interface ProductDummyResult extends Omit<Product, 'imageUrl'> {
  images: string[]
}

export type ProductCreateDto = Omit<Product, 'thumbnail'>
