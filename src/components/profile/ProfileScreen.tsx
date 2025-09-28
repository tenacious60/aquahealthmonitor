import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  User, 
  Settings,
  Globe,
  Volume2,
  RefreshCw,
  HelpCircle,
  LogOut,
  Edit,
  Phone,
  MapPin,
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff
} from "lucide-react";

interface ProfileScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

const ProfileScreen = ({ onBack, onNavigate }: ProfileScreenProps) => {
  const userProfile = {
    name: "Priya Sharma",
    role: "ASHA Worker",
    phone: "+91 98765 43210",
    area: "Bhadrak District, Odisha",
    ashaId: "ASHA-ODI-2024-5678",
    activeSince: "March 2024",
    avatar: "/api/placeholder/80/80"
  };

  const userStats = [
    { label: "Cases Reported", value: "47", period: "Total" },
    { label: "Water Tests", value: "23", period: "This Month" },
    { label: "Days Active", value: "12", period: "This Month" }
  ];

  const settingsData = [
    {
      category: "Language Settings",
      icon: Globe,
      items: [
        { 
          type: "radio", 
          label: "App Language", 
          value: "English", 
          options: ["English", "हिंदी (Hindi)", "ଓଡ଼ିଆ (Odia)", "ಕನ್ನಡ (Kannada)"] 
        }
      ]
    },
    {
      category: "Data Synchronization",
      icon: RefreshCw,
      items: [
        { type: "switch", label: "Auto Sync", value: true, description: "Sync when connected to internet" },
        { type: "info", label: "Last Sync", value: "2 hours ago", status: "success" },
        { type: "action", label: "Manual Sync Now", action: "sync" }
      ]
    },
    {
      category: "Notifications",
      icon: Volume2,
      items: [
        { type: "switch", label: "Audio Support Available", value: true, description: "Voice prompts and notifications are available in your selected language" }
      ]
    }
  ];

  const appInfo = {
    version: "v2.1.3",
    buildNumber: "2024.03.15",
    storageUsed: "24.7 MB",
    offlineData: "12.3 MB"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <h1 className="text-lg font-semibold">Profile & Settings</h1>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Offline Notice */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-warning-foreground">Profile changes will sync when online</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{userProfile.name}</h2>
                <p className="text-sm text-muted-foreground">{userProfile.role}</p>
                <Badge variant="secondary" className="mt-1 bg-success text-success-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active since {userProfile.activeSince}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {userStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground opacity-75">{stat.period}</div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile Information
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{userProfile.phone}</span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{userProfile.area}</span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">ASHA ID: {userProfile.ashaId}</span>
            </div>
          </CardContent>
        </Card>

        {/* Settings Sections */}
        {settingsData.map((section, index) => {
          const IconComponent = section.icon;
          
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <IconComponent className="w-5 h-5 text-primary" />
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">{item.label}</Label>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      )}
                    </div>
                    
                    {item.type === "switch" && (
                      <Switch checked={item.value} />
                    )}
                    
                    {item.type === "radio" && (
                      <Button variant="outline" size="sm">
                        {item.value}
                      </Button>
                    )}
                    
                    {item.type === "info" && (
                      <div className="flex items-center gap-2">
                        {item.status === "success" && <CheckCircle className="w-4 h-4 text-success" />}
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      </div>
                    )}
                    
                    {item.type === "action" && (
                      <Button size="sm" className="bg-primary hover:bg-primary-light">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        {item.action === "sync" ? "Sync Now" : item.label}
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}

        {/* Pending Items */}
        <Card className="border-warning bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="w-5 h-5 text-warning" />
              Pending Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">3 reports waiting to sync + 1 feedback pending</p>
                <p className="text-xs text-muted-foreground">Will sync automatically when online</p>
              </div>
              <Badge variant="outline" className="text-warning border-warning">
                4 Items
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="w-5 h-5 text-primary" />
              App Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">App Version</span>
                <p className="font-medium">{appInfo.version}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Build Number</span>
                <p className="font-medium">{appInfo.buildNumber}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Storage Used</span>
                <p className="font-medium">{appInfo.storageUsed}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Offline Data</span>
                <p className="font-medium">{appInfo.offlineData}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Check for Updates
            </Button>
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12"
              onClick={() => onNavigate?.("feedback")}
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Feedback & Support</div>
                <div className="text-xs text-muted-foreground">Share your experience, report issues</div>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start h-12">
              <Settings className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Privacy & Security</div>
                <div className="text-xs text-muted-foreground">Data protection settings</div>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start h-12 text-destructive hover:text-destructive">
              <LogOut className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Logout</div>
                <div className="text-xs opacity-75">Sign out of the app</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileScreen;