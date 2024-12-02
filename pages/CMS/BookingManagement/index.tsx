'use client'
import { useEffect, useState } from 'react'
import { Box, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table, { IPagination } from 'components/Table'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'
import { useRouter } from 'next/navigation'
import routes from 'routes'

const ShopManagement = () => {
  const { shopStore } = useStores()
  const { shops } = shopStore
  const router = useRouter()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const pagination: IPagination = { 
    pageIndex, 
    tableLength: 10, 
    gotoPage: setPageIndex
  }

  const dataInTable = getValidArray(shops).map(shop => {
    function gotoShopDetailPage(): void {
      // router.push(routes.cms.bookingManagement.detail.value(shop?.id ?? ''))
    }

    return {
      ...shop,
      status: (
        <Tag variant="outline" colorScheme={shop?.isActive ? 'green' : 'red'}>
          <TagLabel>{shop?.isActive ? 'Active' : ''}</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={gotoShopDetailPage} />
        </HStack>
      )
    }
  })

  useEffect(() => {
    shopStore.fetchAllShops()
  }, [pageIndex])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack spacing={4} marginBottom={6}>
        <InputGroup borderRadius="6px" maxWidth="400px" background="white">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.400" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search shop by name"
            // onChange={changeName}
          />
        </InputGroup>
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

export default observer(ShopManagement)
