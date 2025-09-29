import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft,
  MessageSquare,
  Star,
  Send,
  Mic,
  AlertTriangle,
  Bug,
  Lightbulb,
  GraduationCap,
  Phone
} from "lucide-react";

interface FeedbackScreenProps {
  onBack?: () => void;
}

const FeedbackScreen = ({ onBack }: FeedbackScreenProps) => {
  const [rating, setRating] = useState(0);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91 98765 43210");
  const [priority, setPriority] = useState("");

  const issueTypes = [
    {
      id: "app-issues",
      label: "App Issues",
      description: "Bugs, crashes, or technical problems",
      icon: Bug,
      color: "text-red-500"
    },
    {
      id: "field-challenges", 
      label: "Field Challenges",
      description: "Network issues, GPS problems, or field work difficulties",
      icon: AlertTriangle,
      color: "text-orange-500"
    },
    {
      id: "feature-suggestions",
      label: "Feature Suggestions", 
      description: "Ideas for new features or improvements",
      icon: Lightbulb,
      color: "text-green-500"
    },
    {
      id: "training-content",
      label: "Training Content",
      description: "Feedback on educational materials and resources",
      icon: GraduationCap,
      color: "text-blue-500"
    }
  ];

  const priorityLevels = [
    {
      value: "low",
      label: "Low Priority",
      description: "Minor issue, can wait",
      color: "text-green-600",
      icon: "🟢"
    },
    {
      value: "medium",
      label: "Medium Priority", 
      description: "Affects daily work",
      color: "text-orange-600",
      icon: "🟡"
    },
    {
      value: "high",
      label: "High Priority",
      description: "Critical issue, needs immediate attention",
      color: "text-red-600", 
      icon: "🔴"
    }
  ];

  const toggleIssue = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        onClick={() => setRating(index + 1)}
        className={`p-1 transition-colors ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        <Star className="w-8 h-8 fill-current" />
      </button>
    ));
  };

  const handleSubmit = () => {
    console.log("Submitting feedback:", {
      rating,
      selectedIssues,
      feedback,
      phoneNumber,
      priority
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <h1 className="text-lg font-semibold">Feedback</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* Offline Notice */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-warning-foreground">Feedback will be submitted when online</span>
            </div>
          </CardContent>
        </Card>

        {/* Help Us Improve */}
        <Card className="border-accent bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-accent-foreground" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Help Us Improve</h2>
            <p className="text-sm text-muted-foreground">
              Your feedback helps us make the Health Report App better for ASHA workers like you. 
              Share your experience and challenges.
            </p>
          </CardContent>
        </Card>

        {/* Overall App Experience */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">⭐ Overall App Experience</CardTitle>
            <p className="text-sm text-muted-foreground">
              How would you rate your overall experience with the app?
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-1 mb-3">
              {renderStars()}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Tap stars to rate
            </p>
          </CardContent>
        </Card>

        {/* What would you like to report? */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">📝 What would you like to report?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {issueTypes.map((issue) => {
              const IconComponent = issue.icon;
              const isSelected = selectedIssues.includes(issue.id);
              
              return (
                <div 
                  key={issue.id}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/50"
                  }`}
                  onClick={() => toggleIssue(issue.id)}
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleIssue(issue.id)}
                  />
                  <IconComponent className={`w-5 h-5 ${issue.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{issue.label}</h4>
                    <p className="text-xs text-muted-foreground">{issue.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Tell Us More */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">💬 Tell Us More</CardTitle>
            <p className="text-sm text-muted-foreground">
              Please describe your experience or issue in detail. Your feedback helps us understand 
              your needs better.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Please describe your experience or issue in detail. Your feedback helps us understand your needs better."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="resize-none"
              />
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{feedback.length}/500 characters</span>
                <Button variant="ghost" size="sm">
                  <Mic className="w-4 h-4 mr-1" />
                  Voice Input
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">📞 Contact Information (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
              <div className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-accent">Why we ask for contact info:</p>
                  <p className="text-xs text-muted-foreground">
                    We may need to follow up on critical issues or app problems you report. 
                    Your number will not be shared.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How urgent is this issue? */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">⚠️ How urgent is this issue?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={priority} onValueChange={setPriority}>
              <div className="space-y-3">
                {priorityLevels.map((level) => (
                  <div key={level.value} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value={level.value} id={level.value} />
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-lg">{level.icon}</span>
                      <div>
                        <Label 
                          htmlFor={level.value} 
                          className={`font-medium cursor-pointer ${level.color}`}
                        >
                          {level.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{level.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-4">
            <Button 
              onClick={handleSubmit}
              className="w-full h-12 bg-primary hover:bg-primary-light"
              disabled={!rating || selectedIssues.length === 0 || !feedback.trim()}
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Feedback
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-3">
              Your feedback is confidential and helps improve the app for all ASHA workers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackScreen;