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
import { supabase } from './lib/supabase';

type View = 'login' | 'onboarding' | 'dashboard' | 'credits' | 'credit-detail' | 'add-credit' | 'insurance' | 'insurance-detail' | 'add-insurance' | 'plot-risk' | 'risk-climate' | 'clients' | 'documents' | 'settings' | 'products';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkUserProfile = async (userId: string, maxRetries = 3) => {
    console.log('Checking profile for user:', userId);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`Profile check attempt ${attempt}/${maxRetries}`);

      const { data: profileData, error: profileError } = await supabase
        .rpc('get_user_profile_status', { user_id: userId });

      if (profileError) {
        console.error(`Attempt ${attempt} - Error fetching profile:`, profileError);

        if (attempt < maxRetries) {
          console.log(`Waiting 2 seconds before retry...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }

        throw new Error(`Error al verificar perfil: ${profileError.message}`);
      }

      if (!profileData || profileData.length === 0) {
        console.log(`Attempt ${attempt} - No profile found yet`);

        if (attempt < maxRetries) {
          console.log(`Waiting 2 seconds for profile creation...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }

        throw new Error('No se pudo crear tu perfil de usuario. Por favor, contacta al administrador.');
      }

      const profile = profileData[0];

      if (!profile.active) {
        throw new Error('Tu cuenta ha sido desactivada. Contacta al administrador.');
      }

      console.log('Profile found and active:', profile);
      return profile.active;
    }

    throw new Error('No se pudo verificar tu perfil después de varios intentos.');
  };

  useEffect(() => {
    let isProcessing = false;

    const checkAndSetupUser = async (session: any) => {
      if (isProcessing || !session?.user) return;

      isProcessing = true;
      setLoading(true);

      try {
        console.log('Processing user session:', session.user.id);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const hasProfile = await checkUserProfile(session.user.id);

        if (hasProfile) {
          console.log('User authenticated successfully');
          setIsAuthenticated(true);
          setHasCompletedOnboarding(true);
          setCurrentView('dashboard');
        }
      } catch (err: any) {
        console.error('Error during authentication:', err);
        alert(`Error al autenticar: ${err.message}`);
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setHasCompletedOnboarding(false);
        setCurrentView('login');
      } finally {
        setLoading(false);
        isProcessing = false;
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);

      if (event === 'SIGNED_IN' && session) {
        await checkAndSetupUser(session);
      } else if (event === 'SIGNED_OUT') {
        isProcessing = false;
        setLoading(false);
        setIsAuthenticated(false);
        setHasCompletedOnboarding(false);
        setCurrentView('login');
      } else if (event === 'INITIAL_SESSION' && session) {
        await checkAndSetupUser(session);
      } else if (event === 'TOKEN_REFRESHED' && session) {
        if (!isAuthenticated) {
          await checkAndSetupUser(session);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      isProcessing = false;
    };
  }, [isAuthenticated]);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
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

  if (loading) {
    const hasOAuthParams = window.location.hash.includes('access_token') ||
                          window.location.search.includes('code=');

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 text-lg font-medium">
            {hasOAuthParams ? 'Completando autenticación...' : 'Cargando...'}
          </p>
        </div>
      </div>
    );
  }

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