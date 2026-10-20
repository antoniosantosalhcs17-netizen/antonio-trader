import { LogOut } from 'lucide-react'
import type { DerivAccount, DerivStatus } from '@/hooks/use-deriv'

export function AccountBar({
  account,
  status,
  onDisconnect,
}: {
  account: DerivAccount | null
  status: DerivStatus
  onDisconnect: () => void
}) {
  const live = status === 'connected'

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-cyan-300/25 bg-[#0a0d16]/80 px-4 py-3 backdrop-blur-sm">
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span
          className={`size-2.5 shrink-0 rounded-full ${live ? 'animate-pulse bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-yellow-400'}`}
          aria-hidden="true"
        />
        <span className="truncate text-slate-300">
          {live && account
            ? `${account.isVirtual ? 'Demo' : 'Real'} · ${account.loginid} · ao vivo`
            : 'Conectando à Deriv...'}
        </span>
      </div>
      <button
        type="button"
        onClick={onDisconnect}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-rose-400/60 hover:text-rose-300"
      >
        <LogOut className="size-3.5" aria-hidden="true" />
        Sair
      </button>
    </div>
  )
}
