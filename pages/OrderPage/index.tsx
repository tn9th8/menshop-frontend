"use client"
import { Button, Center, HStack, Img, Tag, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation" 
import PageLayout from "components/Layout/WebLayout/PageLayout"
import routes from "routes"
import { useStores } from "hooks"
import { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { formatCurrency, getProductImageUrl, getValidArray } from "utils/common"
import { toast } from "react-toastify"
import { cancelOrder, getReviewCheckout } from "API/order"

const statusTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ lấy hàng' },
  { value: 'shipping', label: 'Đang giao hàng' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
]

function getStatusLabel(status: string) {
  const statusTab = statusTabs.find(tab => tab?.value === status)
  return statusTab?.label?.toUpperCase()
}

const OrderPage = () => {
  const { cartStore } = useStores() 
  const { myOrders } = cartStore
  const [status, setStatus] = useState<string>('all')

  const router = useRouter()

  async function handleCancelOrder(orderId: string) {
    await cancelOrder(orderId)
    setStatus('cancelled')
    toast.success('Đã hủy đơn hàng')
  }

  useEffect(() => {
    cartStore.fetchMyOrders(status)
  }, [status])

  return (
    <PageLayout>
      <VStack
        maxWidth="1300px"
        minHeight="100vh"
        marginTop="48px"
        width="full"
        height="full"
        align="flex-start"
        padding="8px 20px"
        spacing={8}
      >
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
        {getValidArray(myOrders)?.map(myOrder => (
          <VStack
            key={myOrder?._id}
            width="full"
            align="flex-start"
            padding={8}
            borderRadius={8}
            background="white"
            boxShadow="md"
            spacing={4}
          >
            <HStack width="full" justify="space-between">
              <Tag size="lg" color="white" background="teal.500">
                {myOrder?.shop}
              </Tag>
              <Text color="teal.500" fontWeight={600}>
                {getStatusLabel(myOrder?.status)}
              </Text>
            </HStack>
            <VStack width="full" spacing={6}>
              {getValidArray(myOrder?.productItems).map((productItem: any) => (
                <HStack key={productItem?.cartProductItem} width="full" justify="space-between">
                  <HStack width="full" spacing={8}>
                    <Img boxSize="100px" borderRadius={6} src={getProductImageUrl(productItem?.product?.thumb)} />
                    <VStack width="full" align="flex-start">
                      <Text width="700px" fontSize="xl" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {productItem?.product?.name}
                      </Text>
                      <Text fontSize="sm">
                        Loại: {productItem?.variant}
                      </Text>
                      <Text fontSize="sm">
                        Số lượng: {productItem?.quantity}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text width="150px" textAlign="end">
                    {formatCurrency(productItem?.product?.price)}
                  </Text>
                </HStack>
              ))}
            </VStack>
            <VStack width="full" align="flex-end" spacing={4}>
              <HStack width="full" justify="flex-end">
                <Text>
                  Thành tiền:
                </Text>
                <Text fontSize="2xl" fontWeight={600} color="teal.500">
                  {formatCurrency(myOrder?.checkout?.totalCheckout)}
                </Text>
              </HStack>
              {myOrder?.status === 'pending' && (
                <Button border="1px solid #E2E8F0" background="white" onClick={() => handleCancelOrder(myOrder?._id)}>
                  Hủy đơn hàng
                </Button>
              )}
            </VStack>
          </VStack>
        ))}
      </VStack>
    </PageLayout>
  )
}

export default observer(OrderPage)
