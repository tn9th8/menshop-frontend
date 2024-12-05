'use client'
import { ChangeEvent, createElement, forwardRef, useEffect, useRef, useState } from 'react'
import { Box, Button, HStack, Img, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { uploadUserImage } from 'API/upload'
import { updateUser } from 'API/user'
import DateInput from 'components/DateInput'
import FormInput from 'components/FormInput'
import dayjs from 'dayjs'
import { EGender, ERole } from 'enums/user'
import { useStores } from 'hooks/useStores'
import { IShop } from 'interfaces/shop'
import omit from 'lodash/omit'
import { observer } from 'mobx-react'
import { usePathname, useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'
import { PLATFORM } from 'enums/common'
import { getShopImageUrl } from 'utils/common'

interface IUpdateAccountForm extends IShop {
  status: string
}

const MyShopPage = () => {
  const { userStore, shopStore } = useStores()
  const { myShop } = shopStore
  const { userDetail } = userStore
  const router = useRouter()
  const pathname = usePathname()
  const fileInputRef = useRef<any>(null)
  const userId = pathname?.split('/').pop() ?? ''
  const methods = useForm<IUpdateAccountForm>()
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

  async function onSubmit(data: IUpdateAccountForm) {
    setIsLoading(true)
    try {
      // const userData = {
      //   ...omit(data, 'status'),
      //   isActive: data?.status === 'Active'
      // }
      // await updateUser(userId, userData)
      // await userStore.fetchUserDetail(userId, PLATFORM.CMS)
      toast.success('Update account successfully')
    } catch (error) {
      setIsLoading(false)
      toast.error('Update account failed')
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
              <Button background="white" borderWidth={1} borderColor="gray.300" isLoading={isLoading} onClick={backToAccountList}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid" paddingX={4} isLoading={isLoading}>
                Save
              </Button>
            </HStack>
          </HStack>
          <HStack width="full" align="flex-start" spacing={8}>
            <Box width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
              <SimpleGrid maxWidth="1200px" columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="name" label="Tên cửa hàng" />
                <FormInput name="seller.email" label="Email" />
                <FormInput name="seller.phone" label="Số điện thoại" />
                <FormInput name="seller.name" label="Chủ cửa hàng" />
                <FormInput name="description" label="Mô tả" />
                {/* <FormInput name="dateOfBirth" label="Date Of Birth">
                  <DatePicker
                    {...register('dateOfBirth')}
                    selected={dateOfBirth}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date: Date) => setValue('dateOfBirth', dayjs(date).toDate(), { shouldDirty: true })}
                    customInput={createElement(forwardRef(DateInput))}
                  />
                </FormInput> */}
                {/* <FormInput name="passport" label="Passport" />
                <FormInput name="dateOfIssuePassport" label="Date Of Issue Passport">
                  <DatePicker
                    {...register('dateOfIssuePassport')}
                    selected={dateOfIssuePassport}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date: Date) => setValue('dateOfIssuePassport', dayjs(date).toDate(), { shouldDirty: true })}
                    customInput={createElement(forwardRef(DateInput))}
                  />
                </FormInput>
                <FormInput name="dateOfExpirationPassport" label="Date Of Expiration Passport">
                  <DatePicker
                    {...register('dateOfExpirationPassport')}
                    selected={dateOfExpirationPassport}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date: Date) => setValue('dateOfExpirationPassport', dayjs(date).toDate(), { shouldDirty: true })}
                    customInput={createElement(forwardRef(DateInput))}
                  />
                </FormInput> */}
                {/* <FormControl id="role" marginBottom={6}>
                  <FormLabel marginBottom={4} color="gray.700">
                    Account Role
                  </FormLabel>
                  <RadioGroup value={role}>
                    <HStack spacing={2} flexDirection="row" gap="42px">
                      <Radio colorScheme="teal" {...register('role')} value={ERole.ADMIN}>
                        Admin
                      </Radio>
                      <Radio colorScheme="teal" {...register('role')} value={ERole.GUIDE}>
                        Guide
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                <FormControl id="gender" marginBottom={6}>
                  <FormLabel marginBottom={4} color="gray.700">
                    Gender
                  </FormLabel>
                  <RadioGroup value={gender}>
                    <HStack spacing={2} flexDirection="row" gap="42px">
                      <Radio colorScheme="teal" {...register('gender')} value={EGender.MALE}>
                        Male
                      </Radio>
                      <Radio colorScheme="teal" {...register('gender')} value={EGender.FEMALE}>
                        Femail
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl> */}
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
