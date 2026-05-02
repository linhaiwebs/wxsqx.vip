const BASE_URL = 'https://xnwvx.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-xnw-footer border-t border-white/20 py-8 flex flex-col items-center gap-4 px-6 w-full mt-auto cyber-line-top flat-tonal-layering z-10">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 w-full">
        <a className="font-display text-[10px] tracking-widest uppercase text-xnw-silver hover:text-cyan-300 transition-colors text-glitch-on-hover" href={`${BASE_URL}/company`}>会社概要</a>
        <a className="font-display text-[10px] tracking-widest uppercase text-xnw-silver hover:text-cyan-300 transition-colors text-glitch-on-hover" href={`${BASE_URL}/terms`}>利用規約</a>
        <a className="font-display text-[10px] tracking-widest uppercase text-xnw-silver hover:text-cyan-300 transition-colors text-glitch-on-hover" href={`${BASE_URL}/privacy`}>プライバシー</a>
        <a className="font-display text-[10px] tracking-widest uppercase text-xnw-silver hover:text-cyan-300 transition-colors text-glitch-on-hover" href={`${BASE_URL}/contact`}>お問い合わせ</a>
      </div>
      <div className="text-cyan-500 font-bold font-display text-[10px] tracking-widest uppercase mt-4">
        ©{currentYear} XNWVX_LABS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
