"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import {mainnet, scrollSepolia, sepolia} from '@wagmi/core/chains'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from 'react'

// 1. Setup queryClient (for Wagmi)
const queryClient = new QueryClient();

// 2. Define your chains
const chains = [mainnet, scrollSepolia] as const;

// 3. Create Wagmi config
const wagmiConfig = defaultWagmiConfig({
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains,
    metadata: {
        name: "My Donation DApp",
        description: "A decentralized donation platform",
        url: "https://mydapp.com",
        icons: ["https://mydapp.com/logo.png"],
    },
});
