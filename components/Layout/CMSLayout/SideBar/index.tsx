import { Box, Center, Heading, VStack } from '@chakra-ui/react'
import NavLink from './NavLink'
import routes from 'routes'

const SideBar = () => {
  return (
    <Box minWidth="320px" height="100vh" background="teal.900" position="fixed" zIndex={1000}>
      <Center height="72px" borderBottom="1px" borderBottomColor="whiteAlpha.300">
        <Heading color="white" fontSize="2xl">MEN SHOP</Heading>
      </Center>
      <VStack width="full" align="unset" paddingY={6} paddingX={4} spacing={4}>
        <NavLink
          label="Quản lý đơn hàng"
          icon=""
          route={routes.cms.orderManagement.value}
        />
        <NavLink
          label=" Quản lý sản phẩm"
          icon=""
          route={routes.cms.productManagement.value}
        />
        <NavLink
          label="Quản lý khuyến mãi"
          icon=""
          route={routes.cms.discountManagement.value}
        />
        <NavLink
          label="Quản lý cửa hàng"
          icon=""
          route={routes.cms.myShop.value}
        />
      </VStack>
    </Box>
  )
}

export default SideBar
