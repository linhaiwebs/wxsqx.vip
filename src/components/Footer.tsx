const BASE_URL = 'https://xydxd.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto w-full rounded-t-lg bg-slate-100 border-t border-slate-200/50 flex flex-col items-center p-8 gap-4 text-center" style={{ boxShadow: 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff' }}>
      <h4 className="font-display text-[20px] text-slate-800" style={{ fontWeight: 700 }}>金融診断システム</h4>
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        <a className="text-slate-500 hover:text-xy-primary-container opacity-80 hover:opacity-100 transition-opacity font-display text-[10px] leading-relaxed" href={`${BASE_URL}/terms`}>利用規約</a>
        <a className="text-slate-500 hover:text-xy-primary-container opacity-80 hover:opacity-100 transition-opacity font-display text-[10px] leading-relaxed" href={`${BASE_URL}/privacy`}>プライバシーポリシー</a>
        <a className="text-slate-500 hover:text-xy-primary-container opacity-80 hover:opacity-100 transition-opacity font-display text-[10px] leading-relaxed" href={`${BASE_URL}/company`}>運営会社</a>
        <a className="text-slate-500 hover:text-xy-primary-container opacity-80 hover:opacity-100 transition-opacity font-display text-[10px] leading-relaxed" href={`${BASE_URL}/contact`}>お問い合わせ</a>
      </nav>
      <p className="text-slate-600 font-display text-[10px] leading-relaxed mt-2">© {currentYear} XYDXD All Rights Reserved.</p>
    </footer>
  );
}
