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
  <div className="min-h-screen flex items-center justify-center bg-mb-bg">
    <div className="text-center">
      <div className="inline-block animate-spin h-12 w-12 border-2 border-mb-surface-highest border-t-mb-cyan mb-4"></div>
      <p className="text-mb-on-bg text-xs font-mono uppercase">LOADING...</p>
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
