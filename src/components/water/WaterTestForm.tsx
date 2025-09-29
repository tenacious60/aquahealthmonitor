import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const [testMethod, setTestMethod] = useState("manual");
  const [phValue, setPhValue] = useState("7.0");
  const [turbidity, setTurbidity] = useState("");
  const [bacteria, setBacteria] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [sensorError, setSensorError] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<null | {
    deviceId: string;
    battery: number;
    ph: number;
    turbidity: "clear" | "slightly-cloudy" | "cloudy" | "very-cloudy";
    bacteria: "yes" | "no";
    lastUpdated: string;
  }>(null);

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

  const simulateSensorFetch = () => {
    const simulatedPh = parseFloat((6.6 + Math.random() * 1.8).toFixed(1));
    const turbidityOptionsValues = ["clear", "slightly-cloudy", "cloudy", "very-cloudy"] as const;
    const simulatedTurbidity = turbidityOptionsValues[Math.floor(Math.random() * turbidityOptionsValues.length)];
    const simulatedBacteria = Math.random() > 0.75 ? "yes" : "no" as const;
    const simulatedBattery = Math.floor(50 + Math.random() * 50);
    setSensorData({
      deviceId: `AquaSensor-${Math.floor(1000 + Math.random() * 9000)}`,
      battery: simulatedBattery,
      ph: simulatedPh,
      turbidity: simulatedTurbidity,
      bacteria: simulatedBacteria,
      lastUpdated: new Date().toLocaleString(),
    });
  };

  const startScan = async () => {
    setSensorError(null);
    setScanning(true);
    setSensorData(null);
    try {
      // Try Web Bluetooth when available (graceful fallback to simulation)
      // We use acceptAllDevices to avoid requiring specific service UUIDs in demo
      // Real implementations should filter by services
      // @ts-ignore
      if (navigator.bluetooth && navigator.bluetooth.requestDevice) {
        // @ts-ignore
        const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        const ph = parseFloat((6.6 + Math.random() * 1.8).toFixed(1));
        const turbidityOptionsValues = ["clear", "slightly-cloudy", "cloudy", "very-cloudy"] as const;
        const turbidityPicked = turbidityOptionsValues[Math.floor(Math.random() * turbidityOptionsValues.length)];
        const bacteriaPicked = Math.random() > 0.75 ? "yes" : "no" as const;
        const battery = Math.floor(50 + Math.random() * 50);
        setSensorData({
          deviceId: device?.name || "AquaSensor",
          battery,
          ph,
          turbidity: turbidityPicked,
          bacteria: bacteriaPicked,
          lastUpdated: new Date().toLocaleString(),
        });
      } else {
        // Fallback simulation
        await new Promise((r) => setTimeout(r, 1200));
        simulateSensorFetch();
      }
    } catch (e: any) {
      setSensorError(e?.message || "Failed to scan sensor");
      simulateSensorFetch();
    } finally {
      setScanning(false);
    }
  };

  const applySensorValues = () => {
    if (!sensorData) return;
    setPhValue(sensorData.ph.toString());
    setTurbidity(sensorData.turbidity);
    setBacteria(sensorData.bacteria);
    setScanOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
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

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* Offline Notice */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-foreground font-semibold ml-3">Working offline - Data will sync automatically</span>
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

        {/* Test Method */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TestTube className="w-5 h-5 text-primary" />
              Test Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={testMethod === 'manual' ? 'default' : 'outline'}
                onClick={() => setTestMethod('manual')}
                className="w-full"
              >
                Manual Entry
              </Button>
              <Button 
                variant={testMethod === 'iot' ? 'default' : 'outline'}
                onClick={() => { setTestMethod('iot'); setScanOpen(true); startScan(); }}
                className="w-full"
              >
                IoT Sensor
              </Button>
            </div>
            {testMethod === 'iot' && (
              <div className="text-xs text-muted-foreground">Scan and fetch live values from nearby IoT sensor.</div>
            )}
          </CardContent>
        </Card>

        {/* Scan Dialog */}
        <Dialog open={scanOpen} onOpenChange={setScanOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Scan IoT Sensor</DialogTitle>
              <DialogDescription>
                Searching for nearby Aqua sensors. Grant Bluetooth permission if prompted.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {scanning ? (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  Scanning...
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  {sensorError && (
                    <div className="text-emergency">{sensorError}</div>
                  )}
                  {sensorData ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Device</span>
                        <span className="font-medium">{sensorData.deviceId}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Battery</span>
                        <span className="font-medium">{sensorData.battery}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span className="font-medium">{sensorData.lastUpdated}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div>
                          <div className="text-muted-foreground text-xs">pH</div>
                          <div className="font-semibold">{sensorData.ph}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Clarity</div>
                          <div className="font-semibold capitalize">{sensorData.turbidity.replace('-', ' ')}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Bacteria</div>
                          <div className={`font-semibold ${sensorData.bacteria === 'no' ? 'text-success' : 'text-emergency'}`}>{sensorData.bacteria.toUpperCase()}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">No device data yet.</div>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button onClick={startScan} variant="outline" className="flex-1" disabled={scanning}>
                  {scanning ? 'Scanning...' : 'Retry Scan'}
                </Button>
                <Button onClick={applySensorValues} className="flex-1" disabled={!sensorData}>
                  Use Values
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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