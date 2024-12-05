export function getHeaderList() {
  return [
    {
      Header: 'CODE',
      accessor: 'code',
    },
    {
      Header: 'NAME',
      accessor: 'name',
    },
    {
      Header: 'TYPE',
      accessor: 'type',
    },
    {
      Header: 'APPLIES TO',
      accessor: 'applyTo',
    },
    {
      Header: 'START DATE',
      accessor: 'startDate',
    },
    {
      Header: 'END DATE',
      accessor: 'endDate',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ]
}
