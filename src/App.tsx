import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeGoogleTracking } from './lib/googleTracking';

const RefactoredHome = lazy(() => import('./pages/RefactoredHome'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const SpecifiedCommercialTransactionAct = lazy(() => import('./pages/SpecifiedCommercialTransactionAct'));
const CompanyInfo = lazy(() => import('./pages/CompanyInfo'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-cx-bg">
    <div className="text-center">
      <div className="inline-block animate-spin h-12 w-12 brutal-border border-t-cx-pink" style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: '#001c3a', borderTopColor: '#e4006c' }}></div>
      <p className="text-cx-on-bg text-xs font-display uppercase mt-4" style={{ fontWeight: 800, letterSpacing: '0.05em' }}>LOADING...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => { initializeGoogleTracking(); }, []);
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<RefactoredHome />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/specified-commercial-transaction-act" element={<SpecifiedCommercialTransactionAct />} />
        <Route path="/company" element={<CompanyInfo />} />
        <Route path="/adsadmin" element={<AdminLogin />} />
        <Route path="/adsadmin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  );
}

export default App;
