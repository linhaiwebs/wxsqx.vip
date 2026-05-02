const BASE_URL = 'https://cxbwx.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-zinc-100 w-full flex flex-col items-center text-center gap-4 py-8 px-4" style={{ borderTop: '3px solid #001c3a' }}>
      <nav className="flex flex-wrap justify-center gap-4">
        <a className="font-display text-[10px] font-bold tracking-tight text-pink-500 underline hover:text-black hover:italic transition-all" href={`${BASE_URL}/`}>診断する</a>
        <a className="font-display text-[10px] font-bold tracking-tight text-zinc-600 hover:text-black hover:italic transition-all" href={`${BASE_URL}/company`}>会社概要</a>
        <a className="font-display text-[10px] font-bold tracking-tight text-zinc-600 hover:text-black hover:italic transition-all" href={`${BASE_URL}/terms`}>利用規約</a>
        <a className="font-display text-[10px] font-bold tracking-tight text-zinc-600 hover:text-black hover:italic transition-all" href={`${BASE_URL}/privacy`}>プライバシー</a>
        <a className="font-display text-[10px] font-bold tracking-tight text-zinc-600 hover:text-black hover:italic transition-all" href={`${BASE_URL}/contact`}>お問い合わせ</a>
      </nav>
      <div className="text-sm font-black text-zinc-950 underline decoration-cx-lime font-display">
        ©{currentYear} CXBWX CO. STAY UGLY-CUTE.
      </div>
    </footer>
  );
}
