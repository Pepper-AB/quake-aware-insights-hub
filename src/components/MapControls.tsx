
import { Button } from '@/components/ui/button';
import { MapLayer } from '@/types/earthquake';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';

interface MapControlsProps {
  enabledLayers: MapLayer[];
  toggleLayer: (layer: MapLayer) => void;
}

const MapControls = ({ enabledLayers, toggleLayer }: MapControlsProps) => {
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
              onCheckedChange={() => toggleLayer(MapLayer.FAULT_LINES)}
            />
            <Label htmlFor="layer-fault-lines">Fault Lines</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-tectonic-plates" 
              checked={enabledLayers.includes(MapLayer.TECTONIC_PLATES)}
              onCheckedChange={() => toggleLayer(MapLayer.TECTONIC_PLATES)}
            />
            <Label htmlFor="layer-tectonic-plates">Tectonic Plates</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-infrastructure" 
              checked={enabledLayers.includes(MapLayer.INFRASTRUCTURE)}
              onCheckedChange={() => toggleLayer(MapLayer.INFRASTRUCTURE)}
            />
            <Label htmlFor="layer-infrastructure">Infrastructure</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-risk-zones" 
              checked={enabledLayers.includes(MapLayer.RISK_ZONES)}
              onCheckedChange={() => toggleLayer(MapLayer.RISK_ZONES)}
            />
            <Label htmlFor="layer-risk-zones">Risk Zones</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="layer-predictions" 
              checked={enabledLayers.includes(MapLayer.PREDICTIONS)}
              onCheckedChange={() => toggleLayer(MapLayer.PREDICTIONS)}
            />
            <Label htmlFor="layer-predictions">Predictions</Label>
          </div>
          
          <div className="pt-2">
            <Button variant="outline" className="w-full" size="sm">
              Reset View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapControls;
