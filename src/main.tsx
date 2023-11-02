import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StoreProvider } from './ui/providers/StoreProvider/StoreProvider.tsx';
import { LoadingProvider } from './ui/providers/LoadingProvider/LoadingProvider.tsx';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <LoadingProvider>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </LoadingProvider>
    </StoreProvider>
);
