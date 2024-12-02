import { Box, Center, Heading, VStack } from '@chakra-ui/react'
import NavLink from './NavLink'
import routes from 'routes'

const SideBar = () => {
  return (
    <Box minWidth="320px" height="100vh" background="teal.900" position="fixed" zIndex={1000}>
      <Center height="72px" borderBottom="1px" borderBottomColor="whiteAlpha.300">
        <Heading color="white" fontSize="2xl">TRAVEL BOOKING</Heading>
      </Center>
      <VStack width="full" align="unset" paddingY={6} paddingX={4} spacing={4}>
        <NavLink
          label="Shop Management"
          icon=""
          route={routes.cms.bookingManagement.value}
        />
        <NavLink
          label="My Shop"
          icon=""
          route={routes.cms.myShop.value}
        />
        <NavLink
          label="Product Management"
          icon=""
          route={routes.cms.productManagement.value}
        />
        <NavLink
          label="Account Management"
          icon=""
          route={routes.cms.accountManagement.value}
        />
        <NavLink
          label="Review Management"
          icon=""
          route={routes.cms.reviewManagement.value}
        />
        <NavLink
          label="General Settings"
          icon=""
          route={routes.cms.generalSettings.value}
        />
      </VStack>
    </Box>
  )
}

export default SideBar
