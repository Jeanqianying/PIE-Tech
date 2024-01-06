import '@/styles/globals.css'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  sepolia,
  arbitrum,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';


const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, sepolia, arbitrum],
  [alchemyProvider({ apiKey: 'JNt53zTUm4f3SFVv8OSZ7hacMORc8ePU' }), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'TestDI',
  projectId: 'feafde219f0fe3f8ae8dd05fff7edc3b',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


export default function App({ Component, pageProps }) {
  return (

    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>

  )
  
}



