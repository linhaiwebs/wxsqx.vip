const BASE_URL = 'https://kwxnw.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-kw-footer text-kw-zinc font-display text-[10px] uppercase font-bold w-full border-t-2 border-zinc-100 px-4 py-8 flex flex-col gap-4 mt-auto relative z-10 items-center text-center" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundPosition: 'center' }}>
      <div className="text-lg font-black text-yellow-400 font-display">KWXNW</div>
      <nav className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
        <a className="text-zinc-400 hover:text-yellow-400 hover:line-through active:opacity-80 transition-colors" href={`${BASE_URL}/company`}>会社概要</a>
        <a className="text-zinc-400 hover:text-yellow-400 hover:line-through active:opacity-80 transition-colors" href={`${BASE_URL}/terms`}>利用規約</a>
        <a className="text-zinc-400 hover:text-yellow-400 hover:line-through active:opacity-80 transition-colors" href={`${BASE_URL}/privacy`}>プライバシー</a>
        <a className="text-zinc-400 hover:text-yellow-400 hover:line-through active:opacity-80 transition-colors" href={`${BASE_URL}/contact`}>お問い合わせ</a>
      </nav>
      <div className="mt-4 text-zinc-500">©{currentYear} KWXNW_LAB</div>
    </footer>
  );
}
