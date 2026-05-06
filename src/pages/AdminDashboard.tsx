import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuth } from '../lib/adminAuth';
import { apiClient } from '../lib/apiClient';
import SessionsTab from '../components/SessionsTab';
import RedirectLinksTab from '../components/RedirectLinksTab';
import GoogleTrackingTab from '../components/GoogleTrackingTab';
import CacheManagementTab from '../components/CacheManagementTab';

interface Stats { totalSessions: number; totalEvents: number; pageLoads: number; diagnoses: number; conversions: number; conversionRate: number; reportDownloads?: number; }
interface ApiStats { requestsTotal: number; cacheHits: number; apiCalls: number; cacheHitRate: number; }

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'line-redirects' | 'google-tracking' | 'cache-management'>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [apiStats, setApiStats] = useState<ApiStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, []);
  const loadStats = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/admin/stats?days=7'); const data = await response.json();
      if (data.summary) { setStats({ totalSessions: data.summary.total_sessions||0, totalEvents: data.summary.total_events||0, pageLoads: data.summary.page_loads||0, diagnoses: data.summary.diagnoses||0, conversions: data.summary.conversions||0, conversionRate: parseFloat(data.summary.conversion_rate)||0, reportDownloads: data.summary.report_downloads||0 }); }
      const apiStatsResponse = await apiClient.get('/api/gemini/stats'); const apiStatsData = await apiStatsResponse.json();
      if (apiStatsData.today) { const totals = apiStatsData.today.totals; setApiStats({ requestsTotal: totals.requests_total||0, cacheHits: totals.cache_hits||0, apiCalls: totals.api_calls||0, cacheHitRate: parseFloat(apiStatsData.today.cacheHitRate)||0 }); }
    } catch (error) { console.error('統計の読み込みに失敗:', error); } finally { setLoading(false); }
  };
  const handleLogout = async () => { await adminAuth.logout(); navigate('/adsadmin'); };

  const tabs = [
    { key: 'overview' as const, icon: 'monitoring', label: '概要' },
    { key: 'sessions' as const, icon: 'group', label: 'ユーザーセッション' },
    { key: 'line-redirects' as const, icon: 'link', label: 'リダイレクト' },
    { key: 'google-tracking' as const, icon: 'ads_click', label: 'Google追跡' },
    { key: 'cache-management' as const, icon: 'database', label: 'キャッシュ管理' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-surface-container-low border-b border-outline-variant shadow-[0_0_10px_rgba(0,230,57,0.15)]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-fixed-dim/10 border border-primary-fixed-dim/30 p-2 rounded"><span className="material-symbols-outlined text-primary-fixed-dim">analytics</span></div>
              <div><h1 className="font-headline-md text-headline-md text-on-surface">管理画面</h1><p className="font-data-mono text-label-xs text-on-surface-variant">ユーザー行動分析・API監視</p></div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition font-data-mono text-data-mono">
              <span className="material-symbols-outlined text-[18px]">logout</span><span>ログアウト</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-surface-container border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 font-data-mono text-data-mono border-b-2 transition ${activeTab === tab.key ? 'border-primary-fixed-dim text-primary-fixed-dim' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">{tab.icon}</span><span>{tab.label}</span></div>
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && activeTab === 'overview' ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-surface-container-highest border-t-primary-fixed-dim"></div>
            <p className="mt-4 text-on-surface-variant font-data-mono text-data-mono">データ読み込み中...</p>
          </div>
        ) : activeTab === 'overview' ? (
          <OverviewTab stats={stats} apiStats={apiStats} />
        ) : activeTab === 'sessions' ? (
          <SessionsTab />
        ) : activeTab === 'line-redirects' ? (
          <RedirectLinksTab />
        ) : activeTab === 'google-tracking' ? (
          <GoogleTrackingTab />
        ) : (
          <CacheManagementTab />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ stats, apiStats }: { stats: Stats | null; apiStats: ApiStats | null }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">ユーザー活動統計（過去7日間）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard icon="group" label="総訪問数" value={stats?.totalSessions||0} />
          <StatCard icon="psychology" label="診断回数" value={stats?.diagnoses||0} />
          <StatCard icon="download" label="レポートDL数" value={stats?.reportDownloads||0} />
          <StatCard icon="check_circle" label="コンバージョン数" value={stats?.conversions||0} />
          <StatCard icon="trending_up" label="コンバージョン率" value={`${stats?.conversionRate.toFixed(2)||0}%`} />
        </div>
      </div>
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">API使用統計（過去24時間）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="api" label="総リクエスト数" value={apiStats?.requestsTotal||0} />
          <StatCard icon="cached" label="キャッシュヒット" value={apiStats?.cacheHits||0} />
          <StatCard icon="cloud" label="API呼び出し" value={apiStats?.apiCalls||0} />
          <StatCard icon="speed" label="キャッシュヒット率" value={`${apiStats?.cacheHitRate.toFixed(1)||0}%`} />
        </div>
      </div>
      <div className="bg-surface-container-low border border-outline-variant rounded p-6">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-4">コンバージョンファネル</h3>
        <div className="space-y-3">
          <FunnelStep label="ページ訪問" value={stats?.pageLoads||0} total={stats?.pageLoads||1} />
          <FunnelStep label="銘柄診断" value={stats?.diagnoses||0} total={stats?.pageLoads||1} />
          <FunnelStep label="LINE転換" value={stats?.conversions||0} total={stats?.pageLoads||1} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant rounded p-6">
      <div className="inline-flex p-3 rounded bg-primary-fixed-dim/10 text-primary-fixed-dim mb-3"><span className="material-symbols-outlined">{icon}</span></div>
      <p className="font-data-mono text-headline-md text-on-surface">{value}</p>
      <p className="font-data-mono text-label-xs text-on-surface-variant mt-1">{label}</p>
    </div>
  );
}

function FunnelStep({ label, value, total }: { label: string; value: number; total: number }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-body-base text-body-base text-on-surface-variant">{label}</span>
        <span className="font-data-mono text-data-mono text-primary-fixed-dim font-bold">{value} ({percentage.toFixed(1)}%)</span>
      </div>
      <div className="h-3 bg-surface-container-highest rounded overflow-hidden">
        <div className="h-full bg-primary-fixed-dim transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
