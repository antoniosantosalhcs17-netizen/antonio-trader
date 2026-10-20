'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { readDerivTokenFromSearch, saveDerivToken, validateDerivOAuthState } from '@/lib/deriv-oauth'

export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('Finalizando login...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const state = searchParams.get('state')
    const token = readDerivTokenFromSearch(window.location.search)

    if (!validateDerivOAuthState(state)) {
      setError('O estado da autenticação não foi validado. Tente entrar novamente.')
      setMessage('Falha na validação do OAuth.')
      return
    }

    if (!token) {
      setError('Nenhum token de acesso foi retornado pela Deriv.')
      setMessage('Login cancelado ou sem autorização.')
      return
    }

    saveDerivToken(token)
    setMessage('Login concluído com sucesso!')

    window.setTimeout(() => router.replace('/'), 600)
  }, [router, searchParams])

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#05070d] px-6 text-center text-white">
      <div className="max-w-md rounded-3xl border border-cyan-300/30 bg-[#0a0d16]/80 p-8 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Deriv OAuth</p>
        <h1 className="mt-4 text-2xl font-bold text-white">{message}</h1>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      </div>
    </main>
  )
}
