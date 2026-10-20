'use client'

import { useCallback, useEffect, useState } from 'react'

import {
  clearDerivToken,
  getStoredDerivToken,
  readDerivTokenFromSearch,
  saveDerivToken,
} from '@/lib/deriv-oauth'

const DERIV_WS_URL = 'wss://ws.derivws.com/websockets/v3?app_id=1089'

export type DerivAccount = {
  loginid: string
  currency: string
  balance: number
  isVirtual: boolean
  fullname: string
}

export type DerivTrade = {
  id: number
  time: string
  label: string
  profit: number
}

export type DerivStatus = 'idle' | 'connecting' | 'connected'

type ProfitTableTransaction = {
  transaction_id: number
  contract_id: number
  buy_price: number
  sell_price: number
  sell_time: number
  shortcode?: string
}

const CONTRACT_LABELS: Record<string, string> = {
  DIGITEVEN: 'PAR',
  DIGITODD: 'ÍMPAR',
  DIGITOVER: 'ACIMA',
  DIGITUNDER: 'ABAIXO',
  DIGITMATCH: 'IGUAL',
  DIGITDIFF: 'DIFER',
  CALL: 'SOBE',
  PUT: 'DESCE',
  CALLE: 'SOBE',
  PUTE: 'DESCE',
  MULTUP: 'MULT↑',
  MULTDOWN: 'MULT↓',
  ACCU: 'ACUM',
}

function contractLabel(shortcode?: string) {
  const type = shortcode?.split('_')[0] ?? ''
  return CONTRACT_LABELS[type] ?? (type.slice(0, 5) || '—')
}

function startOfTodayEpoch() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.floor(now.getTime() / 1000)
}

function toTrade(t: ProfitTableTransaction): DerivTrade {
  return {
    id: t.transaction_id,
    time: new Date(t.sell_time * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    label: contractLabel(t.shortcode),
    profit: Number(t.sell_price) - Number(t.buy_price),
  }
}

export function useDeriv() {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<DerivStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [account, setAccount] = useState<DerivAccount | null>(null)
  const [trades, setTrades] = useState<DerivTrade[]>([])

  useEffect(() => {
    const savedToken = getStoredDerivToken() ?? readDerivTokenFromSearch(window.location.search)

    if (savedToken) {
      saveDerivToken(savedToken)
      setToken(savedToken)
    }

    setReady(true)
  }, [])

  useEffect(() => {
    if (!token) return

    let ws: WebSocket | null = null
    let stopped = false
    let pingTimer: ReturnType<typeof setInterval> | undefined
    let retryTimer: ReturnType<typeof setTimeout> | undefined

    const open = () => {
      setStatus('connecting')
      const socket = new WebSocket(DERIV_WS_URL)
      ws = socket

      const send = (payload: Record<string, unknown>) => {
        if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(payload))
      }

      const loadTrades = () =>
        send({
          profit_table: 1,
          description: 1,
          date_from: startOfTodayEpoch(),
          limit: 100,
          sort: 'DESC',
        })

      socket.onopen = () => {
        send({ authorize: token })
        pingTimer = setInterval(() => send({ ping: 1 }), 30000)
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.error) {
          if (data.msg_type === 'authorize') {
            stopped = true
            clearDerivToken()
            setError(`Token inválido: ${data.error.message}`)
            setStatus('idle')
            setToken(null)
            socket.close()
          } else {
            setError(data.error.message)
          }
          return
        }

        switch (data.msg_type) {
          case 'authorize': {
            const a = data.authorize
            setAccount({
              loginid: a.loginid,
              currency: a.currency,
              balance: Number(a.balance),
              isVirtual: Boolean(a.is_virtual),
              fullname: a.fullname ?? '',
            })
            setStatus('connected')
            setError(null)
            send({ balance: 1, subscribe: 1 })
            send({ transaction: 1, subscribe: 1 })
            loadTrades()
            break
          }
          case 'balance':
            setAccount((prev) => (prev ? { ...prev, balance: Number(data.balance.balance) } : prev))
            break
          case 'transaction':
            if (data.transaction?.action === 'sell') loadTrades()
            break
          case 'profit_table':
            setTrades((data.profit_table?.transactions ?? []).map(toTrade))
            break
        }
      }

      socket.onclose = () => {
        clearInterval(pingTimer)
        if (!stopped) {
          setStatus('connecting')
          retryTimer = setTimeout(open, 3000)
        }
      }
    }

    open()

    return () => {
      stopped = true
      clearInterval(pingTimer)
      clearTimeout(retryTimer)
      ws?.close()
    }
  }, [token])

  const connect = useCallback((value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    saveDerivToken(trimmed)
    setError(null)
    setToken(trimmed)
  }, [])

  const disconnect = useCallback(() => {
    clearDerivToken()
    setToken(null)
    setAccount(null)
    setTrades([])
    setStatus('idle')
  }, [])

  return { ready, token, status, error, account, trades, connect, disconnect }
}
