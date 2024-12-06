export function getHeaderList() {
  return [
    {
      Header: 'CODE',
      accessor: 'code',
    },
    {
      Header: 'Tên khuyến mãi',
      accessor: 'name',
    },
    {
      Header: 'Áp dụng',
      accessor: 'applyTo',
    },
    {
      Header: 'Ngày bắt đầu',
      accessor: 'startDate',
    },
    {
      Header: 'Ngày kết thúc',
      accessor: 'endDate',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ]
}
