import React from 'react';
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import {
  // mainnet,
  polygon,
  // optimism,
  // arbitrum,
  zkSync,
  bscTestnet,
  // bsc,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from './utils/networks';

const { chains, publicClient } = configureChains(
  // [bsc, mainnet, optimism, arbitrum],
  [bscTestnet, polygonMumbai],
  [
    // alchemyProvider({ apiKey: 'ZbcJUctTzRg0qySTHx0jmolpmxP-5V3g' }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'youbuidlAdmin',
  projectId: 'f8cdf9510d5c0964ea87d2919b02da10',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

createRoot(document.getElementById('root')).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <App/>
    </RainbowKitProvider>
  </WagmiConfig>
);

