import { ArrowLeft, Building, MapPin, Calendar, Briefcase, Target } from 'lucide-react';


export default function CompanyInfo() {
  return (
    <div className="min-h-screen bg-cx-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <a href="https://cxbwx.vip/"
          className="inline-flex items-center gap-2 text-cx-pink hover:text-cx-pink mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </a>

        <div className="bg-cx-surface-lowest   p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 ">
              <Building className="w-6 h-6 text-cx-pink" />
            </div>
            <h1 className="text-3xl font-bold text-cx-on-bg">会社概要</h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100  p-6 border-l-4 border-blue-500">
                <h2 className="text-2xl font-bold text-cx-on-bg mb-4">アビクト北日本</h2>
              </div>
            </section>

            <section className="mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50  p-6 border border-slate-200">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-cx-pink mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-cx-on-bg mb-2">所在地</h3>
                      <p className="text-cx-on-surface-variant leading-relaxed">
                        〒003-0002<br />
                        北海道札幌市白石区東札幌２条６丁目４－１８－３０１
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50  p-6 border border-slate-200">
                  <div className="flex items-start gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-cx-pink mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-cx-on-bg mb-2">電話番号</h3>
                      <p className="text-cx-on-surface-variant text-lg">011-833-4945</p>
                      <p className="text-sm text-cx-on-surface-variant mt-1">受付時間：平日 9:00〜18:00（土日祝日を除く）</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-cx-surface-container  p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-6 h-6 text-cx-pink mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-cx-on-bg mb-3">メールアドレス</h3>
                    <p className="text-cx-on-surface-variant text-lg leading-relaxed">
                      support@valuepal.jp
                    </p>
                    <p className="text-sm text-cx-on-surface-variant mt-2">
                      お問い合わせは24時間受付（回答は営業時間内）
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <Target className="w-6 h-6 text-cx-pink mt-1 flex-shrink-0" />
                <h3 className="text-xl font-bold text-cx-on-bg">事業内容</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-cx-surface-lowest border-2 border-blue-100  p-5 hover:border-blue-300 transition-colors">
                  <h4 className="font-bold text-cx-on-bg mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cx-surface-container0 text-white  flex items-center justify-center text-sm font-bold">1</span>
                    企業評価支援ツールの開発・提供
                  </h4>
                </div>

                <div className="bg-cx-surface-lowest border-2 border-blue-100  p-5 hover:border-blue-300 transition-colors">
                  <h4 className="font-bold text-cx-on-bg mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cx-surface-container0 text-white  flex items-center justify-center text-sm font-bold">2</span>
                    ビジネスコンサルティングサービス
                  </h4>
                </div>

                <div className="bg-cx-surface-lowest border-2 border-blue-100  p-5 hover:border-blue-300 transition-colors">
                  <h4 className="font-bold text-cx-on-bg mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cx-surface-container0 text-white  flex items-center justify-center text-sm font-bold">3</span>
                    財務分析ツールの開発
                  </h4>
                </div>

                <div className="bg-cx-surface-lowest border-2 border-blue-100  p-5 hover:border-blue-300 transition-colors">
                  <h4 className="font-bold text-cx-on-bg mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cx-surface-container0 text-white  flex items-center justify-center text-sm font-bold">4</span>
                    Webアプリケーションの開発
                  </h4>
                </div>
              </div>
            </section>


            <div className="bg-cx-surface-container  p-6 border-2 border-blue-200 mt-8">
              <h3 className="font-bold text-cx-on-bg mb-3">お問い合わせ</h3>
              <p className="text-sm text-cx-on-surface-variant mb-4">
                弊社サービスに関するお問い合わせは、お気軽にご連絡ください。
              </p>
              <a href="https://cxbwx.vip/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700 transition-colors font-semibold"
              >
                お問い合わせフォームへ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
