import { Shield, FileText, Mail } from 'lucide-react';

const BASE_URL = 'https://qdhs.live';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-4 flex flex-col items-center gap-4 text-center bg-zinc-950 border-t-2 border-zinc-800 mt-4">
      <div className="text-qdhs-red font-display font-black italic text-xl mb-1">QDHS</div>

      <div className="hidden md:block max-w-2xl bg-qdhs-surface border-thick hard-shadow p-4 mb-4 text-left w-full">
        <div className="flex items-start gap-3">
          <div className="bg-qdhs-red border-2 border-black p-2 flex-shrink-0"><Shield className="w-5 h-5 text-white" /></div>
          <div className="text-sm text-qdhs-on-surface-variant font-body space-y-2">
            <p><span className="text-qdhs-red font-display font-bold">【サービスの性質】</span> 投資助言業務には該当しません。</p>
            <p><span className="text-qdhs-red font-display font-bold">【投資リスク】</span> 投資元本を割り込む可能性があります。</p>
            <p><span className="text-qdhs-red font-display font-bold">【投資判断】</span> 最終的な投資判断はご自身の責任で。</p>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-qdhs-red border-thick p-2 text-center mb-2 w-full max-w-md">
        <p className="text-xs text-white font-display font-bold uppercase tracking-wider">⚠️ 情報提供のみ / 投資助言ではありません</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-3">
        <a href={`${BASE_URL}/company`} className="font-display font-medium text-xs tracking-widest text-zinc-500 hover:text-qdhs-red transition-colors">会社概要</a>
        <a href={`${BASE_URL}/terms`} className="font-display font-medium text-xs tracking-widest text-zinc-500 hover:text-qdhs-red transition-colors">利用規約</a>
        <a href={`${BASE_URL}/privacy`} className="font-display font-medium text-xs tracking-widest text-zinc-500 hover:text-qdhs-red transition-colors">プライバシー</a>
        <a href={`${BASE_URL}/specified-commercial-transaction-act`} className="font-display font-medium text-xs tracking-widest text-zinc-500 hover:text-qdhs-red transition-colors">特定商取引法</a>
        <a href={`${BASE_URL}/contact`} className="font-display font-medium text-xs tracking-widest text-zinc-500 hover:text-qdhs-red transition-colors">お問い合わせ</a>
      </div>

      <div className="flex items-center gap-1 text-zinc-600 text-xs font-body">
        <Mail className="w-3 h-3" /> support@qdhs.live
      </div>

      <p className="font-display font-medium text-xs tracking-widest text-white opacity-50">©{currentYear} QDHS. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
