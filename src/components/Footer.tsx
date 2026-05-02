const BASE_URL = 'https://mcbqw.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full flex flex-col items-center gap-2 py-6 px-4 text-center bg-zinc-950 border-t border-zinc-800 z-50">
      <div className="flex gap-4 mb-2">
        <a className="font-display text-[10px] tracking-tight font-mono text-zinc-600 hover:text-fuchsia-400 hover:bg-zinc-900 hover:translate-y-[-1px] transition-all px-2 py-1" href={`${BASE_URL}/`}>TERMINAL_LOG</a>
        <a className="font-display text-[10px] tracking-tight font-mono text-zinc-600 hover:text-fuchsia-400 hover:bg-zinc-900 hover:translate-y-[-1px] transition-all px-2 py-1" href={`${BASE_URL}/terms`}>USER_AGREEMENT</a>
        <a className="font-display text-[10px] tracking-tight font-mono text-zinc-600 hover:text-fuchsia-400 hover:bg-zinc-900 hover:translate-y-[-1px] transition-all px-2 py-1" href={`${BASE_URL}/privacy`}>DEBUG_DATA</a>
        <a className="font-display text-[10px] tracking-tight font-mono text-zinc-600 hover:text-fuchsia-400 hover:bg-zinc-900 hover:translate-y-[-1px] transition-all px-2 py-1" href={`${BASE_URL}/contact`}>CONTACT</a>
      </div>
      <p className="font-display text-[10px] tracking-tight font-mono text-mb-cyan opacity-50">©{currentYear} MCBQW_SYNAPSE_LABS. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
