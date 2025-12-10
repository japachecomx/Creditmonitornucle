import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Credits } from './components/Credits';
import { CreditDetail } from './components/CreditDetail';
import { AddCredit } from './components/AddCredit';
import { Insurance } from './components/Insurance';
import { InsuranceDetail } from './components/InsuranceDetail';
import { AddInsurance } from './components/AddInsurance';
import { PlotRiskDetail } from './components/PlotRiskDetail';
import { RiskClimate } from './components/RiskClimate';
import { Clients } from './components/Clients';
import { Documents } from './components/Documents';
import { Settings } from './components/Settings';
import { Products } from './components/Products';

type View = 'login' | 'onboarding' | 'dashboard' | 'credits' | 'credit-detail' | 'add-credit' | 'insurance' | 'insurance-detail' | 'add-insurance' | 'plot-risk' | 'risk-climate' | 'clients' | 'documents' | 'settings' | 'products';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (!hasCompletedOnboarding) {
      setCurrentView('onboarding');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const handleNavigate = (view: View, id?: string) => {
    if (view === 'credit-detail' && id) {
      setSelectedCreditId(id);
    } else if (view === 'insurance-detail' && id) {
      setSelectedInsuranceId(id);
    } else if (view === 'plot-risk' && id) {
      setSelectedPlotId(id);
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'credits':
        return <Credits onNavigate={handleNavigate} />;
      case 'credit-detail':
        return <CreditDetail creditId={selectedCreditId} onNavigate={handleNavigate} />;
      case 'add-credit':
        return <AddCredit onNavigate={handleNavigate} />;
      case 'insurance':
        return <Insurance onNavigate={handleNavigate} />;
      case 'insurance-detail':
        return <InsuranceDetail insuranceId={selectedInsuranceId} onNavigate={handleNavigate} />;
      case 'add-insurance':
        return <AddInsurance onNavigate={handleNavigate} />;
      case 'plot-risk':
        return <PlotRiskDetail plotId={selectedPlotId} onNavigate={handleNavigate} />;
      case 'risk-climate':
        return <RiskClimate onNavigate={handleNavigate} />;
      case 'clients':
        return <Clients onNavigate={handleNavigate} />;
      case 'documents':
        return <Documents onNavigate={handleNavigate} />;
      case 'settings':
        return <Settings onNavigate={handleNavigate} />;
      case 'products':
        return <Products onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout currentView={currentView} onNavigate={handleNavigate} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
}