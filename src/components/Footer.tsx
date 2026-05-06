const BASE_URL = 'https://snxwx.vip';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full bottom-0 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin py-gutter w-full gap-4 max-w-container-max mx-auto">
        <div className="font-data-mono text-label-xs text-primary-fixed-dim flex items-center gap-2">
          <span className="material-symbols-outlined">terminal</span>
          © {currentYear} SNXWX. 全権利留保
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-outline font-label-xs text-label-xs">
          <a className="hover:text-primary-fixed-dim underline transition-all" href={`${BASE_URL}/terms`}>利用規約</a>
          <a className="hover:text-primary-fixed-dim underline transition-all" href={`${BASE_URL}/privacy`}>プライバシーポリシー</a>
          <a className="hover:text-primary-fixed-dim underline transition-all" href={`${BASE_URL}/specified-commercial-transaction-act`}>特定商取引法</a>
          <a className="hover:text-primary-fixed-dim underline transition-all" href={`${BASE_URL}/company`}>会社概要</a>
        </div>
      </div>
    </footer>
  );
}
