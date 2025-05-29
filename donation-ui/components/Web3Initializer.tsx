'use client'
import { useEffect } from 'react'
import { wagmiConfig, projectId } from '@/config'

export function Web3Initializer() {
    useEffect(() => {
        const init = async () => {
            const { createWeb3Modal } = await import('@web3modal/wagmi/react')
            createWeb3Modal({
                wagmiConfig,
                projectId,
                enableAnalytics: true,
                themeVariables: {
                    '--w3m-font-family': 'Inter, sans-serif',
                    '--w3m-font-size-master': '16px',
                    '--w3m-accent': '#3b82f6'
                }
            })
        }
        init()
    }, [])

    return null
}
