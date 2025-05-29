"use client";

import React from 'react';
import {createWeb3Modal, useWeb3Modal} from '@web3modal/wagmi/react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { formatEther } from 'viem';
import { ClientOnly } from './ClientOnly';

export function ConnectButton() {
  return (
    <ClientOnly>
      <ConnectButtonInner />
    </ClientOnly>
  );
}

function ConnectButtonInner() {
  // const {  } = createWeb3Modal();
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
    >
      Connect Wallet
    </button>
  );
}

export function NetworkButton() {
  return (
    <ClientOnly>
      <NetworkButtonInner />
    </ClientOnly>
  );
}

function NetworkButtonInner() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  if (!isConnected) {
    return null;
  }

  return (
    <button
      onClick={() => open({ view: 'Networks' })}
      className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md text-sm font-medium"
    >
      Network
    </button>
  );
}

export function WalletBalance() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!address || !balance) {
    return null;
  }

  return (
    <div className="px-4 py-2 border border-gray-200 rounded-md text-sm">
      {parseFloat(formatEther(balance.value)).toFixed(4)} {balance.symbol}
    </div>
  );
}
