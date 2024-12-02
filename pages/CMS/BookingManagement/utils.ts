import { ITableHeader } from 'components/Table'
import { EBookingStatus } from 'enums/booking'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: 'IMAGE',
      accessor: 'image',
    },
    {
      Header: 'NAME',
      accessor: 'name',
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'description',
    },
    {
      Header: 'SELLER',
      accessor: 'seller',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ]
}
