import { Alert, AlertIcon, Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react'
import { Charts } from './Charts'
import { Loader } from './Loader'
import { Params, useParams } from 'react-router-dom'
import { server } from '../index'
import axios from 'axios'

export const CoinDetails = () => {

  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState('inr')
  const [days, setDays] = useState('24h') /*even though we normally send time in number,24h is string because documentation identifies
  string as number....similarly 1 year=1y*/
  const [chartArray, setChartArray] = useState([])

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';
  const btns = ['24h', '7d', '14d', '30d', '60d', '100d', '1y', 'max'];
  const switchChartStats = (key) => {
    switch (key) {
      case '7d':
        setDays('7d')
        setLoading(true)
        break;
      case '14d':
        setDays('14d')
        setLoading(true)
        break;
      case '30d':
        setDays('30d')
        setLoading(true)
        break;
      case '60d':
        setDays('60d')
        setLoading(true)
        break;
      case '100d':
        setDays('100d')
        setLoading(true)
        break;
      case '1y':
        setDays('365d')
        setLoading(true)
        break;
      case 'max':
        setDays('max')
        setLoading(true)
        break;

      default:
        setDays('24h')
        setLoading(true)
        break;
    }
  }

  const params = useParams()

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setCoin(data)
        setLoading(false)
        setChartArray(chartData.prices)
        //const {data:chartData} means data term is already  used so we change the term as chartData  
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchCoin();
  }, [params.id, currency, days])
  
  if (error) {
    return (
      <Alert justifyContent={'center'} position={'fixed'} status={'error'} top={'40'} left={'50%'} transform={'translateX(-50%)'} w={'container.lg'}>
        <AlertIcon />
        <p>'Some Error has Occured'</p>
      </Alert>
    )
  }
  return (
    <Container maxW={'container.lg'}>
      {loading ? <Loader /> : (
        <>
          <Box w={'full'} borderWidth={'1'}>
            <Charts arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={'4'} overflowX={'auto'}>
            {
              btns.map((i) => (
                <Button key={i} onClick={() => switchChartStats(i)}>{i}</Button>
              ))
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value='inr'>₹ (INR)</Radio>
              <Radio value='usd'>$ (USD)</Radio>
              <Radio value='eur'>€ (EUR)</Radio>
            </HStack>
            {/* Date().split('G')[0] means dividing whole output in 2 parts,1 before letter G and 2nd part after G and
             then we display only 0th index....this is case sensitive*/}
          </RadioGroup>
          <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
            <Text fontSize={'small'} opacity={'0.7'} alignSelf={'center'}>
              Last Updated on {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>
            <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />
            <Box w={'full'} p={'4'} >
              <Item title={'Max Supply'} value={coin.market_data.max_supply} />
              <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
              <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
              <Item title={'All time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              <Item title={'All time High'} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} spacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress value={'50'} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'} >
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'sm'} >24 Hour range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)
