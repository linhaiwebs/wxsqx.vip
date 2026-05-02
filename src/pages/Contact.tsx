import { ArrowLeft, Mail, Clock } from 'lucide-react';


export default function Contact() {
  return (
    <div className="min-h-screen bg-mb-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <a href="https://mcbqw.vip/"
          className="inline-flex items-center gap-2 text-mb-cyan hover:text-mb-cyan mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </a>

        <div className="bg-mb-bg   p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 ">
              <Mail className="w-6 h-6 text-mb-cyan" />
            </div>
            <h1 className="text-3xl font-bold text-mb-on-bg">お問い合わせ</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-mb-on-surface-variant leading-relaxed mb-8">
              AI株式診断サービスをご利用いただき、誠にありがとうございます。
              ご質問、ご要望、不具合のご報告など、お気軽にお問い合わせください。
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-mb-on-bg mb-4">受付時間</h2>
              <div className="bg-mb-surface-container  p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-mb-cyan mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-mb-on-bg mb-1">24時間受付</p>
                  <p className="text-sm text-mb-on-surface-variant">
                    ※メールでのお問い合わせは24時間受け付けております<br />
                    ※ご返信は営業日（平日 9:00-18:00）内に順次対応いたします<br />
                    ※土日祝日、年末年始の返信は翌営業日となります
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-mb-on-bg mb-4">お問い合わせフォーム</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-mb-on-surface-variant mb-2">
                    お名前 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-mb-outline-variant  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-mb-on-surface-variant mb-2">
                    メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-mb-outline-variant  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-mb-on-surface-variant mb-2">
                    件名 <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-mb-outline-variant  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    <option value="service">サービス内容について</option>
                    <option value="technical">技術的な問題</option>
                    <option value="billing">料金について</option>
                    <option value="account">アカウントについて</option>
                    <option value="feature">機能リクエスト</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-mb-on-surface-variant mb-2">
                    お問い合わせ内容 <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={8}
                    className="w-full px-4 py-2 border border-mb-outline-variant  focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="お問い合わせ内容を詳しくご記入ください"
                  />
                </div>

                <div className="bg-mb-surface-container  p-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 text-mb-cyan border-mb-outline-variant rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-mb-on-surface-variant">
                      <a href="/privacy" className="text-mb-cyan hover:underline">プライバシーポリシー</a>
                      に同意します <span className="text-red-600">*</span>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6  hover:bg-blue-700 transition-colors shadow-md"
                >
                  送信する
                </button>
              </form>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 ">
                <p className="text-sm text-amber-800">
                  <strong>注意：</strong> このフォームは現在デモ版です。実際の送信機能は実装されていません。
                  本番環境では、適切なバックエンド処理を実装する必要があります。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-mb-on-bg mb-4">よくあるお問い合わせ</h2>
              <p className="text-mb-on-surface-variant leading-relaxed mb-3">
                よくあるご質問については、
                <a href="/faq" className="text-mb-cyan hover:underline font-semibold">FAQ（よくある質問）</a>
                のページもご参照ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-mb-on-bg mb-4">投資に関するご相談について</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-900 font-semibold mb-2">重要なお知らせ</p>
                <p className="text-red-800 leading-relaxed">
                  当サービスは金融商品取引業者ではないため、個別の投資助言を行うことはできません。
                  投資に関する具体的なご相談は、証券会社等の金融商品取引業者にお問い合わせください。
                </p>
              </div>
            </section>

            <div className="bg-slate-100  p-6">
              <h3 className="font-bold text-mb-on-bg mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                運営会社情報
              </h3>
              <p className="text-sm text-mb-on-surface-variant mb-2">
                <strong>会社名:</strong> アビクト北日本
              </p>
              <p className="text-sm text-mb-on-surface-variant mb-2">
                <strong>所在地:</strong> 〒003-0002 北海道札幌市白石区東札幌２条６丁目４－１８－３０１
              </p>
              <p className="text-sm text-mb-on-surface-variant mb-2">
                <strong>電話番号:</strong> 011-833-4945
              </p>
              <p className="text-sm text-mb-on-surface-variant mb-2">
                <strong>受付時間:</strong> 平日 9:00〜18:00（土日祝日を除く）
              </p>
              <p className="text-sm text-mb-on-surface-variant mb-2">
                <strong>メールアドレス:</strong> support@valuepal.jp
              </p>
              <p className="text-sm text-mb-on-surface-variant">
                <strong>お問い合わせ受付:</strong> 24時間受付（回答は営業時間内）
              </p>
              <p className="text-sm text-mb-on-surface-variant mt-4">
                <strong>事業内容:</strong>
              </p>
              <ul className="text-sm text-mb-on-surface-variant ml-5 list-disc">
                <li>企業評価支援ツールの開発・提供</li>
                <li>ビジネスコンサルティングサービス</li>
                <li>財務分析ツールの開発</li>
                <li>Webアプリケーションの開発</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
