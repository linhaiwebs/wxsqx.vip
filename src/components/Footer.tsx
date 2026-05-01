import { Shield, Scale, FileText, Mail, ExternalLink } from 'lucide-react';

const BASE_URL = 'https://ehxv.live';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t-4 border-black bg-white mt-4">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Legal Disclosure - Desktop */}
        <div className="hidden md:block border-[3px] border-black bg-white hard-shadow p-6 mb-8">
          <div className="bg-black text-white p-2 border-b-[3px] border-black mb-4 flex justify-between items-center">
            <span className="font-headline text-xs uppercase tracking-widest font-bold">LEGAL_DATA</span>
            <div className="w-2 h-2 bg-[#00e5ff]"></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-[#ff6b00] p-3 border-[2px] border-black flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 space-y-3 text-sm leading-relaxed text-on-surface font-body">
              <div className="bg-surface p-3 border-l-4 border-[#ff6b00]">
                <p className="font-bold text-black mb-2 font-headline uppercase">【サービスの性質】</p>
                <p>本サービスはAI技術を活用した株式情報の提供および分析ツールです。<strong className="text-red-700">投資助言業務、投資一任業務、金融商品仲介業務には該当しません。</strong></p>
              </div>
              <div className="bg-surface p-3 border-l-4 border-[#ea580c]">
                <p className="font-bold text-black mb-2 font-headline uppercase">【投資リスクに関する警告】</p>
                <p><strong className="text-red-700">投資元本を割り込む可能性があります。</strong>過去の運用実績は将来の運用成果を保証するものではありません。</p>
              </div>
              <div className="bg-surface p-3 border-l-4 border-black">
                <p className="font-bold text-black mb-2 font-headline uppercase">【投資判断の責任】</p>
                <p><strong className="text-red-700">最終的な投資判断は、利用者ご自身の責任において行ってください。</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile notice */}
        <div className="md:hidden border-[3px] border-black bg-[#ff6b00] p-3 text-center mb-6">
          <p className="text-xs text-black font-bold font-headline uppercase tracking-wider">
            ⚠️ 当サービスは情報提供のみ / 投資助言ではありません
          </p>
        </div>

        {/* Footer Links */}
        <div className="border-t-[3px] border-black pt-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold text-black mb-3 flex items-center gap-2 text-sm font-headline uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                法的文書
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href={`${BASE_URL}/company`} className="text-black font-bold uppercase tracking-tight border-2 border-black px-2 py-1 hover:bg-[#ff6b00] transition-none inline-block">
                    会社概要
                  </a>
                </li>
                <li>
                  <a href={`${BASE_URL}/terms`} className="text-black font-bold uppercase tracking-tight border-2 border-black px-2 py-1 hover:bg-[#ff6b00] transition-none inline-block">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href={`${BASE_URL}/privacy`} className="text-black font-bold uppercase tracking-tight border-2 border-black px-2 py-1 hover:bg-[#ff6b00] transition-none inline-block">
                    プライバシー
                  </a>
                </li>
                <li>
                  <a href={`${BASE_URL}/specified-commercial-transaction-act`} className="text-black font-bold uppercase tracking-tight border-2 border-black px-2 py-1 hover:bg-[#ff6b00] transition-none inline-block">
                    特定商取引法
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-black mb-3 flex items-center gap-2 text-sm font-headline uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                お問い合わせ
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href={`${BASE_URL}/contact`} className="text-black font-bold uppercase tracking-tight border-2 border-black px-2 py-1 hover:bg-[#ff6b00] transition-none inline-block">
                    お問い合わせ
                  </a>
                </li>
                <li className="flex items-center gap-1 text-black font-bold font-headline">
                  <Mail className="w-3 h-3" />
                  <span>support@ehxv.live</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t-[3px] border-black pt-4 text-center">
            <p className="text-[10px] text-black font-headline font-black uppercase tracking-widest">
              © {currentYear} EHXV. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] text-outline-custom mt-1 font-body">
              当サイトで提供される情報は投資勧誘を目的としたものではありません。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
