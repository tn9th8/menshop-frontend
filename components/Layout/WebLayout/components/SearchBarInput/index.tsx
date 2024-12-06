'use client'
import { useState, useEffect } from 'react'
import * as React from 'react'
import Tippy from '@tippyjs/react/headless'
import { Search2Icon } from '@chakra-ui/icons'
import {
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import routes from 'routes'
import SearchItem from "./SearchItem";
import { useDebounce } from "hooks";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { ISearch, ITour } from "interfaces/tour";

interface ISearchInputProps {
  name?: string
  value?: string
  placeholder?: string
  defaultValue?: string
  minHeight?: string
  minWidth?: string
}

const SearchBarInput = (props: ISearchInputProps) => {
  const { value, placeholder, name, defaultValue, minHeight = '56px' } = props
  const { productStore, tourStore } = useStores()
  const route = useRouter()
  const { suggestions } = tourStore
  const [isShow, setIsShow] = useState<boolean>(true)
  const [searchResult, setSearchResult] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")
  const debounceVal = useDebounce({ value: inputValue, delay: 500 })

  const handleClickOutSide = () => {
    setIsShow(false)
  }

  useEffect(() => {
    if (!debounceVal.trim()) {
      setSearchResult(false)
      return
    }
    productStore.setKeyword(debounceVal)
    setSearchResult(true)
  }, [debounceVal])

  return (
    <HStack
      minWidth="515px"
      minHeight={`${minHeight}`}
      width="full"
      height="full"
      background="#fff"
      borderRadius="8px"
      border="2px solid #dcdfe4"
      justifyContent="space-between"
      padding="0px 8px"
      _focusWithin={{
        borderColor: "#64CCC5",
      }}
    >
      <InputGroup padding="0px 16px">
        <InputLeftElement pointerEvents="none" width="40px" height="40px">
          <Search2Icon color="#1A2B49" boxSize="20px" />
        </InputLeftElement>
        <Input
          value={inputValue}
          placeholder={placeholder}
          paddingLeft={10}
          border="none"
          focusBorderColor="transparent"
          fontSize="lg"
          fontWeight="700"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={() => {
            setIsShow(true)
          }}
        />
      </InputGroup>
    </HStack>
  )
}

export default observer(SearchBarInput)
