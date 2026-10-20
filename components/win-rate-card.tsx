const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function WinRateCard({ wins, losses }: { wins: number; losses: number }) {
  const total = wins + losses
  const rate = total ? Math.round((wins / total) * 100) : 0
  const offset = CIRCUMFERENCE * (1 - rate / 100)

  return (
    <section
      aria-label="Taxa de acerto"
      className="rounded-3xl border border-cyan-300/40 bg-[#0a0d16]/80 px-6 pb-5 pt-7 shadow-[0_0_24px_rgba(34,211,238,0.18),inset_0_0_30px_rgba(168,85,247,0.08)] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Taxa de Acerto</h2>
          <p className="text-4xl font-bold text-white">{rate}%</p>
        </div>
        <div className="relative size-32 shrink-0 sm:size-36">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
            <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="rgba(103,232,249,0.12)" strokeWidth="5" />
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="#a5f3fc"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              className="drop-shadow-[0_0_6px_rgba(103,232,249,0.9)]"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
            {rate}%
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-10">
        <span className="flex items-center gap-2 text-lg text-slate-300">
          <span className="size-5 rounded-full border-2 border-green-400" aria-hidden="true" />
          {wins} ganhos
        </span>
        <span className="flex items-center gap-2 text-lg text-rose-300">
          <span className="size-5 rounded-full border-2 border-rose-400" aria-hidden="true" />
          {losses} perdas
        </span>
      </div>
      <p className="mt-3 text-center text-base text-slate-300">Desempenho do dia</p>
    </section>
  )
}
