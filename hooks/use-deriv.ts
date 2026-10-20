import { Dashboard } from '@/components/dashboard'

export default function Page() {
  return (
    <main
      className="min-h-dvh bg-[#05070d] bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg-cyber.png')" }}
    >
      <div className="mx-auto flex max-w-md flex-col gap-6 px-5 pb-10 pt-10">
        <h1 className="text-center font-display text-[4.25rem] uppercase leading-[1.1] tracking-tight text-cyan-200 [text-shadow:0_0_10px_rgba(103,232,249,0.9),0_0_30px_rgba(34,211,238,0.6)] sm:text-[5rem]">
          Antonio Trader
        </h1>
        <Dashboard />
      </div>
    </main>
  )
}
