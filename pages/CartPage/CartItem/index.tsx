import { ChangeEvent, useState } from 'react'
import { Button, Checkbox, HStack, Img, Input, Text, VStack } from '@chakra-ui/react'
import { ICart } from 'interfaces/cart'
import { getProductImageUrl } from 'utils/common'


interface ICartItemProps {
  cartItem: ICart
  selectedCartItems: string[]
  handleSelectCartItem: (cartItems: string) => void
  handleUpdateQuantity: (id: string, quantity: number) => void
  handleDeleteCartItem: (id: string) => void
}

const CartItem = (props: ICartItemProps) => {
  const { cartItem, selectedCartItems = [], handleSelectCartItem, handleUpdateQuantity, handleDeleteCartItem } = props

  const [quantity, setQuantity] = useState<number>(1)

  function handleIncrease(id: string) {
    const productItem = cartItem?.productItems?.find((productItem) => productItem?._id === id)
    if (productItem) {
      handleUpdateQuantity(id, productItem?.quantity + 1)
      setQuantity((prev) => prev + 1)
    }
  }

  function handleDecrease(id: string) {
    const productItem = cartItem?.productItems?.find((productItem) => productItem?._id === id)
    if (productItem) {
      handleUpdateQuantity(id, productItem?.quantity - 1)
      setQuantity((prev) => prev - 1)
    }
  }

  function handleChangeQuantity(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event?.target?.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  }

  return (
    <VStack width="full" align="flex-start" spacing={3}>
      {cartItem?.productItems?.map((productItem) => (
        <HStack
          key={productItem?._id}
          width="full"
          border={selectedCartItems.includes(productItem?._id) ? '3px solid #319795' : '3px solid transparent'}
          borderRadius={6}
          padding={4}
          spacing={4}
        >
          <Checkbox
            size="lg"
            colorScheme="teal"
            borderColor={selectedCartItems.includes(productItem?._id) ? 'teal' : 'gray.400'}
            isChecked={selectedCartItems.includes(productItem?._id)}
            onChange={() => handleSelectCartItem(productItem?._id)}
          />
          <Img boxSize="100px" borderRadius={6} src={getProductImageUrl(productItem?.product?.thumb)} />
          <VStack
            width="full"
            height="full"
            justify="flex-start"
            align="flex-start"
            overflow="hidden"
            paddingRight={4}
          >
            <Text
              width="full"
              color="gray.800"
              fontSize="lg"
              fontWeight={600}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {productItem?.product?.name}
            </Text>
            <HStack width="full" justify="space-between">
              <Text color="gray.500" fontSize="sm">
                Phân loại hàng: {productItem?.variant}
              </Text>
              <HStack spacing={2}>
                <Button size="sm" border="1px solid #CBD5E0" onClick={() => handleDecrease(productItem?._id)} isDisabled={productItem?.quantity <= 1}>
                  -
                </Button>
                <Input
                  size="sm"
                  width={16}
                  border="1px solid #CBD5E0"
                  value={productItem?.quantity}
                  onChange={handleChangeQuantity}
                  textAlign="center"
                  type="number"
                  borderRadius={6}
                />
                <Button size="sm" border="1px solid #CBD5E0" onClick={() => handleIncrease(productItem?._id)}>+</Button>
              </HStack>
            </HStack>
            <Text color="gray.700" fontSize="lg" fontWeight={600}>
              {productItem?.product?.price}đ
            </Text>
          </VStack>
          <Text
            color="red.500"
            fontSize="lg"
            fontWeight={600}
            cursor="pointer"
            onClick={() => handleDeleteCartItem(productItem?._id)}
          >
            Xóa
          </Text>
        </HStack>
      ))}
    </VStack>
  )
}

export default CartItem
