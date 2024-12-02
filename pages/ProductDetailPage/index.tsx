'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { Button, HStack, Img, Input, Text, VStack } from '@chakra-ui/react'
import { addToCart } from 'API/cart'
import PageLayout from 'components/Layout/WebLayout/PageLayout'
import RatingStart from 'components/RatingStart'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { usePathname } from 'next/navigation'
import { getProductImageUrl } from 'utils/common'
import { toast } from 'react-toastify'


const ProductDetailPage = () => {
  const pathname = usePathname()
  const productId = pathname?.split('/').pop() ?? ''
  const { productStore } = useStores()
  const { productDetail } = productStore
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [quantity, setQuantity] = useState<number>(1)
  const [currentImage, setCurrentImage] = useState<string>(productDetail?.thumb ?? '')
  const [selectedVariationFirst, setSelectedVariationFirst] = useState<string>('')
  const [selectedVariationSecond, setSelectedVariationSecond] = useState<string>('')

  function handleIncrease() {
    setQuantity((prev) => prev + 1)
  }

  function handleDecrease() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  function handleChangeQuantity(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event?.target?.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  }

  async function handleAddToCart() {
    if (!productDetail?._id || !productDetail?.shop?._id) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      return
    }
    const data = {
      product: productDetail?._id,
      shop: productDetail?.shop?._id,
      quantity,
      variant: `${selectedVariationFirst}, ${selectedVariationSecond}`,
    }
    await addToCart(data)
    toast.success('Thêm vào giỏ hàng thành công')
  }

  async function fetchData() {
    setIsLoading(true)
    await productStore.fetchProductDetailForClient(productId)
    setIsLoading(false)
  }
  
  useEffect(() => {
    fetchData()
  }, [productId])

  useEffect(() => {
    setSelectedVariationFirst(productDetail?.variationFirst?.options[0] ?? '')
    setSelectedVariationSecond(productDetail?.variationSecond?.options[0] ?? '')
    setCurrentImage(productDetail?.asset?.productImages[0] ?? productDetail?.thumb ?? '')
  }, [productDetail])

  if (isLoading) {
    return <></>
  }

  return (
    <PageLayout>
      <VStack maxWidth="1300px">
        <HStack width="full" align="flex-start" padding={12} spacing={8}>
          <VStack width="50%" align="flex-start" spacing={6}>
            <Img
              height="700px"
              borderRadius={6}
              src={getProductImageUrl(currentImage)}
              alt={productDetail?.name}
            />
            <HStack width="full" wrap="wrap" gap={4} spacing={0}>
              {productDetail?.asset?.productImages?.map((image, index) => (
                <Img
                  key={index}
                  alt={image}
                  src={getProductImageUrl(image)}
                  boxSize="100px"
                  cursor="pointer"
                  borderRadius={6}
                  border={currentImage === image ? '4px solid teal' : '4px solid transparent'}
                  onClick={() => setCurrentImage(image)}
                />
              ))}
            </HStack>
          </VStack>
          <VStack width="50%" align="flex-start">
            <Text color="gray.800" fontSize="3xl" fontWeight={800}>
              {productDetail?.name}
            </Text>
            <RatingStart ratingAverage={productDetail?.ratingStar} />
            <VStack align="flex-start" marginTop={4} spacing={0}>
              <Text color="gray.800" fontSize="2xl" fontWeight={600}>
                {`${productDetail?.price}đ`}
              </Text>
              <Text color="gray.800" fontSize="sm" fontWeight={600} fontStyle="italic">
                Sản phẩm giao hàng từ Hồ Chí Minh
              </Text>
            </VStack>
            <VStack align="flex-start" spacing={1}>
              <Text color="gray.700" fontSize="sm">
                {productDetail?.variationFirst?.name + ':'}
              </Text>
              <HStack>
                {productDetail?.variationFirst?.options.map((option, index) => (
                  <Button 
                    key={index}
                    size="sm"
                    color={option === selectedVariationFirst ? 'white' : 'gray.700'}
                    background={option === selectedVariationFirst ? 'teal.500' : 'gray.300'}
                    _hover={{ opacity: 0.7 }}
                    onClick={() => setSelectedVariationFirst(option)}
                  >
                    {option}
                  </Button>
                ))}
              </HStack>
            </VStack>
            <VStack align="flex-start" spacing={1}>
              <Text color="gray.700" fontSize="sm">
                {productDetail?.variationSecond?.name + ':'}
              </Text>
              <HStack>
                {productDetail?.variationSecond?.options.map((option, index) => (
                  <Button 
                    key={index}
                    size="sm"
                    color={option === selectedVariationSecond ? 'white' : 'gray.700'}
                    background={option === selectedVariationSecond ? 'teal.500' : 'gray.300'}
                    _hover={{ opacity: 0.7 }}
                    onClick={() => setSelectedVariationSecond(option)}
                  >
                    {option}
                  </Button>
                ))}
              </HStack>
            </VStack>
            <VStack align="flex-start" spacing={1}>
              <Text color="gray.700" fontSize="sm">
                Số lượng:
              </Text>
              <HStack spacing={2}>
                <Button size="sm" border="1px solid #CBD5E0" onClick={handleDecrease} isDisabled={quantity <= 1}>
                  -
                </Button>
                <Input
                  size="sm"
                  width={16}
                  value={quantity}
                  border="1px solid #CBD5E0"
                  onChange={handleChangeQuantity}
                  textAlign="center"
                  type="number"
                  borderRadius={6}
                />
                <Button size="sm" border="1px solid #CBD5E0" onClick={handleIncrease}>+</Button>
              </HStack>
            </VStack>
            <VStack align="flex-start" marginTop={4} spacing={1}>
              <Text color="gray.800" fontSize="md" fontWeight={600}>
                Cửa hàng:
              </Text>
              <Text fontSize="sm">- {productDetail?.shop?.name}</Text>
            </VStack>
            <VStack align="flex-start" spacing={1}>
              <Text color="gray.800" fontSize="md" fontWeight={600}>
                Mô tả sản phẩm:
              </Text>
              <Text fontSize="sm">- {productDetail?.description}</Text>
            </VStack>
            <VStack align="flex-start" spacing={1}>
              <Text color="gray.800" fontSize="md" fontWeight={600}>
                Chi tiết sản phẩm:
              </Text>
              <Text color="gray.700" fontSize="sm" lineHeight={6}>
                {productDetail?.attributes.map((attribute, index) => (
                  <Text key={index}>{`- ${attribute.name}: ${attribute.value}`}</Text>
                ))}
              </Text>
            </VStack>
            <Button width="full" borderRadius="24" colorScheme="teal" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </PageLayout>
  )
}

export default observer(ProductDetailPage)
