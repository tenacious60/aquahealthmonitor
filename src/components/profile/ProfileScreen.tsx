import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useAlerts } from '@/hooks/useAlerts';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  MapPin, 
  Settings, 
  Bell, 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Globe, 
  RefreshCw, 
  MessageSquare,
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Archive, 
  ChevronRight,
  Info,
  Camera,
  Image,
  LogOut,
  Edit,
  Save,
  X,
  Shield,
  Moon,
  Sun,
  Palette,
  Navigation,
  Eye,
  EyeOff
} from 'lucide-react';

interface ProfileScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    full_name: '',
    address: '',
    pincode: ''
  });
  const [alertFilter, setAlertFilter] = useState<'all' | 'today' | 'yesterday' | 'unread'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user, signOut } = useAuth();
  const { profile, settings, loading, updateProfile, updateSettings, uploadProfileImage } = useProfile();
  const { alerts, unreadCount, markAsRead, filterAlerts } = useAlerts();
  const { toast } = useToast();

  React.useEffect(() => {
    if (profile && !editedProfile.full_name) {
      setEditedProfile({
        full_name: profile.full_name || '',
        address: profile.address || '',
        pincode: profile.pincode || ''
      });
    }
  }, [profile]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    }
  };

  const handleSaveProfile = async () => {
    const { error } = await updateProfile(editedProfile);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const { error } = await uploadProfileImage(file);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile image updated",
      });
    }
  };

  const openCamera = () => {
    // Request camera access
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        toast({
          title: "Camera",
          description: "Camera access granted. Feature in development.",
        });
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(() => {
        toast({
          title: "Camera Error",
          description: "Could not access camera",
          variant: "destructive"
        });
      });
  };

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location",
            description: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`,
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Could not access location",
            variant: "destructive"
          });
        }
      );
    }
  };

  const makeEmergencyCall = () => {
    const emergencyNumber = settings?.emergency_contact || '911';
    window.location.href = `tel:${emergencyNumber}`;
  };

  const getLoginTimeInfo = () => {
    if (!profile?.last_login_at) return null;
    
    const loginTime = new Date(profile.last_login_at);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - loginTime.getTime()) / (1000 * 60 * 60));
    
    return {
      time: loginTime.toLocaleTimeString(),
      timeAgo: formatDistanceToNow(loginTime, { addSuffix: true }),
      hoursAgo: diffHours
    };
  };

  const loginInfo = getLoginTimeInfo();
  const filteredAlerts = filterAlerts(alertFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* User Profile Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile?.profile_image_url || ''} />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Profile Photo</DialogTitle>
                      <DialogDescription>
                        Choose how you'd like to update your profile photo
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <Button onClick={openCamera} variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                      <Button onClick={openGallery} variant="outline">
                        <Image className="h-4 w-4 mr-2" />
                        Choose from Gallery
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editedProfile.full_name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, full_name: e.target.value }))}
                      placeholder="Full name"
                    />
                    <Input
                      value={editedProfile.address}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Address"
                    />
                    <Input
                      value={editedProfile.pincode}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, pincode: e.target.value }))}
                      placeholder="Pincode"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold">{profile?.full_name || 'User'}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      {loginInfo && (
                        <Badge variant="secondary" className="text-xs">
                          Last login: {loginInfo.timeAgo}
                        </Badge>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button onClick={makeEmergencyCall} variant="outline" size="sm" className="h-auto p-3 flex-col gap-2">
            <Phone className="h-5 w-5 text-emergency" />
            <span className="text-xs">Emergency</span>
          </Button>
          <Button onClick={getLocation} variant="outline" size="sm" className="h-auto p-3 flex-col gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            <span className="text-xs">Location</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-auto p-3 flex-col gap-2">
                <Camera className="h-5 w-5 text-accent" />
                <span className="text-xs">Camera</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Camera Options</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={openCamera} variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button onClick={openGallery} variant="outline">
                  <Image className="h-4 w-4 mr-2" />
                  Gallery
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Profile Details */}
        {profile && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Full Name</span>
                <span className="text-sm font-medium">{profile.full_name || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Address</span>
                <span className="text-sm font-medium">{profile.address || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pincode</span>
                <span className="text-sm font-medium">{profile.pincode || 'Not set'}</span>
              </div>
              {loginInfo && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Login Time Today</span>
                  <span className="text-sm font-medium">{loginInfo.time}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="language">Language</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Get alerts for critical issues</p>
                  </div>
                  <Switch 
                    checked={settings?.notifications_enabled || false}
                    onCheckedChange={(checked) => updateSettings({ notifications_enabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Auto Sync</p>
                    <p className="text-xs text-muted-foreground">Automatically sync data</p>
                  </div>
                  <Switch 
                    checked={settings?.auto_sync || false}
                    onCheckedChange={(checked) => updateSettings({ auto_sync: checked })}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Location Access</p>
                    <p className="text-xs text-muted-foreground">Allow GPS location access</p>
                  </div>
                  <Switch 
                    checked={settings?.privacy_location || false}
                    onCheckedChange={(checked) => updateSettings({ privacy_location: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Camera Access</p>
                    <p className="text-xs text-muted-foreground">Allow camera access</p>
                  </div>
                  <Switch 
                    checked={settings?.privacy_camera || false}
                    onCheckedChange={(checked) => updateSettings({ privacy_camera: checked })}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="theme" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <Select 
                    value={profile?.theme || 'light'} 
                    onValueChange={(value) => updateProfile({ theme: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Palette className="h-4 w-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="language" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Label>Language</Label>
                  <Select 
                    value={profile?.language || 'en'} 
                    onValueChange={(value) => updateProfile({ language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Alerts {unreadCount > 0 && <Badge variant="secondary">{unreadCount}</Badge>}
              </CardTitle>
              <Select value={alertFilter} onValueChange={(value: any) => setAlertFilter(value)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-60 overflow-y-auto">
            {filteredAlerts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No alerts found</p>
            ) : (
              filteredAlerts.map((alert) => (
                <Dialog key={alert.id}>
                  <DialogTrigger asChild>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`h-2 w-2 rounded-full ${alert.is_read ? 'bg-muted-foreground' : 'bg-primary'}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{alert.title}</DialogTitle>
                      <DialogDescription>
                        {new Date(alert.created_at).toLocaleString()}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>{alert.message}</p>
                      <div className="flex gap-2">
                        {!alert.is_read && (
                          <Button onClick={() => markAsRead(alert.id)} size="sm">
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))
            )}
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="h-4 w-4" />
              App Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">2.1.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Build</span>
              <span className="text-sm font-medium">240929</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Update</span>
              <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileScreen;