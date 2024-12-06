export interface IProduct {
  _id: string
  id: string
  name: string
  price: number
  thumb: string
  description: string
  stock: number
  shop: any
  ratingStar: number
  asset: {
    sizeImage: string
    productImages: string[]
    variationImages: string[]
  }
  attributes: {
    name: string
    value: string
    group: string
  }[]
  variationFirst: {
    name: string
    options: string[]
  }
  variationSecond: {
    name: string
    options: string[]
  }
  tags: string[]
  categories: any[]
  createdAt: string
  updatedAt: string
}