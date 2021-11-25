import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import theme from 'theme';
import { setLocale } from 'yup';

import { ChakraProvider } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

import '@fontsource/barlow';

import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/900.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';

export const errorsLocalize = {
  string: {
    required: 'Is a required field',
    email: 'Must contain a valid email address',
    min: 'Must be at least ${min} characters long',
    max: 'May not be more than ${max} characters long',
    url: 'Must be a valid URL',
  },
  mixed: {
    required: 'Is a required field',
    default: 'Is invalid',
  },
  date: {
    min: 'Must be later than ${min}',
    max: 'Must be at earlier than ${max}',
  },
  array: {
    min: 'Must have at least ${min} items',
    max: 'Must have less than or equal to ${max} items',
  },
};

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const init = async () => {
  setLocale(errorsLocalize);
  const { default: App } = await import('App');
  return (
    <StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ChakraProvider theme={theme} resetCSS>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </ChakraProvider>
      </Web3ReactProvider>
    </StrictMode>
  );
};

export default init;
