import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginScreen from "@/components/auth/LoginScreen";
import Dashboard from "@/components/dashboard/Dashboard";
import PatientReportForm from "@/components/reports/PatientReportForm";
import WaterTestForm from "@/components/water/WaterTestForm";
import AlertsScreen from "@/components/alerts/AlertsScreen";
import ProfileScreen from "@/components/profile/ProfileScreen";
import BottomNav from "@/components/navigation/BottomNav";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("home");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "home":
        setCurrentScreen("dashboard");
        break;
      case "reports":
        setCurrentScreen("reports");
        break;
      case "alerts":
        setCurrentScreen("alerts");
        break;
      case "profile":
        setCurrentScreen("profile");
        break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigation} />;
      case "report-patient":
        return <PatientReportForm onBack={() => setCurrentScreen("dashboard")} />;
      case "water-test":
        return <WaterTestForm onBack={() => setCurrentScreen("dashboard")} />;
      case "alerts":
        return <AlertsScreen />;
      case "profile":
        return <ProfileScreen />;
      case "reports":
        return <AlertsScreen />; // Using AlertsScreen as placeholder for reports
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginScreen onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          {renderScreen()}
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
