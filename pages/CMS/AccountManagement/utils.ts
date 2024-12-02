import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: '',
      accessor: 'avatar',
    },
    {
      Header: 'FULL NAME',
      accessor: 'name',
    },
    {
      Header: 'EMAIL',
      accessor: 'email',
    },
    {
      Header: 'PHONE NUMBER',
      accessor: 'phone',
    },
    {
      Header: 'ROLE',
      accessor: 'role',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    },
    {
      Header: '',
      accessor: 'actions',
    }
  ]
}