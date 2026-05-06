const BASE_URL = 'https://nmslm.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-surface-container-highest w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-stack-gap px-container-margin py-section-padding w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-1">
          <span className="font-label-caps text-label-caps text-primary">NMSLM</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">© {currentYear} NMSLM. 感情で読み解く、新しい投資体験。</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors focus:underline" href={`${BASE_URL}/terms`}>利用規約</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors focus:underline" href={`${BASE_URL}/privacy`}>プライバシーポリシー</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors focus:underline" href={`${BASE_URL}/company`}>運営会社</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors focus:underline" href={`${BASE_URL}/contact`}>お問い合わせ</a>
        </div>
      </div>
    </footer>
  );
}
