import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icon.png" />
        <title>Crowdfunding-Dapp</title>
      </Head>
      <ThirdwebProvider activeChain={ChainId.Mumbai}>
        {" "}
        <StateContextProvider>
          {" "}
          <Component {...pageProps} />
        </StateContextProvider>
      </ThirdwebProvider>
    </>
  );
}
