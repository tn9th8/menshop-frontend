'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Img } from '@chakra-ui/react'
import Icon from 'components/Icon'
import Table, { IPagination } from 'components/Table'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { getProductImageUrl, getValidArray } from 'utils/common'
import { getHeaderList } from './utils'
import { useRouter } from 'next/navigation'
import routes from 'routes'


const ProductManagement = () => {
  const { productStore } = useStores()
  const { products } = productStore
  const [isPublish, setIsPublish] = useState<boolean>(true)
  const router = useRouter()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const pagination: IPagination = {
    pageIndex, 
    tableLength: 10, 
    gotoPage: setPageIndex
  }

  const dataInTable = getValidArray(products).map(product => {
    function gotoProductDetailPage(): void {
      router.push(routes.cms.productManagement.detail.value(product?._id ?? ''))
    }

    return {
      ...product,
      image: <Img boxSize={10} src={getProductImageUrl(product?.thumb)} borderRadius={8} />,
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={gotoProductDetailPage} />
        </HStack>
      )
    }
  })

  useEffect(() => {
    if (isPublish) {
      productStore.fetchPublishedProducts()
    } else {
      productStore.fetchDraftProducts()
    }
  }, [isPublish])
  
  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack spacing={4} marginBottom={6}>
        <HStack spacing={0}>
          <Button
            width="120px"
            color={isPublish ? 'white' : 'black'}
            background={isPublish ? 'teal' : 'gray.200'}
            _hover={{ background: isPublish ? 'teal' : 'gray.300' }}
            borderRightRadius={0}
            onClick={() => setIsPublish(true)}
          >
            Published
          </Button>
          <Button
            width="120px"
            color={isPublish ? 'black' : 'white'}
            background={isPublish ? 'gray.200' : 'teal'}
            _hover={{ background: isPublish ? 'gray.300' : 'teal' }}
            borderLeftRadius={0}
            onClick={() => setIsPublish(false)}
          >
            Draft
          </Button>
        </HStack>
      </HStack>
      <Table
        headerList={getHeaderList()}
        tableData={dataInTable}
        pagination={pagination}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isManualSort
      />
    </Box>
  )
}

export default observer(ProductManagement)
