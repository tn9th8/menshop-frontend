import { Box, Button, HStack, Img, Text, VStack, Stack, Link } from "@chakra-ui/react"
import Icon from "components/Icon"
import { border } from "themes/globalStyles"
import { IProduct } from "interfaces/product"
import { formatCurrency, getProductImageUrl } from "utils/common"
import { observer } from "mobx-react"

interface IProductCard {
  product: IProduct
}

const ProductCard = (props: IProductCard) => {
  const { product } = props

  return (
    <Link href={`/product-detail/${product._id}`} _hover={{ textDecoration: "none" }}>
      <Box
        position='relative'
        border={border}
        height="380px"
        width="288px"
        borderRadius={8}
        boxShadow="md"
        cursor="pointer"
        borderBlock="1px solid #dcdfe4"
        overflow="hidden"
        role="group"
        _hover={{
          "& img": {
            transform: "scale(1.2)",
          },
        }}
      >
        <Box width="full" height="260px" overflow="hidden">
          <Img
            width="full"
            height="260px"
            src={getProductImageUrl(product?.thumb)}
            objectFit="cover"
            borderTopRadius={8}
            transition="transform .5s ease"
          />
        </Box>
        <VStack height="120px" align="flex-start" justify="space-around" padding={3}>
          <Text fontSize="sm" fontWeight={700} lineHeight={1} _hover={{ color: 'teal.500' }}>
            {product?.name}
          </Text>
          <Text fontSize="lg" fontWeight="600" color="gray.800">
            {formatCurrency(product?.price ?? 0)}
          </Text>
        </VStack>
      </Box>
    </Link>
  )
}

export default observer(ProductCard)
