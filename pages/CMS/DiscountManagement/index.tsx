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
import dayjs from 'dayjs'
import DiscountForm from './DiscountForm'


const DiscountManagement = () => {
  const { discountStore } = useStores()
  const { discounts,  } = discountStore
  const [isValid, setIsValid] = useState<boolean>(true)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [isShowForm, setIsShowForm] = useState<boolean>(false)
  const [selectedDiscountId, setSelectedDiscountId] = useState<string>('')
  
  const router = useRouter()

  const pagination: IPagination = {
    pageIndex, 
    tableLength: 10, 
    gotoPage: setPageIndex
  }

  const dataInTable = getValidArray(discounts).map(discount => {
    return {
      ...discount,
      startDate: dayjs(discount?.startDate).format('DD/MM/YYYY'),
      endDate: dayjs(discount?.endDate).format('DD/MM/YYYY'),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon
            iconName="edit.svg"
            size={32}
            onClick={() => {
              setIsShowForm(true)
              setSelectedDiscountId(discount?._id ?? '')
            }}
          />
        </HStack>
      )
    }
  })

  useEffect(() => {
    if (isValid) {
      discountStore.fetchValidDiscounts()
    } else {
      discountStore.fetchExpiredDiscounts()
    }
  }, [isValid])
  
  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack spacing={4} marginBottom={6} justify="space-between">
        <HStack spacing={0}>
          <Button
            width="120px"
            color={isValid ? 'white' : 'black'}
            background={isValid ? 'teal' : 'gray.200'}
            _hover={{ background: isValid ? 'teal' : 'gray.300' }}
            borderRightRadius={0}
            onClick={() => setIsValid(true)}
          >
            Valid
          </Button>
          <Button
            width="120px"
            color={isValid ? 'black' : 'white'}
            background={isValid ? 'gray.200' : 'teal'}
            _hover={{ background: isValid ? 'gray.300' : 'teal' }}
            borderLeftRadius={0}
            onClick={() => setIsValid(false)}
          >
            Expired
          </Button>
        </HStack>
        <Button colorScheme="teal" onClick={() => setSelectedDiscountId('')}>
          Tạo khuyến mãi
        </Button>
      </HStack>
      <Table
        headerList={getHeaderList()}
        tableData={dataInTable}
        pagination={pagination}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isManualSort
      />
      <DiscountForm isOpen={isShowForm} onClose={() => setIsShowForm(false)} discountId={selectedDiscountId} />
    </Box>
  )
}

export default observer(DiscountManagement)
