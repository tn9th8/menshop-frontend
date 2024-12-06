import { Box, HStack, Img, Link, StackProps } from "@chakra-ui/react"
import Action from "../Actions"
import SearchBarInput from "../SearchBarInput"
import logo from "../../../../public/assets/images/logo.jpg"
import { useStores } from "hooks/useStores"
import { useEffect, useState } from "react"
import { getCategoryOptions } from "./utils"
import { observer } from "mobx-react"
import Dropdown from "components/Dropdown"
import { FormProvider, useForm, useWatch } from "react-hook-form"

interface IHeader extends StackProps {
  openLoginModal: () => void
  background?: string
  bgGradient?: string
  color?: string
  underLineHoverColor?: string
  hoverColor?: string
}

const Header = (props: IHeader) => {
  const {
    openLoginModal,
    background,
    bgGradient,
    color,
    underLineHoverColor,
    hoverColor,
    ...rest
  } = props
  const { categoryStore, productStore } = useStores()
  const { categories } = categoryStore
  const { selectedCategory } = productStore
  const methods = useForm()
  const { control, setValue } = methods
  const categoryValue = useWatch({ control, name: 'categoryValue' })

  useEffect(() => {
    if (categoryValue?.value) {
      productStore.setSelectedCategory(categoryValue?.value)
    }
  }, [categoryValue])

  useEffect(() => {
    categoryStore.fetchCategoriesForClient()
  }, [])

  return (
    <Box
      width="full"
      height="80px"
      paddingX={8}
      paddingTop="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderTop="1px solid"
      background="white"
      // {...(bgGradient
      //   ? { bgGradient: `${bgGradient}` }
      //   : { background: `${background}` })}
      {...rest}
    >
      <FormProvider {...methods}>
        <form>
          <HStack
            maxWidth='1300px'
            justifyContent="space-between"
            alignItems="center"
            alignSelf='center'
            height="100%"
            width="full"
          >
            <HStack spacing={10}>
              <Link href="/" color="teal.500" fontSize="3xl" fontWeight={600}>
                MENSHOP
              </Link>
              <SearchBarInput minHeight="40px" placeholder="Tìm kiếm sản phẩm" />
              <Dropdown
                minWidth="200px"
                name="categoryValue"
                label=""
                placeholder="Theo sản phẩm"
                options={getCategoryOptions(categories)}
                setValue={setValue}
              />
            </HStack>
            <Action
              openLoginModal={openLoginModal}
              color={color}
              hoverColor={hoverColor}
              underLineHoverColor={underLineHoverColor}
            />
          </HStack>
        </form>
      </FormProvider>
    </Box>
  )
}

export default observer(Header)
