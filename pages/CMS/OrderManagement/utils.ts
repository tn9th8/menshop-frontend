import { ITableHeader } from 'components/Table'

export const statusTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ lấy hàng' },
  { value: 'shipping', label: 'Đang giao hàng' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
]

export function getStatusLabel(status: string) {
  const statusTab = statusTabs.find(tab => tab?.value === status)
  return statusTab?.label?.toUpperCase()
}

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: 'KHÁCH HÀNG',
      accessor: 'client.name',
    },
    {
      Header: 'LIÊN HỆ',
      accessor: 'phone',
    },
    {
      Header: 'ĐỊA CHỈ NHẬN HÀNG',
      accessor: 'shipTo',
    },
    {
      Header: 'THANH TOÁN',
      accessor: 'totalCheckout',
    },
    {
      Header: 'TRẠNG THÁI',
      accessor: 'status',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ]
}
