import { ITableHeader } from 'components/Table'

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
