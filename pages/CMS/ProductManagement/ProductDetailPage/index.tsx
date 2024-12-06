'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Box, Button, HStack, Img, SimpleGrid, Text, Textarea, VStack } from '@chakra-ui/react'
import { uploadFiles } from 'API/upload'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks'
import { observer } from 'mobx-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import routes from 'routes'
import { toast } from 'react-toastify'
import { getProductImageUrl } from 'utils/common'
import { updateProduct } from 'API/product'


const ProductDetailPage = () => {
  const { productStore } = useStores()
  const { productDetail } = productStore
  const router = useRouter()
  const pathname = usePathname()
  const imagesRef = useRef<any>(null)
  const thumbRef = useRef<any>(null)
  const productId = pathname?.split('/').pop() ?? ''
  const fileInputRef = useRef<any>(null)
  const userId = pathname?.split('/').pop() ?? ''
  const methods = useForm()
  const { control, handleSubmit, reset, register, setValue } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isThumbLoading, setIsThumbLoading] = useState<boolean>(false)
  const thumb = useWatch({ control, name: 'thumb' }) ?? ''

  function backToProductList() {
    router.push(routes.cms.productManagement.value)
  }

  async function uploadThumbnail(event: ChangeEvent<HTMLInputElement>) {
    setIsThumbLoading(true)
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try { 
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      const thumb: string = await uploadFiles(formData)
      await updateProduct({ id: productId, thumb })
    } catch (error) {
      setIsThumbLoading(false)
      toast.error('Upload thumb failed')
    } finally {
      setIsThumbLoading(false)
    }
  }

  async function onSubmit(data: any) {
    console.log(data)
  }

  useEffect(() => {
    productStore.fetchProductDetailForSeller(productId)
  }, [productId])

  useEffect(() => {
    reset({
      ...productDetail
    })
  }, [productDetail])
  
  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack width="full" justify="flex-end" marginBottom={6}>
            <HStack spacing={4}>
              <Button background="white" borderWidth={1} borderColor="gray.300" isLoading={isLoading} onClick={backToProductList}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid" paddingX={4} isLoading={isLoading}>
                Save
              </Button>
            </HStack>
          </HStack>
          <VStack
            width="full"
            align="flex-start"
            background="white"
            padding={8}
            borderRadius={8}
            borderWidth={1}
            boxShadow="md"
            spacing={8}
          >
            <SimpleGrid width="full" maxWidth="1200px" columns={1} gap={6}>
              <FormInput name="name" label="Tên sản phẩm" />
              <FormInput name="" label="Mô tả">
                <Textarea {...register('description')} focusBorderColor="teal.500" />
              </FormInput>
            </SimpleGrid>
            <SimpleGrid width="full" maxWidth="1200px" columns={2} gap={6}>
              <FormInput name="name" label="Tên sản phẩm" />
            </SimpleGrid>
            <VStack 
              width="full" 
              maxWidth={300}
              align="flex-start"
              background="white"
              padding={8}
              borderRadius={8}
              boxShadow="sm"
              spacing={4}
            >
              <Text color="gray.700" fontWeight={500} lineHeight={6}>
                Thumbnail
              </Text>
              {thumb && <Img width="full" height="180px" src={getProductImageUrl(thumb)} borderRadius={8} />}
              <Button
                width="full"
                borderWidth={1}
                background="white"
                isLoading={isThumbLoading}
                onClick={() => thumbRef?.current?.click()}
              >
                Choose Thumbnail
              </Button>
              <input type="file" ref={thumbRef} onChange={uploadThumbnail} style={{ display: 'none' }} />
            </VStack>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  )
}

export default observer(ProductDetailPage)
