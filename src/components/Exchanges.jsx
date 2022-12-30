import { Alert, AlertIcon, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { server } from '../index'
import { Loader } from './Loader';

export const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchexchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`)  // ` is used and not ' 
        setExchanges(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchexchanges();
  }, [])

  if (error) {
    return (
    <Alert position={'fixed'} status={'error'} top={'40'} left={'50%'} transform={'translateX(-50%)'} w={'container.lg'}>
     <AlertIcon/>
     <p>'Some Error has Occured'</p>
    </Alert>
  )}
  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> : (
        <>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              exchanges.map((i) => (
                <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
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
const ExchangeCard = ({ name, img, rank, url }) => (
  <>
    <a href={url} target={'blank'}>
      <VStack w={52} p={8} shadow={'lg'} m={4} borderRadius={'lg'} transition={'all 0.3s'} css={{
        '&:hover': {
          transform: 'scale(1.1)'
        }
      }}>
        <img src={img} w={'10'} h={'10'} objectfit={'contain'} alt='person' />
        <Heading size={'md'} noOfLines={1}>{rank}</Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  </>
)
