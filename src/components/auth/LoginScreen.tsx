import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Shield } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      setShowOTP(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* App Icon and Title */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {showOTP ? "Verify OTP" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground">
            {showOTP 
              ? "Enter the 6-digit code sent to your phone"
              : "Enter your phone number to continue"
            }
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Smartphone className="w-4 h-4" />
              {showOTP ? "OTP Verification" : "Phone Number"}
            </div>
            {/* Demo Credentials */}
            <div className="mt-3 p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
              <h3 className="text-sm font-semibold text-foreground mb-1">Demo Credentials</h3>
              <p className="text-xs text-muted-foreground">
                {showOTP 
                  ? "Use OTP: 123456" 
                  : "Mobile: 9876543210"
                }
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!showOTP ? (
              <>
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      +91
                    </div>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-12 h-12"
                      maxLength={10}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSendOTP}
                  className="w-full h-12 bg-primary hover:bg-primary-light"
                  disabled={phoneNumber.length < 10}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    className="text-center text-lg tracking-widest h-12"
                    maxLength={6}
                  />
                  <div className="flex justify-between items-center text-sm">
                    <button className="text-primary font-medium">
                      Resend OTP
                    </button>
                    <span className="text-muted-foreground">2:00</span>
                  </div>
                </div>
                <Button 
                  onClick={handleVerifyOTP}
                  className="w-full h-12 bg-primary hover:bg-primary-light"
                  disabled={otp.length !== 6}
                >
                  Verify & Continue
                </Button>
              </>
            )}

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <button className="text-primary underline">Terms of Service</button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Language Selection */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">Available in</p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              English
            </Badge>
            <Badge variant="outline">हिंदी</Badge>
            <Badge variant="outline">తెలుగు</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
