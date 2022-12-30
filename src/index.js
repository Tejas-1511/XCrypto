import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider,theme } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*React.StrictMode mounts every component twice in development mode. But when app is in deployment mode it is of no use as
   component is mounted only once*/
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
export const server='https://api.coingecko.com/api/v3'; //obtained from coingecko website
