"use client"
import { HStack, VStack, Text, Button, Box, Tag } from "@chakra-ui/react"
import { useRouter } from "next/navigation" 
import PageLayout from "components/Layout/WebLayout/PageLayout"
import routes from "routes"
import CartItem from "./CartItem"
import { useStores } from "hooks"
import { useEffect, useState } from "react"
import { observer } from "mobx-react"
import Title from "components/Title"
import { formatCurrency, getValidArray } from "utils/common"
import { FaShoppingCart } from "react-icons/fa"
import { ICart } from "interfaces/cart"
import { deleteCart, updateQuantity } from "API/cart"
import { toast } from "react-toastify"
import { getReviewCheckout } from "API/order"
import dayjs from "dayjs"

const CartPage = () => {
  const { cartStore, authStore } = useStores() 
  const { listCart, myCarts, reviewCheckout } = cartStore
  const [selectedCartItems, setSelectedCartItems] = useState<string[]>([])

  const router = useRouter()

  async function handleSelectCartItem(cartItem: string) {
    if (selectedCartItems.includes(cartItem)) {
      setSelectedCartItems(selectedCartItems.filter((item) => item !== cartItem))
    } else {
      setSelectedCartItems([...selectedCartItems, cartItem])
    }
  }

  async function fetchReviewCheckout() {
    const payload = getValidArray(myCarts).map((cart) => {
      const seletedProductItems = getValidArray(cart?.productItems).filter(
        productItem => selectedCartItems.includes(productItem?._id)
      )
      return {
        discountCodes: getValidArray(cart?.discounts).map(discount => discount?.code),
        shop: cart?.shop?._id,
        productItems: seletedProductItems?.map(productItem => productItem?._id)
      }
    })
    cartStore.fetchReviewCheckout(payload)

    localStorage.setItem('cartData', JSON.stringify(payload))
  }

  async function handleUpdateQuantity(_id: string, quantity: number) {
    await updateQuantity({ _id, quantity })
    await cartStore.fetchMyCarts()
    await fetchReviewCheckout()
  }

  async function handleDeleteCartItem(id: string) {
    await deleteCart({ productItems: [id] })
    await cartStore.fetchMyCarts()
    toast.success('Xóa sản phẩm thành công')
  }

  useEffect(() => { 
    cartStore.fetchMyCarts()
  }, [])

  useEffect(() => { 
    fetchReviewCheckout()
  }, [selectedCartItems])

  const calculateTotalPrice = () => {
    // let total = 0
    // if (listCart && listCart.tours) {
    //   listCart.tours.forEach((tour) => {
    //     tour.participants.map((participant) => {
    //       total += participant.price * participant.quantity
    //     })
    //   })
    // }
    // setTotalPrice(total)
  }

  useEffect(() => {
    calculateTotalPrice()
  }, [listCart])

  const gotoCheckout = () => {
    router.push(routes.checkout.value)
  }

  return (
    <PageLayout>
      <HStack
        maxWidth="1300px"
        minHeight="700px"
        marginTop="48px"
        width="full"
        height="full"
        align="flex-start"
        padding="8px 20px"
        spacing={10}
      >
        {myCarts?.length !== 0 ? (
          <VStack width="60%" height="full" align="flex-start" spacing={6}>
            <Title text="Giỏ hàng" />
            {myCarts?.map((cartItem: ICart, index: number) => (
              <VStack key={index} width="full" align="flex-start">
                <HStack width="full" spacing={4}>
                  <Tag size="lg" color="teal.500" background="white" border="2px solid" borderColor="teal.500">
                    {cartItem?.shop?.name}
                  </Tag>
                  <HStack hidden={cartItem?.discounts?.length === 0}>
                    <Text>
                      {cartItem?.discounts[0]?.name} đến hết ngày {dayjs(cartItem?.discounts[0]?.endDate).format('DD/MM/YYYY')} cho đơn hàng từ {formatCurrency(cartItem?.discounts[0]?.minPurchaseValue ?? 0)}
                    </Text>
                  </HStack>
                </HStack>
                <CartItem
                  cartItem={cartItem}
                  selectedCartItems={selectedCartItems}
                  handleSelectCartItem={handleSelectCartItem}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleDeleteCartItem={handleDeleteCartItem}
                />
              </VStack>
            ))}
          </VStack>
        ) : (
          <VStack width="full" height="full" align="center">
            <Box color="teal.500" fontSize="9xl">
              <FaShoppingCart />
            </Box>
            <Text fontSize='4xl' fontWeight='bold' color='teal.700'>Your cart is empty</Text>
          </VStack>
        )}

        {myCarts?.length !== 0 && (
          <VStack width="40%" align='flex-start' >
            <Title text="Thanh toán" />
            <VStack
              width="full"
              maxWidth="400px"
              height="fit-content"
              bg="#fff"
              boxShadow="lg"
              padding="12px 20px"
              border="2px solid #ccc"
              borderRadius="8px"
              spacing={3}
            >
              <HStack
                width="full"
                justifyContent="space-between"
                fontSize="lg"
              >
                <Text>Tổng giá tiền:</Text>
                <Text fontWeight="bold">
                  {formatCurrency(reviewCheckout?.checkoutOrder?.totalPrice ?? 0)}
                </Text>
              </HStack>
              <HStack
                width="full"
                justifyContent="space-between"
                fontSize="lg"
              >
                <Text>Giảm giá:</Text>
                <Text fontWeight="bold">
                  {formatCurrency(reviewCheckout?.checkoutOrder?.totalDiscount ?? 0)}
                </Text>
              </HStack>
              <HStack
                width="full"
                justifyContent="space-between"
                fontSize="lg"
              >
                <Text>Tổng thanh toán:</Text>
                <Text fontWeight="bold">
                  {formatCurrency(reviewCheckout?.checkoutOrder?.totalCheckout ?? 0)}
                </Text>
              </HStack>
              <Button
                width="full"
                marginTop="12px"
                padding="23px 18px"
                borderRadius="full"
                colorScheme="teal"
                color="white"
                onClick={gotoCheckout}
              >
                Mua hàng
              </Button>
            </VStack>
          </VStack>
        )}
      </HStack>
    </PageLayout>
  )
}

export default observer(CartPage)
