import { ITableHeader } from 'components/Table'

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
      Header: 'RATING',
      accessor: 'ratingStar',
    },
    {
      Header: 'VIEW',
      accessor: 'views',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ]
}
