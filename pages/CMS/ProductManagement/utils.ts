import { IOption } from 'components/Dropdown'
import { ITableHeader } from 'components/Table'
import { getValidArray } from 'utils/common'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: '',
      accessor: 'image',
    },
    {
      Header: 'Tên sản phẩm',
      accessor: 'name',
    },
    {
      Header: 'Đánh giá',
      accessor: 'ratingStar',
    },
    {
      Header: 'Số lượt xem',
      accessor: 'views',
    },
    {
      Header: 'Đã bán',
      accessor: 'sold',
    },
    {
      Header: 'Giá tiền',
      accessor: 'price',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ]
}

export function getCategoryOptions(category: any[]): IOption[] {
  return getValidArray(category).map((item) => ({
    label: item.name,
    value: item._id,
  }))
}
