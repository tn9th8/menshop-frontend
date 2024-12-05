'use client'
import { useEffect, useState } from 'react'
import { Center, Checkbox, HStack, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import { getOrderDetailForSeller, updateOrderStatus } from 'API/order'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table, { IPagination } from 'components/Table'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { formatCurrency, getValidArray } from 'utils/common'
import { statusTabs, getStatusLabel, getHeaderList } from './utils'
import { toast } from 'react-toastify'


const OrderManagement = () => {
  const { orderStore } = useStores()
  const { orders, orderDetail } = orderStore
  const [orderId, setOrderId] = useState<string>('')
  const [status, setStatus] = useState<string>('all')
  const [orderDetailStatus, setOrderDetailStatus] = useState<string>('')
  const [isShowUpdateStatus, setIsShowUpdateStatus] = useState<boolean>(false)
  const router = useRouter()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const pagination: IPagination = { 
    pageIndex, 
    tableLength: 10, 
    gotoPage: setPageIndex
  }

  const dataInTable = getValidArray(orders).map(order => {
    function showUpdateStatusModal(): void {
      setOrderId(order?._id)
      setIsShowUpdateStatus(true)
    }

    return {
      ...order,
      status: getStatusLabel(order?.status),
      totalCheckout: formatCurrency(order?.checkout?.totalCheckout),
      actions: (
        <HStack cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={showUpdateStatusModal} />
        </HStack>
      )
    }
  })

  async function handleUpdateStatus() {
    await updateOrderStatus({ _id: orderId, status: orderDetailStatus })
    await orderStore.fetchOrdersForSeller(status)
    setIsShowUpdateStatus(false)
    toast.success('Cập nhật trạng thái thành công')
  }

  async function fetchOrderDetail() {
    if (orderId) {
      const orderDetail = await getOrderDetailForSeller(orderId)
      setOrderDetailStatus(orderDetail?.status ?? '')
      console.log(orderDetail)
    }
  }

  useEffect(() => {
    orderStore.fetchOrdersForSeller(status)
  }, [status])

  useEffect(() => {
    fetchOrderDetail()
  }, [orderId])
  
  return (
    <VStack paddingX={{ base: 6, lg: 8 }} paddingY={6} spacing={8}>
      <HStack width="full" paddingX={8} borderRadius={8} background="white" boxShadow="md" spacing={4}>
        {statusTabs.map((tab) => (
          <Center
            key={tab?.value}
            height={16}
            padding={4}
            cursor="pointer"
            color={status === tab?.value ? 'teal.500' : 'gray.700'}
            borderBottom={status === tab?.value ? '2px solid ' : 'none'}
            _hover={{ color: 'teal.500', borderBottom: '2px solid', }}
            onClick={() => setStatus(tab?.value)}
          >
            {tab?.label}
          </Center>
        ))}
      </HStack>
      <Table
        headerList={getHeaderList()}
        tableData={dataInTable}
        pagination={pagination}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isManualSort
      />
      <ConfirmModal
        titleText="Cập nhật trạng thái"
        bodyText={
          <VStack width="full" align="flex-start" spacing={4}>
            <Text color="gray.800" fontWeight={500}>
              Trạng thái đơn hàng
            </Text>
            <>
              <VStack width="full" align="flex-start">
                {statusTabs.map(tab => (
                  <Checkbox
                    key={tab?.value}
                    value={tab?.value}
                    isChecked={orderDetailStatus === tab?.value}
                    onChange={event => setOrderDetailStatus(event?.target?.value)}
                  >
                    {tab?.label}
                  </Checkbox>
                ))}
              </VStack>
            </>
          </VStack>
        }
        cancelButtonText="Hủy"
        confirmButtonText="Xác nhận"
        isOpen={isShowUpdateStatus}
        onClose={() => setIsShowUpdateStatus(false)}
        onClickAccept={handleUpdateStatus}
      />
    </VStack>
  )
}

export default observer(OrderManagement)
