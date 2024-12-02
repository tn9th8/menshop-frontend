import React from "react"
import { Text, TextProps } from "@chakra-ui/react"

interface ITitle extends TextProps {
    text: string
}

const Title = (props: ITitle) => {
    const {text, ...rest} = props
    return( 
    <Text
    fontSize="2xl"
    color="#007f7b"
    paddingLeft="24px"
    fontWeight="bold"
    {...rest}
      >
        {text}
      </Text>)
}

export default Title