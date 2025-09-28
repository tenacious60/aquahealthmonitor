import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  FileText, 
  Droplet, 
  AlertTriangle, 
  GraduationCap,
  User,
  BarChart3,
  Clock,
  MapPin
} from "lucide-react";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const userProfile = {
    name: "Priya",
    role: "ASHA Worker",
    location: "Block PHC, Ganjam",
    avatar: "/api/placeholder/40/40"
  };

  const todayStats = [
    { label: "Cases Reported", value: "3", color: "text-primary" },
    { label: "Water Tests", value: "2", color: "text-accent" },
    { label: "New Alerts", value: "1", color: "text-emergency" }
  ];

  const quickActions = [
    {
      title: "Report Patient Case",
      subtitle: "Log symptoms & medical cases",
      icon: FileText,
      color: "bg-primary",
      path: "/report-patient"
    },
    {
      title: "Record Water Test",
      subtitle: "Water quality testing",
      icon: Droplet,
      color: "bg-accent",
      path: "/water-test"
    },
    {
      title: "View Alerts",
      subtitle: "Health notifications",
      icon: AlertTriangle,
      color: "bg-emergency",
      badge: "3 New",
      path: "/alerts"
    },
    {
      title: "Training & Awareness",
      subtitle: "Learn & educate",
      icon: GraduationCap,
      color: "bg-success",
      path: "/training"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Good Morning, {userProfile.name}</h1>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {userProfile.role} - {userProfile.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Emergency Call */}
        <Card className="border-emergency bg-emergency/5">
          <CardContent className="p-4">
            <Button className="w-full h-12 bg-emergency hover:bg-emergency/90">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Call
              <span className="ml-auto text-sm opacity-90">PHC Helpline: +91-1234567890</span>
            </Button>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="w-5 h-5 text-primary" />
              Today's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {todayStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-shadow cursor-pointer border"
                  onClick={() => onNavigate(action.path.replace('/', ''))}
                >
                  <CardContent className="p-4 text-center space-y-3">
                    <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto relative`}>
                      <action.icon className="w-6 h-6 text-white" />
                      {action.badge && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 text-xs px-1 h-5 min-w-0"
                        >
                          {action.badge.split(' ')[0]}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{action.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {action.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sync Status */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-warning-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Sync Status</p>
                  <p className="text-xs text-muted-foreground">3 reports pending sync</p>
                </div>
              </div>
              <Button size="sm" className="bg-success hover:bg-success/90">
                Sync Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;