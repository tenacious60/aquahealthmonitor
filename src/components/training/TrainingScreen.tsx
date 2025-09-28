import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  GraduationCap,
  Download,
  Play,
  CheckCircle,
  Clock,
  AlertTriangle,
  BookOpen,
  FileText,
  Headphones,
  Globe,
  Eye,
  Share
} from "lucide-react";

interface TrainingScreenProps {
  onBack?: () => void;
}

const TrainingScreen = ({ onBack }: TrainingScreenProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const languages = [
    { code: "english", name: "English", active: true },
    { code: "hindi", name: "हिंदी", active: false },
    { code: "odia", name: "ଓଡ଼ିଆ", active: false },
    { code: "kannada", name: "Kui", active: false }
  ];

  const trainingModules = [
    {
      id: 1,
      title: "Proper Handwashing",
      description: "Essential cleanliness habits",
      duration: "5 min read",
      status: "completed",
      category: "hygiene",
      icon: "✋",
      hasAudio: true,
      hasDownload: true,
      color: "bg-success"
    },
    {
      id: 2, 
      title: "Safe Water Storage",
      description: "Water container management",
      duration: "3 min read", 
      status: "completed",
      category: "hygiene",
      icon: "💧",
      hasAudio: true,
      hasDownload: true,
      color: "bg-success"
    },
    {
      id: 3,
      title: "Food Safety Basics",
      description: "Prevent food contamination",
      duration: "4 min read",
      status: "downloading",
      category: "hygiene", 
      icon: "🍽️",
      hasAudio: true,
      hasDownload: true,
      color: "bg-warning",
      progress: 65
    },
    {
      id: 4,
      title: "Personal Hygiene",
      description: "Daily health practices",
      duration: "6 min read",
      status: "available",
      category: "hygiene",
      icon: "🧼",
      hasAudio: false,
      hasDownload: true,
      color: "bg-muted"
    },
    {
      id: 5,
      title: "Disease Prevention",
      description: "Protect against waterborne diseases", 
      duration: "8 min read",
      status: "priority",
      category: "disease",
      icon: "🛡️",
      hasAudio: true,
      hasDownload: true,
      color: "bg-emergency",
      modules: 3
    },
    {
      id: 6,
      title: "Cholera Prevention", 
      description: "Specific prevention methods",
      duration: "7 min read",
      status: "completed",
      category: "disease",
      icon: "⚕️",
      hasAudio: true,
      hasDownload: true,
      color: "bg-success"
    },
    {
      id: 7,
      title: "Typhoid Prevention",
      description: "Prevention and awareness",
      duration: "5 min read", 
      status: "available",
      category: "disease",
      icon: "💊",
      hasAudio: true,
      hasDownload: true,
      color: "bg-muted"
    },
    {
      id: 8,
      title: "Hepatitis A Prevention",
      description: "Liver infection prevention",
      duration: "6 min read",
      status: "available", 
      category: "disease",
      icon: "🔬",
      hasAudio: true,
      hasDownload: true,
      color: "bg-muted"
    }
  ];

  const visualResources = [
    {
      id: 1,
      title: "Handwashing Steps Poster",
      type: "PDF",
      size: "2.1 MB",
      status: "downloaded",
      icon: "📋"
    },
    {
      id: 2,
      title: "Water Safety Infographic", 
      type: "PDF",
      size: "1.8 MB",
      status: "available",
      icon: "📊"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "downloading":
        return <Download className="w-4 h-4 text-warning animate-pulse" />;
      case "priority":
        return <AlertTriangle className="w-4 h-4 text-emergency" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string, modules?: number) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="text-success border-success">✅ Downloaded</Badge>;
      case "downloading":
        return <Badge variant="outline" className="text-warning border-warning">⬇️ Downloading...</Badge>;
      case "priority":
        return <Badge variant="outline" className="text-emergency border-emergency">{modules} Modules</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Tap to download</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <h1 className="text-lg font-semibold">Training & Awareness</h1>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>

          {/* Download Status */}
          <Card className="border-success bg-success/5 mb-0">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-success-foreground">5 training modules downloaded for offline use</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Language Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="w-5 h-5 text-primary" />
              Select Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={lang.active ? "default" : "outline"}
                  className={`h-12 ${lang.active ? "bg-primary" : ""}`}
                  onClick={() => setSelectedLanguage(lang.code)}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audio Guide */}
        <Card className="border-accent bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Audio Guide Available</h3>
                <p className="text-xs text-muted-foreground">Listen to key hygiene practices</p>
              </div>
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                <Headphones className="w-4 h-4 mr-1" />
                Listen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hygiene Practices */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="w-5 h-5 text-primary" />
              Hygiene Practices
              <Badge variant="secondary" className="ml-auto bg-success text-success-foreground">
                4 Modules
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trainingModules.filter(m => m.category === "hygiene").map((module) => (
              <Card key={module.id} className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{module.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-sm">{module.title}</h4>
                          <p className="text-xs text-muted-foreground">{module.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{module.duration}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {module.hasAudio && <Headphones className="w-3 h-3 text-muted-foreground" />}
                          {getStatusIcon(module.status)}
                        </div>
                      </div>
                      
                      {module.status === "downloading" && module.progress && (
                        <div className="mt-2">
                          <Progress value={module.progress} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-1">{module.progress}% downloaded</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        {getStatusBadge(module.status)}
                        {module.hasDownload && (
                          <Button size="sm" variant="ghost">
                            <Download className="w-3 h-3 mr-1" />
                            <span className="text-xs">Download</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Disease Prevention */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="w-5 h-5 text-emergency" />
              Disease Prevention
              <Badge variant="secondary" className="ml-auto bg-emergency text-emergency-foreground">
                3 Modules
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trainingModules.filter(m => m.category === "disease").map((module) => (
              <Card key={module.id} className={`border shadow-sm ${module.status === "priority" ? "border-emergency" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{module.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-sm">{module.title}</h4>
                          <p className="text-xs text-muted-foreground">{module.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{module.duration}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {module.hasAudio && <Headphones className="w-3 h-3 text-muted-foreground" />}
                          {getStatusIcon(module.status)}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        {getStatusBadge(module.status, module.modules)}
                        {module.hasDownload && (
                          <Button size="sm" variant="ghost">
                            <Download className="w-3 h-3 mr-1" />
                            <span className="text-xs">Download</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Visual Resources */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="w-5 h-5 text-primary" />
              Visual Resources
              <Badge variant="secondary" className="ml-auto bg-primary text-primary-foreground">
                PDFs
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {visualResources.map((resource) => (
              <Card key={resource.id} className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{resource.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-sm">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-3 h-3 text-muted-foreground" />
                          <Share className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className={resource.status === "downloaded" ? "text-success border-success" : "text-muted-foreground"}>
                          {resource.status === "downloaded" ? "✅ Downloaded" : "Tap to download"}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3 mr-1" />
                          <span className="text-xs">Download</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Download All */}
        <Card className="border-accent bg-accent/5">
          <CardContent className="p-4">
            <Button className="w-full h-12 bg-accent hover:bg-accent/90">
              <Download className="w-5 h-5 mr-2" />
              Download All Training Materials
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingScreen;