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
  const [loading, setLoading] = useState(true);

  const checkUserProfile = async (userId: string) => {
    console.log('Checking profile for user:', userId);

    const { data: existingProfile, error: selectError } = await supabase
      .from('user_profiles')
      .select('id, active')
      .eq('id', userId)
      .maybeSingle();

    if (selectError) {
      console.error('Error fetching profile:', selectError);
      throw new Error('Error al verificar el perfil de usuario');
    }

    if (!existingProfile) {
      console.log('No profile found - waiting for trigger to create it');
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { data: retryProfile } = await supabase
        .from('user_profiles')
        .select('id, active')
        .eq('id', userId)
        .maybeSingle();

      if (!retryProfile) {
        throw new Error('Usuario no registrado en el sistema');
      }

      if (!retryProfile.active) {
        throw new Error('Tu cuenta ha sido desactivada. Contacta al administrador.');
      }

      return retryProfile.active;
    }

    if (!existingProfile.active) {
      throw new Error('Tu cuenta ha sido desactivada. Contacta al administrador.');
    }

    console.log('Profile found and active');
    return existingProfile.active;
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
        }

        if (session && session.user) {
          console.log('Active session found:', session);

          const hasProfile = await checkUserProfile(session.user.id);

          if (hasProfile) {
            setIsAuthenticated(true);
            setHasCompletedOnboarding(true);
            setCurrentView('dashboard');
          }
        }
      } catch (err) {
        console.error('Error in checkSession:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);

      if (event === 'SIGNED_IN' && session && session.user) {
        try {
          console.log('SIGNED_IN event detected', session.user);

          const hasProfile = await checkUserProfile(session.user.id);

          console.log('Has profile:', hasProfile);

          if (hasProfile) {
            console.log('Setting authenticated state');
            setIsAuthenticated(true);
            setHasCompletedOnboarding(true);
            setCurrentView('dashboard');
            setLoading(false);
          }
        } catch (err: any) {
          console.error('Error checking user profile:', err);
          console.error('Error message:', err.message);
          alert(`Error al autenticar: ${err.message}`);
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          setHasCompletedOnboarding(false);
          setCurrentView('login');
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setHasCompletedOnboarding(false);
        setCurrentView('login');
      } else if (event === 'TOKEN_REFRESHED' && session) {
        setIsAuthenticated(true);
      } else if (session && session.user) {
        try {
          const hasProfile = await checkUserProfile(session.user.id);

          if (hasProfile) {
            setIsAuthenticated(true);
            setHasCompletedOnboarding(true);
            setCurrentView('dashboard');
          }
        } catch (err) {
          console.error('Error checking user profile:', err);
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          setHasCompletedOnboarding(false);
          setCurrentView('login');
        }
      } else {
        setIsAuthenticated(false);
        setHasCompletedOnboarding(false);
        setCurrentView('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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