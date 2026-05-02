const BASE_URL = 'https://cbxws.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full p-6 flex flex-col gap-4 text-left bg-zinc-950 relative border-t-4 border-double border-white items-center">
      <div className="text-lg font-body text-white tracking-tighter italic text-center" style={{ fontWeight: 900 }}>CBXWS</div>
      <div className="flex flex-col gap-2 font-body text-xs uppercase tracking-widest text-zinc-400 items-center">
        <a className="hover:text-cbx-lime hover:skew-x-2 transition-all duration-75 text-center" href={`${BASE_URL}/company`}>会社概要</a>
        <a className="hover:text-cbx-lime hover:skew-x-2 transition-all duration-75 text-center" href={`${BASE_URL}/terms`}>利用規約</a>
        <a className="hover:text-cbx-lime hover:skew-x-2 transition-all duration-75 text-center" href={`${BASE_URL}/privacy`}>プライバシー</a>
        <a className="hover:text-cbx-lime hover:skew-x-2 transition-all duration-75 text-center" href={`${BASE_URL}/contact`}>お問い合わせ</a>
      </div>
      <div className="font-body text-[10px] text-zinc-500 mt-4 border-t border-zinc-800 pt-4 w-full text-center">
        ©{currentYear} CBXWS_ARCHIVE
      </div>
    </footer>
  );
}
