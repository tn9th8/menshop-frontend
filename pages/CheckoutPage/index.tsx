'use client'
import { useEffect, useState, ChangeEvent } from 'react'
import {
  Button,
  HStack,
  Img,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { confirmCheckout } from 'API/order'
import PageLayout from 'components/Layout/WebLayout/PageLayout'
import { useStores } from 'hooks'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import routes from 'routes'
import { formatCurrency, getProductImageUrl, getValidArray } from 'utils/common'

const CheckoutPage = () => {
  const route = useRouter()
  const { cartStore } = useStores()
  const { reviewCheckout } = cartStore

  async function handleCheckout() {
    const storedData = localStorage.getItem('cartData')
    const cartData = storedData ? JSON.parse(storedData) : []
    if (cartData?.length > 0) {
      await confirmCheckout(cartData)
      toast.success('Đặt hàng thành công')
      route.push(routes.myOrder.value)
    } else {
      toast.error('Chưa có sản phẩm nào trong giỏ hàng')
      route.push(routes.cart.value)
    }
  }

  useEffect(() => {
    const storedData = localStorage.getItem('cartData')
    const cartData = storedData ? JSON.parse(storedData) : []
    if (cartData?.length > 0) {
      cartStore.fetchReviewCheckout(cartData)
    } else {
      route.push(routes.cart.value)
    }
  }, [])

  return (
    <PageLayout>
      <VStack
        width="full"
        minHeight="100vh"
        maxWidth="1300px"
        align="flex-start"
        spacing={8}
      >
        <VStack width="full" align="flex-start" padding={8} borderRadius={8} background="white" boxShadow="md">
          <Text width="full" color="gray.800" fontSize="xl" fontWeight={600}>
            Địa chỉ nhận hàng
          </Text>
          <HStack width="full">
            <Text color="gray.800" fontWeight={600}>
              Nguyễn Trung Nhân
            </Text>
            <Text color="gray.800" fontWeight={600}>
              (+84) 123456789
            </Text>
            <Text color="gray.800">
              123 Đường ABC, Phường DEF, Quận Thủ Đức, TP. Hồ Chí Minh
            </Text>
          </HStack>
        </VStack>
        <VStack width="full" align="flex-start" padding={8} borderRadius={8} background="white" boxShadow="md" spacing={8}>
          <Text width="full" color="gray.800" fontSize="xl" fontWeight={600}>
            Sản phẩm
          </Text>
          {getValidArray(reviewCheckout?.newShopOrders).map((shopOrder) => (
            <VStack key={shopOrder?.shop?._id} width="full" align="flex-start" spacing={3}>
              <Tag size="lg" color="teal.500" background="white" border="2px solid" borderColor="teal.500">
                {shopOrder?.shop?.name}
              </Tag>
              <VStack width="full">
                {getValidArray(shopOrder?.productItems).map((productItem: any) => (
                  <HStack key={productItem?.cartProductItem} width="full" spacing={4}>
                    <Img boxSize="40px" borderRadius={6} src={getProductImageUrl(productItem?.product?.thumb)} />
                    <Text width="700px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      {productItem?.product?.name}
                    </Text>
                    <Text width="200px" paddingLeft={8}>
                      Loại: {productItem?.variant}
                    </Text>
                    <Text width="60px" textAlign="center">
                      {productItem?.quantity}
                    </Text>
                    <Text width="150px">
                      {formatCurrency(productItem?.product?.price)}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          ))}
        </VStack>
        <VStack width="full" align="flex-start" padding={8} borderRadius={8} background="white" boxShadow="md">
          <Text width="full" color="gray.800" fontSize="xl" fontWeight={600}>
            Phương thức thanh toán
          </Text>
          <VStack width="full" align="flex-end" spacing={3}>
            <HStack width="400px" justify="space-between">
              <Text>Tổng tiền hàng:</Text>
              <Text>{formatCurrency(reviewCheckout?.checkoutOrder?.totalPrice ?? 0)}</Text>
            </HStack>
            <HStack width="400px" justify="space-between">
              <Text>Giảm giá:</Text>
              <Text>{formatCurrency(reviewCheckout?.checkoutOrder?.totalDiscount ?? 0)}</Text>
            </HStack>
            <HStack width="400px" justify="space-between">
              <Text>Tổng thanh toán:</Text>
              <Text color="red.500" fontSize="2xl">
                {formatCurrency(reviewCheckout?.checkoutOrder?.totalCheckout ?? 0)}
              </Text>
            </HStack>
            <Button colorScheme="teal" size="lg" width="400px" onClick={handleCheckout}>
              Đặt hàng
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </PageLayout>
  )
}

export default observer(CheckoutPage)
