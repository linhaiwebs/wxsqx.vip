import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
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
  <div className="min-h-screen flex items-center justify-center bg-qsdj-bg kitsch-pattern">
    <div className="text-center">
      <div className="inline-block animate-spin h-12 w-12 border-4 border-qsdj-surface-highest border-t-qsdj-magenta mb-4" style={{ borderRadius: 0 }}></div>
      <p className="text-qsdj-on-bg text-lg font-display uppercase tracking-widest">LOADING...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    initializeGoogleTracking();
  }, []);

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<RefactoredHome />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/specified-commercial-transaction-act" element={<SpecifiedCommercialTransactionAct />} />
          <Route path="/company" element={<CompanyInfo />} />

          {/* Admin Routes */}
          <Route path="/adsadmin" element={<AdminLogin />} />
          <Route
            path="/adsadmin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
