import { Alert, AlertIcon, Button, Container, Heading, HStack, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { server } from '../index'
import { Loader } from './Loader';

export const Coins = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState('inr')

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }
  const btns = new Array(132).fill(1); //length of array=132

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`) // ` is used and not ' //? in api means query/condition 
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchCoins();
  }, [currency, page])

  if (error) {
    return (
      <Alert position={'fixed'} status={'error'} top={'40'} left={'50%'} transform={'translateX(-50%)'} w={'container.lg'}>
        <AlertIcon />
        <p>'Some Error has Occured'</p>
      </Alert>
    )
  }
  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value='inr'>₹ (INR)</Radio>
              <Radio value='usd'>$ (USD)</Radio>
              <Radio value='eur'>€ (EUR)</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              coins.map((i) => (
                <CoinCard key={i.id} price={i.current_price} id={i.id} name={i.name} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} />
              ))
            }
          </HStack>
          <HStack w={'full'} overflow={'auto'} p={'8'}>
            {btns.map((item, index) => (
              <Button backgroundColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)} key={index + 1}>{index + 1}</Button>
            ))
            }
          </HStack>
        </>
      )}
    </Container>
  )
}
//noOfLines={1} means if string overflow given width then remaining part represented by ...
//target={'blank'} opens only one tab no matter how many different links you click 
const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  <>
    <Link to={`/coins/${id}`}>
      <VStack w={52} p={8} shadow={'lg'} m={4} borderRadius={'lg'} transition={'all 0.3s'} css={{
        '&:hover': {
          transform: 'scale(1.1)'
        }
      }}>
        <img src={img} w={'10'} h={'10'} objectfit={'contain'} alt='person' />
        <Heading size={'md'} noOfLines={1}>{symbol}</Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </VStack>
    </Link>
  </>
)
