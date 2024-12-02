import { getAllShops, getMyShop } from 'API/shop'
import { IShop } from 'interfaces/shop'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class ShopStore {
  rootStore: RootStore
  shops: IShop[] = []
  myShop: IShop | null = null

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async fetchAllShops(): Promise<void> {
    const shops = await getAllShops()
    this.shops = shops
    // this.totalCount = total
  }

  async fetchMyShop(): Promise<void> {
    const shop = await getMyShop()
    this.myShop = shop
  }
}

export default ShopStore
