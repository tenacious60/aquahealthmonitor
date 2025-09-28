import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Droplet, 
  TestTube, 
  MapPin, 
  Camera,
  Save
} from "lucide-react";

interface WaterTestFormProps {
  onBack: () => void;
}

const WaterTestForm = ({ onBack }: WaterTestFormProps) => {
  const [sourceName, setSourceName] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [phValue, setPhValue] = useState("7.0");
  const [turbidity, setTurbidity] = useState("");
  const [bacteria, setBacteria] = useState("");

  const sourceTypes = [
    { value: "well", label: "Well", icon: "🏗️" },
    { value: "pond", label: "Pond", icon: "🏞️" },
    { value: "river", label: "River", icon: "🏞️" },
    { value: "borewell", label: "Borewell", icon: "⚡" },
    { value: "tank", label: "Tank", icon: "🏗️" },
    { value: "other", label: "Other", icon: "❓" }
  ];

  const turbidityOptions = [
    { value: "clear", label: "Clear", icon: "💧", color: "text-blue-600", status: "Good" },
    { value: "slightly-cloudy", label: "Slightly Cloudy", icon: "🟡", color: "text-yellow-600", status: "Caution" },
    { value: "cloudy", label: "Cloudy", icon: "🟠", color: "text-orange-600", status: "Poor" },
    { value: "very-cloudy", label: "Very Cloudy/Muddy", icon: "🔴", color: "text-red-600", status: "Unsafe" }
  ];

  const getPhStatus = (ph: number) => {
    if (ph < 6.5) return { status: "Acidic", color: "text-red-600", range: "0-6.5" };
    if (ph >= 6.5 && ph <= 8.5) return { status: "Neutral", color: "text-green-600", range: "6.5-8.5" };
    return { status: "Basic", color: "text-blue-600", range: "8.5-14" };
  };

  const phStatus = getPhStatus(parseFloat(phValue) || 7);

  const handleSubmit = () => {
    console.log("Submitting water test:", {
      sourceName,
      sourceType,
      testMethod,
      phValue,
      turbidity,
      bacteria
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
            <h1 className="text-lg font-semibold">Water Quality Test</h1>
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

        {/* Water Source Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Droplet className="w-5 h-5 text-primary" />
              Water Source Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source-name">Source Name *</Label>
              <Input
                id="source-name"
                placeholder="Enter water source name"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Source Type *</Label>
              <RadioGroup value={sourceType} onValueChange={setSourceType}>
                <div className="grid grid-cols-2 gap-2">
                  {sourceTypes.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2 p-2 border rounded">
                      <RadioGroupItem value={type.value} id={type.value} />
                      <Label htmlFor={type.value} className="flex items-center gap-2 cursor-pointer flex-1">
                        <span>{type.icon}</span>
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Test Parameters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TestTube className="w-5 h-5 text-primary" />
              Test Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* pH Level */}
            <div className="space-y-3">
              <Label>pH Level *</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="range"
                  min="0"
                  max="14"
                  step="0.1"
                  value={phValue}
                  onChange={(e) => setPhValue(e.target.value)}
                  className="flex-1"
                />
                <div className="text-right min-w-[60px]">
                  <div className="text-lg font-bold">{phValue}</div>
                  <div className={`text-xs ${phStatus.color}`}>{phStatus.status}</div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Acidic (0-6.5)</span>
                <span className="text-green-600 font-medium">Neutral (6.5-8.5)</span>
                <span>Basic (8.5-14)</span>
              </div>
            </div>

            {/* Turbidity */}
            <div className="space-y-3">
              <Label>Turbidity (Water Clarity) *</Label>
              <RadioGroup value={turbidity} onValueChange={setTurbidity}>
                <div className="space-y-2">
                  {turbidityOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-3 border rounded">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex items-center gap-3 cursor-pointer flex-1">
                        <span className="text-lg">{option.icon}</span>
                        <div className="flex-1">
                          <div>{option.label}</div>
                        </div>
                        <span className={`text-xs font-medium ${option.color}`}>
                          {option.status}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Bacteria Presence */}
            <div className="space-y-3">
              <Label>Bacteria Presence *</Label>
              <RadioGroup value={bacteria} onValueChange={setBacteria}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <RadioGroupItem value="yes" id="bacteria-yes" />
                    <Label htmlFor="bacteria-yes" className="flex items-center gap-2 cursor-pointer flex-1">
                      <span className="text-red-500">⚠️</span>
                      <div>
                        <div className="font-medium">Yes</div>
                        <div className="text-xs text-red-600">Bacteria Detected</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <RadioGroupItem value="no" id="bacteria-no" />
                    <Label htmlFor="bacteria-no" className="flex items-center gap-2 cursor-pointer flex-1">
                      <span className="text-green-500">✅</span>
                      <div>
                        <div className="font-medium">No</div>
                        <div className="text-xs text-green-600">No Bacteria</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="w-5 h-5 text-primary" />
              Location (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Capture GPS Location
            </Button>
          </CardContent>
        </Card>

        {/* Photo */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Camera className="w-5 h-5 text-primary" />
              Photo of Water Source (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Take Photo</p>
              <p className="text-xs text-muted-foreground">Document the water source</p>
            </div>
            <Button variant="outline" className="w-full">
              Choose from Gallery
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleSubmit} className="w-full h-12 bg-accent hover:bg-accent/90">
            <Save className="w-5 h-5 mr-2" />
            Submit Now
          </Button>
          <Button variant="outline" className="w-full h-12">
            Save Offline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaterTestForm;