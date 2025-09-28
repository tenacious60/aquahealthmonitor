import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  User, 
  Stethoscope, 
  MapPin, 
  Camera,
  Save,
  FileText
} from "lucide-react";

interface PatientReportFormProps {
  onBack: () => void;
}

const PatientReportForm = ({ onBack }: PatientReportFormProps) => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [otherSymptoms, setOtherSymptoms] = useState("");

  const symptomsList = [
    { id: "diarrhea", label: "Diarrhea", color: "bg-red-100 text-red-800" },
    { id: "fever", label: "Fever", color: "bg-orange-100 text-orange-800" },
    { id: "vomiting", label: "Vomiting", color: "bg-red-100 text-red-800" },
    { id: "nausea", label: "Nausea", color: "bg-red-100 text-red-800" },
    { id: "dehydration", label: "Dehydration", color: "bg-red-100 text-red-800" },
    { id: "stomach-pain", label: "Stomach Pain", color: "bg-orange-100 text-orange-800" },
    { id: "fatigue", label: "Fatigue", color: "bg-red-100 text-red-800" }
  ];

  const toggleSymptom = (symptomId: string) => {
    setSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitting patient report:", {
      patientName,
      age,
      gender,
      symptoms,
      otherSymptoms
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">Report Patient Case</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Offline Notice */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-warning-foreground">Working offline - Data will sync automatically</span>
            </div>
          </CardContent>
        </Card>

        {/* Patient Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-5 h-5 text-primary" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Patient Name *</Label>
              <Input
                id="patient-name"
                placeholder="Enter full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  placeholder="Years"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms Checklist */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Stethoscope className="w-5 h-5 text-primary" />
              Symptoms Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {symptomsList.map((symptom) => (
              <div key={symptom.id} className="flex items-center space-x-3 p-2 rounded border">
                <Checkbox
                  id={symptom.id}
                  checked={symptoms.includes(symptom.id)}
                  onCheckedChange={() => toggleSymptom(symptom.id)}
                />
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-2 h-2 rounded-full ${symptom.color.split(' ')[0]}`} />
                  <Label htmlFor={symptom.id} className="flex-1 cursor-pointer">
                    {symptom.label}
                  </Label>
                </div>
              </div>
            ))}
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="other-symptoms">Other Symptoms</Label>
              <Textarea
                id="other-symptoms"
                placeholder="Describe any other symptoms..."
                value={otherSymptoms}
                onChange={(e) => setOtherSymptoms(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="w-5 h-5 text-primary" />
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-success-foreground">Auto-capture GPS</span>
                <span className="ml-auto text-success font-medium">✓</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Location: Block PHC Area, Ganjam District
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Optional Photo */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Camera className="w-5 h-5 text-primary" />
              Optional Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Take Photo</p>
              <p className="text-xs text-muted-foreground">Optional - helps with diagnosis</p>
            </div>
            <Button variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Choose from Gallery
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleSubmit} className="w-full h-12 bg-primary hover:bg-primary-light">
            <Save className="w-5 h-5 mr-2" />
            Save Case Report
          </Button>
          <Button variant="outline" className="w-full h-12">
            <FileText className="w-5 h-5 mr-2" />
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientReportForm;