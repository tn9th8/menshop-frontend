import { getDraftProducts, getPublishedProducts, getProductByIdForSeller, getProductsForClient, getProductByIdForClient } from 'API/product'
import { IProduct } from 'interfaces/product'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class ProductStore {
  rootStore: RootStore
  products: IProduct[] = []
  productDetail: IProduct | null = null
  productFilter: any = {}
  selectedCategory: string = 'all'
  params: string = ''
  keyword: string = ''

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async fetchPublishedProducts(): Promise<void> {
    const products = await getPublishedProducts()
    this.products = products
  }

  async fetchDraftProducts(): Promise<void> {
    const products = await getDraftProducts()
    this.products = products
  }

  async fetchProductsForClient(): Promise<void> {
    const products = await getProductsForClient(this.params ? `?${this.params}` : '')
    this.products = products
  }

  async fetchProductDetailForSeller(id: string): Promise<void> {
    const product = await getProductByIdForSeller(id)
    this.productDetail = product
  }

  async fetchProductDetailForClient(id: string): Promise<void> {
    const product = await getProductByIdForClient(id)
    this.productDetail = product
  }

  public setSelectedCategory(category: string): void {
    this.selectedCategory = category
  }

  public setProductFilter(filter: any): void {
    this.productFilter = filter
  }

  public setParams(params: string): void {
    this.params = params
  }

  public setKeyword(keyword: string): void {
    this.keyword = keyword
  }
}

export default ProductStore
