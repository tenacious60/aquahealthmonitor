import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

// Import screens
import { AuthScreen } from '@/components/auth/AuthScreen';
import Dashboard from '@/components/dashboard/Dashboard';
import PatientReportForm from '@/components/reports/PatientReportForm';
import ReportsHistory from '@/components/reports/ReportsHistory';
import WaterTestForm from '@/components/water/WaterTestForm';
import TrainingScreen from '@/components/training/TrainingScreen';
import AlertsScreen from '@/components/alerts/AlertsScreen';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';
import ProfileScreen from '@/components/profile/ProfileScreen';
import BottomNav from '@/components/navigation/BottomNav';
import { WelcomePopup } from '@/components/profile/WelcomePopup';

// Create a client for React Query
const queryClient = new QueryClient();

function AppContent() {
  // State management
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, loading } = useAuth();
  const { profile } = useProfile();

  // Event handlers
  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('dashboard');
    } else if (tab === 'reports') {
      setCurrentScreen('reports');
    } else if (tab === 'alerts') {
      setCurrentScreen('alerts');
    } else if (tab === 'profile') {
      setCurrentScreen('profile');
    }
  };

  // Apply theme based on profile selection
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (mode: string | undefined | null) => {
      if (mode === 'dark') {
        root.classList.add('dark');
      } else if (mode === 'light') {
        root.classList.remove('dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) root.classList.add('dark');
        else root.classList.remove('dark');
      }
    };
    applyTheme(profile?.theme);
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => applyTheme(profile?.theme);
    mql.addEventListener?.('change', listener);
    return () => mql.removeEventListener?.('change', listener);
  }, [profile?.theme]);

  // Screen rendering logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'report-patient':
        return <PatientReportForm onBack={() => setCurrentScreen('dashboard')} />;
      case 'water-test':
        return <WaterTestForm onBack={() => setCurrentScreen('dashboard')} />;
      case 'alerts':
        return <AlertsScreen />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigation} />;
      case 'reports':
        return <ReportsHistory />;
      case 'training':
        return <TrainingScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'feedback':
        return <FeedbackScreen onBack={() => setCurrentScreen('profile')} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Conditional rendering based on authentication and current screen
  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="App">
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <WelcomePopup 
        onCompleteProfile={() => {
          sessionStorage.setItem('startProfileEdit', 'true');
          setCurrentScreen('profile');
          setActiveTab('profile');
        }}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;