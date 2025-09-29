import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { formatDistanceToNow } from 'date-fns';
import { Zap, Clock, User } from 'lucide-react';

export const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    if (user && profile) {
      // Show welcome popup when user logs in
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, profile]);

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

  if (!user || !profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Welcome back, {profile.full_name || 'User'}!
          </DialogTitle>
          <DialogDescription className="text-center">
            You've successfully logged into AquaHealth Monitor
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Profile Status</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Badge variant={profile.address ? "default" : "secondary"} className="justify-center">
                {profile.address ? "Address Set" : "Add Address"}
              </Badge>
              <Badge variant={profile.profile_image_url ? "default" : "secondary"} className="justify-center">
                {profile.profile_image_url ? "Photo Added" : "Add Photo"}
              </Badge>
            </div>
          </div>
          
          {loginInfo && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Login Information</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Today at {loginInfo.time}</p>
                <p>Last login: {loginInfo.timeAgo}</p>
                {loginInfo.hoursAgo > 0 && (
                  <p className="text-xs">Session active for {loginInfo.hoursAgo} hours</p>
                )}
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Continue
            </Button>
            <Button 
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Complete Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};