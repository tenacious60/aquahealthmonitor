import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  FileText, 
  Droplet,
  User,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Filter
} from "lucide-react";

interface ReportsHistoryProps {
  onBack?: () => void;
}

const ReportsHistory = ({ onBack }: ReportsHistoryProps) => {
  const [activeTab, setActiveTab] = useState("patient-cases");
  const [filterStatus, setFilterStatus] = useState("all");

  const patientReports = [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      gender: "Male",
      age: 34,
      symptoms: ["Diarrhea", "Fever", "Vomiting"],
      location: "Ganjam District",
      date: "Today, 2:30 PM",
      status: "pending",
      hasPhoto: true,
      priority: "high"
    },
    {
      id: 2,
      patientName: "Priya Sharma",
      gender: "Female", 
      age: 28,
      symptoms: ["Stomach Pain", "Nausea"],
      location: "Chhatrapur Block",
      date: "Yesterday, 11:15 AM",
      status: "synced",
      hasPhoto: false,
      priority: "medium"
    },
    {
      id: 3,
      patientName: "Amit Patel",
      gender: "Male",
      age: 45,
      symptoms: ["Cholera confirmed"],
      location: "Kukudakhandi Block",
      date: "2 days ago",
      status: "verified",
      hasPhoto: true,
      priority: "critical",
      medicalNote: "Confirmed cholera case. Patient treated and recovered. Contact tracing completed."
    },
    {
      id: 4,
      patientName: "Sunita Devi",
      gender: "Female",
      age: 52,
      symptoms: ["Dehydration", "Weakness"],
      location: "Rural Area",
      date: "Today, 9:45 AM", 
      status: "pending",
      hasPhoto: false,
      priority: "medium",
      networkIssue: true
    }
  ];

  const waterReports = [
    {
      id: 1,
      sourceName: "Village Well #1",
      sourceType: "Well",
      testDate: "Today, 1:00 PM",
      phLevel: 7.2,
      turbidity: "Clear",
      bacteria: "No",
      location: "Village Center",
      status: "completed",
      quality: "good"
    },
    {
      id: 2,
      sourceName: "Community Pond",
      sourceType: "Pond", 
      testDate: "Yesterday, 3:30 PM",
      phLevel: 6.8,
      turbidity: "Slightly Cloudy",
      bacteria: "Yes",
      location: "North Village",
      status: "action-required",
      quality: "poor"
    }
  ];

  const getStatusBadge = (status: string, priority?: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-warning border-warning">⏳ Pending Sync</Badge>;
      case "synced":
        return <Badge variant="outline" className="text-success border-success">✅ Synced</Badge>;
      case "verified":
        return <Badge variant="outline" className="text-accent border-accent">🔍 Verified</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-success border-success">✅ Completed</Badge>;
      case "action-required":
        return <Badge variant="outline" className="text-emergency border-emergency">⚠️ Action Required</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSymptomBadge = (symptom: string) => {
    const symptomColors: { [key: string]: string } = {
      "Diarrhea": "bg-red-100 text-red-800",
      "Fever": "bg-orange-100 text-orange-800", 
      "Vomiting": "bg-red-100 text-red-800",
      "Stomach Pain": "bg-orange-100 text-orange-800",
      "Nausea": "bg-red-100 text-red-800",
      "Dehydration": "bg-red-100 text-red-800",
      "Weakness": "bg-yellow-100 text-yellow-800",
      "Cholera confirmed": "bg-red-200 text-red-900 font-semibold"
    };

    return (
      <Badge 
        variant="secondary" 
        className={`text-xs ${symptomColors[symptom] || "bg-gray-100 text-gray-800"}`}
      >
        {symptom}
      </Badge>
    );
  };

  const stats = {
    total: patientReports.length + waterReports.length,
    pending: patientReports.filter(r => r.status === "pending").length + waterReports.filter(r => r.status === "pending").length,
    patientCases: patientReports.length,
    waterTests: waterReports.length
  };

  return (
    <div className="h-screen flex flex-col bg-background">
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
              <h1 className="text-lg font-semibold">Reports History</h1>
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Sync Status */}
          <Card className="border-warning bg-warning/5 mb-0">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span className="text-warning-foreground">Working offline - 3 reports pending sync</span>
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
              <div className="text-xl font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-success">{stats.pending}</div>
              <div className="text-xs text-muted-foreground">Pending Sync</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-warning">3</div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient-cases" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Patient Cases
            </TabsTrigger>
            <TabsTrigger value="water-tests" className="flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              Water Tests
            </TabsTrigger>
          </TabsList>

          {/* Filter Buttons */}
          <div className="flex gap-2 mt-4">
            <Button 
              variant={filterStatus === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All Status
            </Button>
            <Button 
              variant={filterStatus === "pending" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterStatus("pending")}
            >
              Pending Sync
            </Button>
            <Button 
              variant={filterStatus === "synced" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterStatus("synced")}
            >
              Synced
            </Button>
          </div>

          <TabsContent value="patient-cases" className="space-y-4 mt-4">
            {patientReports.map((report) => (
              <Card key={report.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {report.priority === "critical" && <AlertTriangle className="w-5 h-5 text-emergency" />}
                      {report.priority === "high" && <Clock className="w-5 h-5 text-warning" />}
                      {report.priority === "medium" && <User className="w-5 h-5 text-primary" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{report.patientName}</h3>
                          <p className="text-xs text-muted-foreground">
                            {report.gender}, {report.age} years
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                          {report.status === "pending" && (
                            <Button size="sm" variant="outline" className="mt-1 h-6 text-xs">
                              🔄 Retry Sync
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-1">Symptoms Reported:</p>
                        <div className="flex flex-wrap gap-1">
                          {report.symptoms.map((symptom, index) => (
                            <span key={index}>
                              {getSymptomBadge(symptom)}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                          {report.hasPhoto && <span className="ml-2">📷 Photo attached</span>}
                        </div>
                        {getStatusBadge(report.status, report.priority)}
                      </div>

                      {report.medicalNote && (
                        <div className="mt-2 p-2 bg-accent/10 rounded text-xs">
                          <p className="font-medium text-accent">Medical Verification:</p>
                          <p className="text-muted-foreground">{report.medicalNote}</p>
                        </div>
                      )}

                      {report.networkIssue && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-warning">
                          <AlertTriangle className="w-3 h-3" />
                          Network Issue
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="water-tests" className="space-y-4 mt-4">
            {waterReports.map((report) => (
              <Card key={report.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Droplet className="w-5 h-5 text-accent" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{report.sourceName}</h3>
                          <p className="text-xs text-muted-foreground">{report.sourceType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{report.testDate}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                        <div>
                          <span className="text-muted-foreground">pH:</span>
                          <span className="ml-1 font-medium">{report.phLevel}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Clarity:</span>
                          <span className="ml-1 font-medium">{report.turbidity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Bacteria:</span>
                          <span className={`ml-1 font-medium ${report.bacteria === "No" ? "text-success" : "text-emergency"}`}>
                            {report.bacteria}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </div>
                        {getStatusBadge(report.status)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Sync All Button */}
        <Card className="border-success bg-success/5">
          <CardContent className="p-4">
            <Button className="w-full h-12 bg-success hover:bg-success/90">
              <RefreshCw className="w-5 h-5 mr-2" />
              Sync All Pending Reports (3)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsHistory;