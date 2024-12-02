export interface IOrder {
  
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
