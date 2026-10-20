'use client'

import { KeyRound } from 'lucide-react'
import { useState } from 'react'

export function DerivConnect({
  onConnect,
  error,
  connecting,
}: {
  onConnect: (token: string) => void
  error: string | null
  connecting: boolean
}) {
  const [value, setValue] = useState('')

  return (
    <section
      aria-labelledby="connect-title"
      className="rounded-3xl border border-cyan-300/40 bg-[#0a0d16]/85 p-6 shadow-[0_0_24px_rgba(34,211,238,0.18),inset_0_0_30px_rgba(168,85,247,0.08)] backdrop-blur-sm"
    >
      <h2 id="connect-title" className="flex items-center gap-3 text-xl font-bold uppercase tracking-wide text-yellow-300">
        <KeyRound className="size-7 drop-shadow-[0_0_6px_rgba(253,224,71,0.7)]" aria-hidden="true" />
        Conectar à Deriv
      </h2>
      <p className="mt-4 leading-relaxed text-slate-300">
        Cole o seu token de API da Deriv para carregar sua banca, ganhos e perdas em tempo real.
      </p>

      <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-slate-400">
        <li>
          {'Acesse '}
          <a
            href="https://app.deriv.com/account/api-token"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline underline-offset-2"
          >
            app.deriv.com/account/api-token
          </a>
        </li>
        <li>
          Marque o escopo <strong className="text-white">Ler</strong>.
        </li>
        <li>Crie o token, copie e cole abaixo.</li>
      </ol>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          onConnect(value)
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="deriv-token" className="text-sm font-bold uppercase text-cyan-300">
            Token de API
          </label>
          <input
            id="deriv-token"
            type="password"
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex.: a1-xxxxxxxxxxxxxxxx"
            className="rounded-xl border border-cyan-300/30 bg-black/70 px-4 py-3.5 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-rose-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={connecting || !value.trim()}
          className="rounded-xl bg-cyan-600 py-3.5 text-lg font-bold uppercase tracking-widest text-black shadow-[0_0_16px_rgba(34,211,238,0.45)] transition-colors hover:bg-cyan-500 disabled:opacity-60"
        >
          {connecting ? 'Conectando...' : 'Conectar'}
        </button>
      </form>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        O token fica salvo apenas neste navegador e é enviado direto para a Deriv. Use uma conta Demo para testar.
      </p>
    </section>
  )
}
