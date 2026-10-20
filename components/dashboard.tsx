'use client'

import { AccountBar } from '@/components/account-bar'
import { DerivConnect } from '@/components/deriv-connect'
import { ProfitCard } from '@/components/profit-card'
import { ResultsList } from '@/components/results-list'
import { WinRateCard } from '@/components/win-rate-card'
import { useDeriv } from '@/hooks/use-deriv'

export function Dashboard() {
  const { ready, token, status, error, account, trades, connect, disconnect } = useDeriv()

  if (!ready) return null

  if (!token) {
    return <DerivConnect onConnect={connect} error={error} connecting={status === 'connecting'} />
  }

  const currency = account?.currency || 'USD'
  const profit = trades.reduce((sum, t) => sum + t.profit, 0)
  const wins = trades.filter((t) => t.profit >= 0).length
  const losses = trades.length - wins

  return (
    <>
      <AccountBar account={account} status={status} onDisconnect={disconnect} />
      <ProfitCard profit={profit} balance={account?.balance ?? 0} currency={currency} />
      <WinRateCard wins={wins} losses={losses} />
      <ResultsList trades={trades} currency={currency} />
    </>
  )
}
