import { ArrowLeft, Building, MapPin, Calendar, Briefcase, Target } from 'lucide-react';


export default function CompanyInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <a
          href="https://cnmb.live/"
          className="inline-flex items-center gap-2 text-cnmb-lime-dark hover:text-cnmb-lime-dark mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </a>

        <div className="bg-white  shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-cnmb-lime/10 p-3 ">
              <Building className="w-6 h-6 text-cnmb-lime-dark" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">会社概要</h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100  p-6 border-l-4 border-black">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">アビクト北日本</h2>
              </div>
            </section>

            <section className="mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cnmb-bg  p-6 border border-cnmb-gray-light">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-cnmb-lime-dark mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">所在地</h3>
                      <p className="text-cnmb-on-bg leading-relaxed">
                        〒003-0002<br />
                        北海道札幌市白石区東札幌２条６丁目４－１８－３０１
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-cnmb-bg  p-6 border border-cnmb-gray-light">
                  <div className="flex items-start gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-cnmb-lime-dark mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">電話番号</h3>
                      <p className="text-cnmb-on-bg text-lg">011-833-4945</p>
                      <p className="text-sm text-cnmb-gray mt-1">受付時間：平日 9:00〜18:00（土日祝日を除く）</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-cnmb-bg  p-6 border-l-4 border-black">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-6 h-6 text-cnmb-lime-dark mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">メールアドレス</h3>
                    <p className="text-cnmb-on-bg text-lg leading-relaxed">
                      support@cnmb.live
                    </p>
                    <p className="text-sm text-cnmb-gray mt-2">
                      お問い合わせは24時間受付（回答は営業時間内）
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <Target className="w-6 h-6 text-cnmb-lime-dark mt-1 flex-shrink-0" />
                <h3 className="text-xl font-bold text-gray-900">事業内容</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white border-2 border-cnmb-gray-light  p-5 hover:border-cnmb-gray-light transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cnmb-bg0 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    企業評価支援ツールの開発・提供
                  </h4>
                </div>

                <div className="bg-white border-2 border-cnmb-gray-light  p-5 hover:border-cnmb-gray-light transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cnmb-bg0 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    ビジネスコンサルティングサービス
                  </h4>
                </div>

                <div className="bg-white border-2 border-cnmb-gray-light  p-5 hover:border-cnmb-gray-light transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cnmb-bg0 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    財務分析ツールの開発
                  </h4>
                </div>

                <div className="bg-white border-2 border-cnmb-gray-light  p-5 hover:border-cnmb-gray-light transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cnmb-bg0 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    Webアプリケーションの開発
                  </h4>
                </div>
              </div>
            </section>


            <div className="bg-cnmb-bg  p-6 border-2 border-cnmb-gray-light mt-8">
              <h3 className="font-bold text-gray-900 mb-3">お問い合わせ</h3>
              <p className="text-sm text-cnmb-on-bg mb-4">
                弊社サービスに関するお問い合わせは、お気軽にご連絡ください。
              </p>
              <a
                href="https://cnmb.live/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white  hover:bg-black transition-colors font-semibold"
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
