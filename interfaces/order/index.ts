import { IProduct } from 'interfaces/product'

export interface IOrder {
  _id: string
  client: string
  shop: string
  payment: string
  status: string
  phone: string
  shipTo: string
  trackingNumber: string
  checkout: {
    shipFee: number
    totalCheckout: number
    totalDiscount: number
    totalPrice: number
  }
  productItems: {
    cartProductItem: string
    variant: string
    quantity: number
    product: IProduct
  }[]
}

export interface IReviewCheckout {
  checkoutOrder: {
    shipFee: number
    totalCheckout: number
    totalDiscount: number
    totalPrice: number
  }
  newShopOrders: any[]
}
