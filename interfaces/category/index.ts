export interface ICategory {
  _id?: string
  name?: string
  image?: string
  icon?: string
  isActive?: boolean
  children?: {
    _id: string
    name: string
    level: string
  }[]
}

export interface ICategoryPagination {
  result: number
  categories: ICategory[]
}
