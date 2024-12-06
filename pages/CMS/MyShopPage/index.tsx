'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Box, Button, HStack, Img, SimpleGrid, Text, Textarea, VStack } from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { IShop } from 'interfaces/shop'
import { observer } from 'mobx-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'
import { getShopImageUrl } from 'utils/common'
import { updateMyShop } from 'API/shop'

const MyShopPage = () => {
  const { userStore, shopStore } = useStores()
  const { myShop } = shopStore
  const { userDetail } = userStore
  const router = useRouter()
  const pathname = usePathname()
  const fileInputRef = useRef<any>(null)
  const userId = pathname?.split('/').pop() ?? ''
  const methods = useForm()
  const { control, handleSubmit, reset, register, setValue } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false)

  function backToAccountList() {
    router.push(routes.cms.accountManagement.value)
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    setIsImageLoading(true)
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try { 
      // const formData = new FormData()
      // formData.append('profilePicture', event.target.files[0])
      // const { profilePictureURL } = await uploadUserImage(userId, formData)
      // setValue('profilePicture', profilePictureURL)
    } catch (error) {
      setIsImageLoading(false)
      toast.error('Upload failed')
    } finally {
      setIsImageLoading(false)
    }
  }

  async function onSubmit(data: any) {
    console.log(data)
    setIsLoading(true)
    try {
      const payload: any = {
        id: myShop?._id,
        name: data?.name,
        description: data?.description,
        // seller: {
        //   email: data?.seller?.email,
        //   phone: data?.seller?.phone,
        //   name: data?.seller?.name,
        // },
      }
      await updateMyShop(payload)
      await shopStore.fetchMyShop()
      toast.success('Câp nhật thông tin thành công')
    } catch (error) {
      setIsLoading(false)
      toast.error('Cập nhật thông tin thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    shopStore.fetchMyShop()
  }, [])

  useEffect(() => {
    if (myShop?._id) {
      reset({
        ...myShop,
        status: myShop?.isActive ? 'Active' : 'Disable',
      })
    }
  }, [myShop])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack width="full" justify="flex-end" marginBottom={6}>
            <HStack spacing={4}>
              <Button type="submit" colorScheme="teal" variant="solid" paddingX={4} isLoading={isLoading}>
                Save
              </Button>
            </HStack>
          </HStack>
          <HStack width="full" align="flex-start" spacing={8}>
            <Box width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
              <SimpleGrid maxWidth="1200px" columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="name" label="Tên cửa hàng" />
                <FormInput name="seller.name" label="Chủ cửa hàng" />
                <FormInput name="seller.email" label="Email" />
                <FormInput name="seller.phone" label="Số điện thoại" />
              </SimpleGrid>
              <SimpleGrid maxWidth="1200px" columns={1} marginTop={6}>
                <FormInput name="" label="Mô tả">
                  <Textarea {...register('description')} focusBorderColor="teal.500" />
                </FormInput>
              </SimpleGrid>
            </Box>
            <VStack maxWidth={300} width="full" spacing={6}>
              <VStack 
                width="full" 
                background="white"
                padding={8}
                borderRadius={8}
                borderWidth={1}
                boxShadow="sm"
                spacing={6}
              >
                <Img src={getShopImageUrl(myShop?.image)} borderRadius={8} borderWidth={1} />
                <Button
                  width="full"
                  background="white"
                  borderWidth={1}
                  isLoading={isImageLoading}
                  onClick={() => fileInputRef?.current?.click()}
                >
                  Change Image
                </Button>
                <input type="file" ref={fileInputRef} onChange={uploadImage} style={{ display: 'none' }} />
              </VStack>
            </VStack>
          </HStack>
        </form>
      </FormProvider>
    </Box>
  )
}

export default observer(MyShopPage)
