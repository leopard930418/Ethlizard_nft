import Web3Modal from 'web3modal'
import WalletConnectProvider  from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
 
 //  Create WalletConnect Provider
 const providerOptions = {
    /* See Provider Options Section */
    // Example with injected providers
    injected: {
      display: {
        name: "MetaMask",
      },
      package: null
    },
    // Example with WalletConnect provider
    walletconnect: {
      package: WalletConnectProvider , // required
      options: {
        infuraId: "a6f8437631884f188a87dd2f9c8da2a8", // required
      }
    },
    coinbasewallet: {
      display: {
        name: "Coinbase"
      },
      package: CoinbaseWalletSDK,
      options: {
          appName: "Web3 Modal Demo",
          infuraId: "https://rinkeby.infura.io/v3/a6f8437631884f188a87dd2f9c8da2a8"
      }
    }
  };

  let web3Modal
  if (typeof window !== 'undefined')
    web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        // network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
  });


  export default web3Modal