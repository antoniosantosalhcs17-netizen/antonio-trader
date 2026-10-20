'use client'
import { useState, useEffect } from 'react'

const APP_ID = '01a0dd52-41f4-7a80-bb15-64efc8b1a141'

export default function Page() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token1')
    if (t) {
      localStorage.setItem('deriv_token', t)
      setToken(t)
      window.history.replaceState({}, '', '/')
    } else {
      const salvo = localStorage.getItem('deriv_token')
      if (salvo) setToken(salvo)
    }
  }, [])

  const conectar = () => {
    // LINK CERTO QUE VOLTA PRO SEU APP
    window.location.href = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=pt`
  }

  const criarConta = () => {
    window.location.href = `https://deriv.com/pt?app_id=${APP_ID}`
  }

  if (token) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-2xl font-bold text-green-400">CONECTADO COM SUCESSO!</h1>
        <p className="mt-4 break-all text-sm">Token: {token.slice(0,15)}...</p>
        <button onClick={() => {localStorage.clear(); setToken(null)}} className="mt-6 bg-red-500 px-4 py-2 rounded">Desconectar</button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] flex flex-col">
      <div className="flex-1 p-6 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="bg-[#13131A] border border-white/10 rounded-xl p-6 space-y-4">
          <button onClick={conectar} className="w-full bg-[#2D5BFF] py-4 rounded-lg text-white font-bold">
            Conectar com a conta da DERIV
          </button>
          <button onClick={criarConta} className="w-full bg-[#2A2A32] py-4 rounded-lg text-white font-bold border border-white/10">
            Criar nova conta DERIV
          </button>
        </div>
      </div>
    </main>
  )
}
