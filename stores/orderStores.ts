import { getOrderDetailForSeller, getOrdersForSeller} from 'API/order'
import { IOrder } from 'interfaces/order'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class OrderStore {
  rootStore: RootStore
  orders: IOrder[] = []
  orderDetail: IOrder | null = null

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async fetchOrdersForSeller(status: string): Promise<void> {
    const orders = await getOrdersForSeller(status)
    this.orders = orders
  }

  async fetchOrderDetailForSeller(id: string): Promise<void> {
    const order = await getOrderDetailForSeller(id)
    this.orderDetail = order
  }
}

export default OrderStore
