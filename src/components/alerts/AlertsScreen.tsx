import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  AlertTriangle, 
  Info, 
  Droplet,
  Siren,
  Calendar,
  MapPin,
  Download,
  Share,
  Clock
} from "lucide-react";

interface AlertsScreenProps {
  onBack?: () => void;
}

const AlertsScreen = ({ onBack }: AlertsScreenProps) => {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Cholera Outbreak Alert",
      description: "7 confirmed cholera cases reported in Ganjam District. Immediate water source testing and patient screening required in affected villages.",
      location: "Ganjam District",
      time: "2 hrs ago",
      priority: "CRITICAL - Immediate Action Required",
      actions: ["Emergency Contact", "View Details"],
      icon: Siren,
      color: "bg-emergency",
      borderColor: "border-emergency"
    },
    {
      id: 2,
      type: "advisory",
      title: "Monsoon Health Advisory",
      description: "Heavy rainfall expected, increased risk of waterborne diseases. Enhanced surveillance and water quality monitoring recommended.",
      location: "State-wide",
      time: "1 day ago",
      priority: "ADVISORY - Preventive Measures",
      actions: ["Download Guidelines", "Share"],
      icon: Info,
      color: "bg-accent",
      borderColor: "border-accent"
    },
    {
      id: 3,
      type: "reminder",
      title: "Daily Hygiene Reminder",
      description: "Promote 20-second handwashing with soap before meals and after using toilet. Critical for preventing disease transmission.",
      location: "Community Focus",
      time: "Daily",
      priority: "REMINDER - Health Promotion",
      actions: ["Mark as Done", "Snooze"],
      icon: Clock,
      color: "bg-success",
      borderColor: "border-success"
    },
    {
      id: 4,
      type: "warning",
      title: "Water Quality Alert",
      description: "High bacteria levels detected in Village Well #3. Immediate alternative source identification and treatment required.",
      location: "Rural Area",
      time: "1 day ago",
      priority: "WARNING - Quality Issue",
      actions: ["Schedule Retest", "Report Issue"],
      icon: Droplet,
      color: "bg-warning",
      borderColor: "border-warning"
    }
  ];

  const filterCounts = {
    all: alerts.length,
    unread: 2,
    today: 3
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
                </Button>
              )}
              <h1 className="text-lg font-semibold">Health Alerts</h1>
            </div>
            <Badge variant="secondary" className="bg-emergency text-emergency-foreground">
              {filterCounts.unread} New
            </Badge>
          </div>

          {/* Offline Notice */}
          <Card className="border-warning bg-warning/5 mb-0">
            <CardContent className="p-3">
              
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span className="text-foreground font-semibold ml-3">Working offline - Alerts cached locally</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-emergency">{filterCounts.all}</div>
              <div className="text-xs text-muted-foreground">Active Alerts</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-accent">5</div>
              <div className="text-xs text-muted-foreground">Advisories</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-success">2</div>
              <div className="text-xs text-muted-foreground">Reminders</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="bg-primary">
            All Alerts
          </Button>
          <Button variant="outline" size="sm">
            Unread
          </Button>
          <Button variant="outline" size="sm">
            Today
          </Button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const IconComponent = alert.icon;
            
            return (
              <Card key={alert.id} className={`${alert.borderColor} border-l-4 shadow-sm`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${alert.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-semibold leading-tight">
                          {alert.title}
                        </CardTitle>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {alert.time}
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 text-xs ${alert.color.replace('bg-', 'text-')} border-current`}
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3" />
                    {alert.location}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {alert.actions.map((action, index) => (
                      <Button 
                        key={index}
                        variant={index === 0 ? "default" : "outline"} 
                        size="sm"
                        className={index === 0 ? alert.color.replace('bg-', 'bg-') : ""}
                      >
                        {action === "Download Guidelines" && <Download className="w-3 h-3 mr-1" />}
                        {action === "Share" && <Share className="w-3 h-3 mr-1" />}
                        {action === "Emergency Contact" && <Siren className="w-3 h-3 mr-1" />}
                        {action === "View Details" && <Info className="w-3 h-3 mr-1" />}
                        {action === "Mark as Done" && <Clock className="w-3 h-3 mr-1" />}
                        <span className="text-xs">{action}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlertsScreen;