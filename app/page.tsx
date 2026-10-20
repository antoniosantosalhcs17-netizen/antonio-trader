'use client'
import { useEffect, useState } from 'react'
import { Dashboard } from '../components/dashboard'

const APP_ID = 1089 // TROCA AQUI PELO SEU APP_ID
const AFFILIATE_LINK = "https://deriv.com/signup?affiliate_token=SEU_TOKEN" // troca se tiver

export default function Page() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Pega o token quando volta da Deriv
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token1')
    if (t) {
      localStorage.setItem('deriv_token', t)
      setToken(t)
      // limpa a URL
      window.history.replaceState({}, '', '/')
    } else {
      setToken(localStorage.getItem('deriv_token'))
    }
  }, [])

  const conectarDeriv = () => {
    const redirect = window.location.origin + '/'
    // Esse é o link oficial do OAuth da Deriv
    window.location.href = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=pt&brand=deriv`
  }

  // SE JÁ ESTÁ CONECTADO, MOSTRA O DASHBOARD
  if (token) {
    return (
      <main className="min-h-dvh bg-[#07070A] p-5">
        <Dashboard />
        <button onClick={() => { localStorage.clear(); setToken(null)}} className="text-sm text-gray-400 mt-4">Desconectar</button>
      </main>
    )
  }

  // SE NÃO ESTÁ CONECTADO, MOSTRA IGUAL SUA FOTO
  return (
    <main className="min-h-dvh bg-[#0A0A0F] flex flex-col">
      <header className="p-4 flex justify-between items-center bg-[#13131A]">
        <h1 className="font-bold text-white text-xl">TRADE DOLAR</h1>
        <div className="bg-[#1E1E26] px-3 py-1 rounded-full text-white text-sm">15:43:54</div>
      </header>

      <div className="flex-1 p-6 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="bg-[#13131A] border border-white/10 rounded-xl p-6 space-y-6">
          <p className="text-gray-300 leading-relaxed">
            Todas as transações da plataforma são executadas através da Deriv, uma das principais corretoras globais de trading online.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Acesse agora com sua conta existente ou crie uma nova conta na Deriv para começar a operar imediatamente.
          </p>

          <button 
            onClick={conectarDeriv}
            className="w-full bg-[#2D5BFF] hover:bg-[#1E4AE6] text-white font-bold py-4 rounded-lg transition"
          >
            Conectar com a conta da DERIV
          </button>

          <a 
            href={AFFILIATE_LINK}
            target="_blank"
            className="w-full bg-[#2A2A32] border border-white/10 text-white font-bold py-4 rounded-lg flex justify-center"
          >
            Criar nova conta DERIV
          </a>

          <p className="text-sm text-gray-400 leading-relaxed">
            Se depois de entrar na Deriv você cair no painel dela, volte para esta página e clique em conectar de novo: como você já entrou, a Deriv só vai pedir a autorização e trazer você de volta.
          </p>
        </div>
      </div>

      <nav className="bg-[#13131A] border-t border-white/5 flex justify-around py-3">
        <span className="text-yellow-400 text-xs">Início</span>
        <span className="text-gray-500 text-xs">Depósito</span>
        <span className="text-gray-500 text-xs">Sinais</span>
        <span className="text-gray-500 text-xs">Saque</span>
        <span className="text-green-400 text-xs">Suporte</span>
      </nav>
    </main>
  )
}
