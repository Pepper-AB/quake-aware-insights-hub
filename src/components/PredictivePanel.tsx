
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock, MapPin, Percent } from 'lucide-react';
import { EarthquakePrediction } from '@/types/earthquake';
import { getRiskLevelColor } from '@/utils/mapUtils';
import { Progress } from '@/components/ui/progress';

interface PredictivePanelProps {
  predictions: EarthquakePrediction[];
  activePredictionId?: string | null;
  setActivePredictionId?: (id: string | null) => void;
}

const PredictivePanel = ({ 
  predictions,
  activePredictionId,
  setActivePredictionId
}: PredictivePanelProps) => {
  const sortedPredictions = [...predictions].sort((a, b) => b.probability - a.probability);

  const handlePredictionClick = (id: string) => {
    if (setActivePredictionId) {
      setActivePredictionId(id);
    }
  };

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
          <span>Potential Seismic Events</span>
        </CardTitle>
        <CardDescription>Probabilistic forecasts based on AI analysis</CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100vh-240px)] overflow-y-auto">
        <div className="space-y-1 py-2">
          {sortedPredictions.map((prediction, idx) => {
            const { className } = getRiskLevelColor(prediction.riskLevel);
            return (
              <div 
                key={idx} 
                className={`p-3 hover:bg-muted/50 transition-colors border-l-4 cursor-pointer
                  ${activePredictionId === prediction.id ? 'bg-muted/50 border-accent' : 'border-transparent hover:border-accent'}`}
                onClick={() => handlePredictionClick(prediction.id)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{prediction.location}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${className}`}>
                    {prediction.riskLevel.toUpperCase()}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{prediction.region}</p>
                <div className="mt-2 flex items-center text-sm">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>M{prediction.magnitude.min}-{prediction.magnitude.max}</span>
                  <Clock className="h-3.5 w-3.5 ml-2 mr-1" />
                  <span>Within {prediction.timeframe}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <Percent className="h-3.5 w-3.5 mr-1" />
                      <span className="text-sm font-medium">{prediction.probability}% probability</span>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {prediction.confidenceLevel} confidence
                    </span>
                  </div>
                  <Progress value={prediction.probability} className="h-1.5" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Sources: {prediction.dataSources.join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictivePanel;
