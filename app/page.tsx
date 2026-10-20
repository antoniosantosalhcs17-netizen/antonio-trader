'use client'
import { useEffect, useState } from 'react'
import { Dashboard } from '../components/dashboard'

const APP_ID = 1089 // SEU APP_ID AQUI
const AFFILIATE_TOKEN = "1089" // SEU TOKEN DE AFILIADO AQUI

export default function Page() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t1 = params.get('token1')
    if (t1) {
      localStorage.setItem('deriv_token', t1)
      setToken(t1)
      window.history.replaceState({}, '', '/')
    } else {
      setToken(localStorage.getItem('deriv_token'))
    }
  }, [])

  const conectarDeriv = () => {
    window.location.href = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=pt&brand=deriv`
  }

  const criarConta = () => {
    window.location.href = `https://deriv.com/pt?app_id=${AFFILIATE_TOKEN}`
  }

  if (token) {
    return (
      <main className="min-h-dvh bg-[#07070A] p-5">
        <Dashboard />
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-[#0A0A0F] flex flex-col">
      <header className="p-4 flex justify-between items-center bg-[#13131A]">
        <h1 className="font-bold text-white text-xl">TRADE DOLAR</h1>
      </header>

      <div className="flex-1 p-6 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="bg-[#13131A] border border-white/10 rounded-xl p-6 space-y-6">
          <p className="text-gray-300">
            Todas as transações da plataforma são executadas através da Deriv.
          </p>

          {/* AQUI ESTÃO OS 2 BOTÕES QUE VOCÊ PERGUNTOU */}
          <button 
            onClick={conectarDeriv}
            className="w-full bg-[#2D5BFF] text-white font-bold py-4 rounded-lg"
          >
            Conectar com a conta da DERIV
          </button>

          <button 
            onClick={criarConta}
            className="w-full bg-[#2A2A32] border border-white/10 text-white font-bold py-4 rounded-lg"
          >
            Criar nova conta DERIV
          </button>

        </div>
      </div>
    </main>
  )
}
