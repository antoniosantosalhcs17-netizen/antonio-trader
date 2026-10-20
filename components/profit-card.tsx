import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { formatMoney } from '@/lib/format-money'

export function ProfitCard({ profit, balance, currency }: { profit: number; balance: number; currency: string }) {
  const negative = profit < 0
  const Icon = negative ? ArrowDownRight : ArrowUpRight
  const today = new Date()
    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    .replace(/\./g, '')
    .replace(/ de /g, ' ')

  return (
    <section
      aria-label="Lucro de hoje"
      className="rounded-3xl border border-cyan-300/40 bg-[#0a0d16]/80 p-6 shadow-[0_0_24px_rgba(34,211,238,0.18),inset_0_0_30px_rgba(168,85,247,0.08)] backdrop-blur-sm"
    >
      <div className="flex items-center gap-5">
        <div
          className={`flex size-24 shrink-0 items-center justify-center rounded-2xl border-2 sm:size-28 ${
            negative
              ? 'border-rose-300/80 shadow-[0_0_18px_rgba(251,113,133,0.6),inset_0_0_14px_rgba(251,113,133,0.35)]'
              : 'border-cyan-200/80 shadow-[0_0_18px_rgba(103,232,249,0.6),inset_0_0_14px_rgba(103,232,249,0.35)]'
          }`}
        >
          <Icon
            className={`size-14 ${
              negative
                ? 'text-rose-300 drop-shadow-[0_0_8px_rgba(251,113,133,0.9)]'
                : 'text-cyan-200 drop-shadow-[0_0_8px_rgba(103,232,249,0.9)]'
            }`}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0">
          <p className="text-lg text-slate-200">Lucro de Hoje</p>
          <p
            className={`text-3xl font-bold tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] sm:text-[2.4rem] ${
              negative ? 'text-rose-300' : 'text-white'
            }`}
          >
            {negative ? '- ' : '+ '}
            {formatMoney(Math.abs(profit), currency)}
          </p>
          <p className="mt-1 text-base text-slate-400">Hoje {today}</p>
          <p className="text-sm text-cyan-200/80">Banca: {formatMoney(balance, currency)}</p>
        </div>
      </div>
    </section>
  )
}
