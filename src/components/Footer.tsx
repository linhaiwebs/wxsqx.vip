const BASE_URL = 'https://cnmb.live';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cnmb-white border-t-4 border-black w-full flex flex-col divide-y-4 divide-black mt-auto">
      <div className="flex flex-wrap w-full">
        <a className="flex-1 min-w-[50%] p-3 font-display text-sm font-bold text-cnmb-on-bg uppercase border-r-4 border-black border-b-4 hover:bg-black hover:text-cnmb-lime transition-none text-center underline decoration-4 decoration-cnmb-lime" href={`${BASE_URL}/company`}>会社概要</a>
        <a className="flex-1 min-w-[50%] p-3 font-display text-sm font-bold text-cnmb-on-bg uppercase border-b-4 border-black hover:bg-black hover:text-cnmb-lime transition-none text-center" href={`${BASE_URL}/terms`}>利用規約</a>
        <a className="flex-1 min-w-[50%] p-3 font-display text-sm font-bold text-cnmb-on-bg uppercase border-r-4 border-black hover:bg-black hover:text-cnmb-lime transition-none text-center" href={`${BASE_URL}/privacy`}>プライバシー</a>
        <a className="flex-1 min-w-[50%] p-3 font-display text-sm font-bold text-cnmb-on-bg uppercase hover:bg-black hover:text-cnmb-lime transition-none text-center" href={`${BASE_URL}/contact`}>お問い合わせ</a>
      </div>
      <div className="p-4 bg-black text-cnmb-lime text-center w-full">
        <span className="font-display text-xs uppercase text-lg font-bold italic">
          ©{currentYear} CNMB. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
