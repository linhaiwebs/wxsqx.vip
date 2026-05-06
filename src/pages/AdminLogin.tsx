import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuth } from '../lib/adminAuth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await adminAuth.login(username, password);
    if (result.success) { navigate('/adsadmin/dashboard'); }
    else { setError(result.error || 'ログインに失敗しました'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-low border border-outline-variant rounded p-8 neon-glow">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-fixed-dim/10 border border-primary-fixed-dim/30 rounded-full mb-4">
              <span className="material-symbols-outlined text-primary-fixed-dim text-[32px]">lock</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">管理画面</h1>
            <p className="text-on-surface-variant mt-2 font-body-base text-body-base">ログインしてください</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-error-container/20 border border-error/30 rounded p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-error mt-0.5">error</span>
                <p className="font-body-base text-body-base text-error">{error}</p>
              </div>
            )}
            <div>
              <label className="block font-data-mono text-label-xs text-on-surface-variant mb-2">ユーザー名</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">person</span>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded pl-10 pr-4 py-3 text-on-surface font-data-mono focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim neon-glow transition-all placeholder:text-outline"
                  placeholder="ユーザー名を入力" required autoComplete="username" />
              </div>
            </div>
            <div>
              <label className="block font-data-mono text-label-xs text-on-surface-variant mb-2">パスワード</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">key</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded pl-10 pr-4 py-3 text-on-surface font-data-mono focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim neon-glow transition-all placeholder:text-outline"
                  placeholder="パスワードを入力" required autoComplete="current-password" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-primary-fixed-dim text-on-primary-fixed py-3 rounded font-data-mono text-data-mono font-bold hover:bg-primary-container transition-all neon-glow-hover disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>
        </div>
        <p className="text-center text-outline font-data-mono text-label-xs mt-6">権限のある方のみアクセス可能</p>
      </div>
    </div>
  );
}
