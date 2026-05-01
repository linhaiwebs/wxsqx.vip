import { Mail } from 'lucide-react';

const BASE_URL = 'https://psdj.live';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-qsdj-lime text-qsdj-lime-dark font-display font-bold text-sm w-full border-t-4 border-qsdj-on-bg mt-auto flex flex-col md:flex-row justify-between items-center p-8 gap-4 z-10 relative">
      <div className="text-xl font-black text-qsdj-on-bg tracking-tighter">
        © {currentYear} QSDJ
      </div>
      <ul className="flex gap-6 flex-wrap justify-center">
        <li><a className="text-qsdj-on-bg hover:text-qsdj-magenta-dark transition-colors" href={`${BASE_URL}/company`}>会社概要</a></li>
        <li><a className="text-qsdj-on-bg hover:text-qsdj-magenta-dark transition-colors" href={`${BASE_URL}/privacy`}>プライバシー</a></li>
        <li><a className="text-qsdj-on-bg hover:text-qsdj-magenta-dark transition-colors" href={`${BASE_URL}/terms`}>利用規約</a></li>
        <li><a className="text-qsdj-on-bg hover:text-qsdj-magenta-dark transition-colors" href={`${BASE_URL}/specified-commercial-transaction-act`}>特定商取引法</a></li>
        <li><a className="text-qsdj-on-bg hover:text-qsdj-magenta-dark transition-colors" href={`${BASE_URL}/contact`}>お問い合わせ</a></li>
      </ul>
      <div className="flex items-center gap-1 text-qsdj-on-bg text-xs">
        <Mail className="w-3 h-3" /> support@psdj.live
      </div>
    </footer>
  );
}
