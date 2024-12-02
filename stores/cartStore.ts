import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'
import { addToCart, deleteCart, getMyCarts, updateCart } from 'API/cart'
import {
  IAddToCart,
  ICart,
  IDeleteCart,
  IListCart,
  IUpdateToCart,
} from 'interfaces/cart'
import { ISelectedCart } from 'interfaces/checkout'
import { getReviewCheckout } from 'API/order'
import { IOrder, IReviewCheckout } from 'interfaces/order'

class CartStrores {
  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.selectedCarts = []
  }

  rootStore: RootStore
  listCart = {} as IListCart
  myCarts: ICart[] = []
  reviewCheckout: IReviewCheckout | null = null
  cartCount: number = 0
  selectedCarts: IOrder[]

  setSelectedCart(data: IOrder[]): void {
    this.selectedCarts = data
  }

  unSetSelectedCart(tour: string): void {
    this.selectedCarts = this.selectedCarts.filter((item) => item?.tour !== tour)
  }

  async fetchCartCount(): Promise<void> {
    const { cart } = await getMyCarts()
    this.cartCount = cart?.tours?.length
    this.listCart = cart
  }

  async addToCart(data: IAddToCart): Promise<void> {
    const { cart } = await addToCart(data)
    this.listCart = cart
  }

  async fetchMyCarts(): Promise<void> {
    const response = await getMyCarts()
    this.myCarts = response
  }

  async fetchReviewCheckout(payload: IOrder[]): Promise<void> {
    const response = await getReviewCheckout(payload)
    this.reviewCheckout = response
  }

  async updateCart(data: IUpdateToCart): Promise<void> {
    const { updatedCart } = await updateCart(data)
    this.listCart = updatedCart
  }

  async deleteCart(data: IDeleteCart): Promise<void> {
    const { cart } = await deleteCart(data)
    this.listCart = cart
  }
}

export default CartStrores
