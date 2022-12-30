import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <HStack bgColor={'blackAlpha.900'} p={'4'} shadow={'base'} spacing={'45'}>
     <Button color={'white'} variant={'unstyled'}>
      <Link to='/'>Home</Link>
     </Button>
     <Button color={'white'} variant={'unstyled'}>
      <Link to='/exchanges'>Exchanges</Link>
     </Button>
     <Button color={'white'} variant={'unstyled'}>
      <Link to='/coins'>Coins</Link>
     </Button>
    </HStack>
  )
}
