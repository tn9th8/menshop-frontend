"use client"
import { useEffect, useState } from "react"
import { Box, Button, Checkbox, HStack, SimpleGrid, Text } from "@chakra-ui/react"
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation"
import routes from "routes"
import ProductCard from "components/ProductCard"
import HomeLayout from "components/Layout/WebLayout/HomeLayout"
import { useStores } from "hooks"
import { observer } from "mobx-react"
import Title from "components/Title"
import { PLATFORM } from "enums/common"
import { getValidArray } from "utils/common"

const HomePage = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter()
  const { authStore, categoryStore, productStore } = useStores()
  const { categories } = categoryStore
  const { products, selectedCategory } = productStore
  const [selectedChildren, setSelectedChildren] = useState<string>('')
  const currentCategory = getValidArray(categories).find(category => category?._id === selectedCategory)
  const categoryChildren = getValidArray(currentCategory?.children)

  async function fetchData() {
    let categories = selectedCategory !== 'all' ? selectedCategory : ''
    if (selectedChildren) {
      categories = selectedChildren
    }
    const filter = {
      categories,
      sort: 'relevant'
    }
    const params = new URLSearchParams(filter).toString()
    productStore.setParams(params)
    productStore.fetchProductsForClient()
  }

  useEffect(() => {
    fetchData()
  }, [selectedCategory, selectedChildren])

  useEffect(() => {
    setSelectedChildren('')
  }, [selectedCategory])

  useEffect(() => {
    const userId = searchParams?.get('userId')
    const accessToken = searchParams?.get('accessToken')

    if (userId && accessToken) {
      localStorage.setItem('userId', userId)
      localStorage.setItem('accessToken', accessToken)
    }

    if (userId) {
      authStore.getUserbyId(PLATFORM.WEBSITE)
      route.push('/')
    }
  }, [pathname, searchParams])

  return (
    <HomeLayout>
      <Box
        width='full'
        display='flex'
        justifyContent="center"
        alignItems="center"
        mt="32px"
      >
        <Title 
          maxWidth="1300px"
          width='full' 
          fontSize="2xl"
          fontWeight="600" 
          text="CÁC SẢN PHẨM CỦA MEN SHOP"
        />
      </Box>
      <HStack justify="flex-start" spacing={4}>
        {categoryChildren?.map(children => (
          <HStack key={children?._id}>
            <Checkbox
              size="lg"
              colorScheme="teal"
              isChecked={selectedChildren.includes(children?._id)}
              onChange={() => setSelectedChildren(children?._id)}
            >
              <Text>{children?.name}</Text>
            </Checkbox>
          </HStack>
        ))}
      </HStack>
      <SimpleGrid
        maxWidth="1300px"
        columns={{ base: 1, sm: 2, md: 4 }}
        gap={8}
        padding={1}
        mt="8px"
      >
        {products?.map(product => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </SimpleGrid>
      <Box 
        marginY={4}
        _before={{
          position: "absolute",
          content: "''",
          maxWidth: "600px",
          minWidth: "100px",
          marginLeft: "-600px",
          marginTop: "18px",
          width: "full",
          height: "2px",
          bg: `teal`,
          zIndex: -1,
        }}
        _after={{
          position: "absolute",
          content: "''",
          maxWidth: "600px",
          minWidth: "100px",
          marginTop: "18px",
          marginright: '-120px',
          width: "full",
          height: "2px",
          bg: `teal`,
          zIndex: -1,
        }}
      >
        {/* <Button 
          color='teal' 
          border='2px solid teal' 
          borderRadius='full' 
          bg='transparent' 
          onClick={handleGoToAllActivities}
        >
          Show more
        </Button> */}
      </Box>
    </HomeLayout>
  )
}

export default observer(HomePage)
