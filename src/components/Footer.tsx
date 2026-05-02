const BASE_URL = 'https://xxbdy.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-white/30 backdrop-blur-md w-full border-t border-white/20">
      <div className="flex flex-col items-center gap-4 py-10 px-6 text-center w-full max-w-md mx-auto">
        <div className="text-blue-600 font-display font-bold text-[11px]">XXBDY STOCK</div>
        <div className="flex gap-4 font-display text-[11px] font-medium leading-relaxed">
          <a className="text-slate-500 hover:text-blue-500 underline transition-colors" href={`${BASE_URL}/terms`}>利用規約</a>
          <a className="text-slate-500 hover:text-blue-500 underline transition-colors" href={`${BASE_URL}/privacy`}>プライバシーポリシー</a>
          <a className="text-slate-500 hover:text-blue-500 underline transition-colors" href={`${BASE_URL}/specified-commercial-transaction-act`}>市場データ開示</a>
        </div>
        <p className="font-display text-[11px] font-medium leading-relaxed text-slate-500 mt-2">© {currentYear} XXBDY Finance. All rights reserved.</p>
      </div>
    </footer>
  );
}
