
import { Button } from '@/components/ui/button';
import { MapLayer } from '@/types/earthquake';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, MapPin, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MapControlsProps {
  enabledLayers: MapLayer[];
  toggleLayer: (layer: MapLayer) => void;
}

const MapControls = ({ enabledLayers, toggleLayer }: MapControlsProps) => {
  const { toast } = useToast();
  
  const handleReset = () => {
    toast({
      title: "Map view reset",
      description: "The map view has been reset to the default position"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Layers className="h-5 w-5 mr-2" />
          <span>Map Controls</span>
        </CardTitle>
        <CardDescription>Toggle map layers and filters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-fault-lines" 
              checked={enabledLayers.includes(MapLayer.FAULT_LINES)}
              onCheckedChange={() => {
                toggleLayer(MapLayer.FAULT_LINES);
                toast({
                  title: enabledLayers.includes(MapLayer.FAULT_LINES) 
                    ? "Fault Lines hidden" 
                    : "Fault Lines shown",
                  duration: 1500
                });
              }}
            />
            <Label htmlFor="layer-fault-lines">Fault Lines</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-tectonic-plates" 
              checked={enabledLayers.includes(MapLayer.TECTONIC_PLATES)}
              onCheckedChange={() => {
                toggleLayer(MapLayer.TECTONIC_PLATES);
                toast({
                  title: enabledLayers.includes(MapLayer.TECTONIC_PLATES) 
                    ? "Tectonic Plates hidden" 
                    : "Tectonic Plates shown",
                  duration: 1500
                });
              }}
            />
            <Label htmlFor="layer-tectonic-plates">Tectonic Plates</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-infrastructure" 
              checked={enabledLayers.includes(MapLayer.INFRASTRUCTURE)}
              onCheckedChange={() => {
                toggleLayer(MapLayer.INFRASTRUCTURE);
                toast({
                  title: enabledLayers.includes(MapLayer.INFRASTRUCTURE) 
                    ? "Infrastructure hidden" 
                    : "Infrastructure shown",
                  duration: 1500
                });
              }}
            />
            <Label htmlFor="layer-infrastructure">Infrastructure</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-risk-zones" 
              checked={enabledLayers.includes(MapLayer.RISK_ZONES)}
              onCheckedChange={() => {
                toggleLayer(MapLayer.RISK_ZONES);
                toast({
                  title: enabledLayers.includes(MapLayer.RISK_ZONES) 
                    ? "Risk Zones hidden" 
                    : "Risk Zones shown",
                  duration: 1500
                });
              }}
            />
            <Label htmlFor="layer-risk-zones">Risk Zones</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-predictions" 
              checked={enabledLayers.includes(MapLayer.PREDICTIONS)}
              onCheckedChange={() => {
                toggleLayer(MapLayer.PREDICTIONS);
                toast({
                  title: enabledLayers.includes(MapLayer.PREDICTIONS) 
                    ? "Predictions hidden" 
                    : "Predictions shown",
                  duration: 1500
                });
              }}
            />
            <Label htmlFor="layer-predictions">Predictions</Label>
          </div>
          
          <div className="pt-2 space-y-2">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              size="sm"
              onClick={handleReset}
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Reset View
            </Button>
            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-center" 
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Show My Location
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapControls;
