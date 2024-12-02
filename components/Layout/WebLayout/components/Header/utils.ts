import { IOption } from 'components/Dropdown'
import { ICategory } from 'interfaces/category'
import { getValidArray } from 'utils/common'

export function getCategoryOptions(categories: ICategory[]): IOption[] {
  return [
    {
      label: 'Tất cả sản phẩm',
      value: 'all'
    },
    ...getValidArray(categories).map((category: ICategory) => ({
      label: category?.name ?? '',
      value: category?._id ?? ''
    }))
  ]
}