import { ArrowDown, ArrowUp } from 'lucide-react'
import type { DerivTrade } from '@/hooks/use-deriv'
import { formatMoney } from '@/lib/format-money'

export function ResultsList({ trades, currency }: { trades: DerivTrade[]; currency: string }) {
  return (
    <section
      aria-labelledby="results-title"
      className="rounded-3xl border border-cyan-300/30 bg-[#0a0d16]/80 p-5 shadow-[0_0_24px_rgba(34,211,238,0.12),inset_0_0_30px_rgba(168,85,247,0.08)] backdrop-blur-sm"
    >
      <h2 id="results-title" className="mb-4 text-xl font-bold text-white">
        Lista de Resultados do Dia
      </h2>
      {trades.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-[#0d1019] px-4 py-6 text-center text-slate-400">
          Nenhuma operação fechada hoje ainda.
        </p>
      ) : (
        <ul className="flex flex-col gap-3" aria-live="polite">
          {trades.map((t) => {
            const win = t.profit >= 0
            return (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d1019] px-4 py-4 sm:gap-4"
              >
                <time className="w-12 text-base text-slate-400">{t.time}</time>
                <span className="rounded-md border border-cyan-200/70 px-2 py-0.5 text-sm font-medium text-white shadow-[0_0_8px_rgba(103,232,249,0.4)]">
                  {t.label}
                </span>
                <span className={`text-lg font-medium ${win ? 'text-green-400' : 'text-rose-400'}`}>
                  {win ? 'Ganhou' : 'Perdeu'}
                </span>
                <span
                  className={`ml-auto flex items-center gap-1 whitespace-nowrap text-lg font-bold ${
                    win ? 'text-green-400' : 'text-rose-400'
                  }`}
                >
                  {win ? '+ ' : '- '}
                  {formatMoney(Math.abs(t.profit), currency)}
                  {win ? (
                    <ArrowUp className="size-5 text-slate-300" aria-hidden="true" />
                  ) : (
                    <ArrowDown className="size-5 text-rose-400" aria-hidden="true" />
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
