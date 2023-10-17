"use client"
import React, {
  useEffect,
  useState
} from 'react';
import {
  initializeConnector
} from '@web3-react/core';
import {
  MetaMask
} from '@web3-react/metamask';
import {
  ethers
} from 'ethers';
import {
  formatEther,
  parseUnits
} from '@ethersproject/units';
import abi from './abi.json';

const [metamask, hooks] = initializeConnector((actions) => new MetaMask({
  actions
}))
const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider
} = hooks
const constractChain = 11155111
const constractAddress = '0xa88160f2Ae70830890359364c8988b67705e4118'

export default function Page() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActive = useIsActive()
  const provider = useProvider()
  const [error, setError] = useState(undefined)

  useEffect(() => {
    void metamask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  const handleConnect = () => {
    metamask.activate()
  }

  const handleDisconnect = () => {
    metamask.resetState()
  }

return (
    <div>
      <p>chainId: { chainId }</p>
      <p>isActive: { isActive.toString() }</p>
      <p>accounts: { accounts ? accounts[0]:''}</p>
      { isActive ?
        <input type='button' onClick={handleConnect} value={'Disconnect'} />
      :
        <input type='button' onClick={handleDisconnect} value={'Connect'} />
      }
    </div>
  )
}