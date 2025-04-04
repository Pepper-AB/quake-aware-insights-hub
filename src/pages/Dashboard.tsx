
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import EarthquakeMap from '@/components/EarthquakeMap';
import RecentEarthquakesPanel from '@/components/RecentEarthquakesPanel';
import PredictivePanel from '@/components/PredictivePanel';
import MapControls from '@/components/MapControls';
import WarningBanner from '@/components/WarningBanner';
import { Earthquake, EarthquakePrediction, HistoricalEarthquake, MapLayer, RiskZone } from '@/types/earthquake';
import { 
  fetchRecentEarthquakes, 
  fetchEarthquakePredictions, 
  fetchHistoricalEarthquakes,
  fetchRiskZones
} from '@/services/earthquakeService';
import { Card, CardContent } from '@/components/ui/card';
import { Info, ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPanels, setShowPanels] = useState(true); // Show panels by default
  const [recentEarthquakes, setRecentEarthquakes] = useState<Earthquake[]>([]);
  const [predictions, setPredictions] = useState<EarthquakePrediction[]>([]);
  const [historicalEarthquakes, setHistoricalEarthquakes] = useState<HistoricalEarthquake[]>([]);
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
  const [enabledLayers, setEnabledLayers] = useState<MapLayer[]>([
    MapLayer.RISK_ZONES,
    MapLayer.PREDICTIONS
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [activeEarthquakeId, setActiveEarthquakeId] = useState<string | null>(null);
  const [activePredictionId, setActivePredictionId] = useState<string | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const togglePanels = () => setShowPanels(!showPanels);
  
  const toggleLayer = (layer: MapLayer) => {
    setEnabledLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  const handleEarthquakeNotification = (earthquakeId: string) => {
    setActiveEarthquakeId(earthquakeId);
    setShowPanels(true); // Ensure panels are visible when viewing earthquake details
    toast({
      title: "Navigating to earthquake details",
      description: "Showing information about the selected earthquake.",
    });
  };

  const handlePredictionNotification = (predictionId: string) => {
    setActivePredictionId(predictionId);
    setShowPanels(true); // Ensure panels are visible when viewing prediction details
    toast({
      title: "Navigating to prediction details",
      description: "Showing information about the selected prediction.",
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load all data in parallel
        const [earthquakesData, predictionsData, historicalData, riskZonesData] = await Promise.all([
          fetchRecentEarthquakes(),
          fetchEarthquakePredictions(),
          fetchHistoricalEarthquakes(),
          fetchRiskZones()
        ]);
        
        setRecentEarthquakes(earthquakesData);
        setPredictions(predictionsData);
        setHistoricalEarthquakes(historicalData);
        setRiskZones(riskZonesData);
        
        // Show a success toast
        toast({
          title: "Data loaded successfully",
          description: `Displaying ${earthquakesData.length} recent earthquakes and ${predictionsData.length} predictions`,
        });
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading earthquake data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
    
    // Set up polling for real-time data
    const interval = setInterval(() => {
      fetchRecentEarthquakes().then(data => {
        if (data.length > recentEarthquakes.length) {
          const newEarthquakes = data.filter(eq => 
            !recentEarthquakes.some(existing => existing.id === eq.id)
          );
          
          if (newEarthquakes.length > 0) {
            setRecentEarthquakes(data);
            
            // Notify about new earthquake with action to view it
            const latestEarthquake = newEarthquakes[0];
            toast({
              title: "New Earthquake Detected",
              description: `${latestEarthquake.place} - Magnitude ${latestEarthquake.magnitude}`,
              action: (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEarthquakeNotification(latestEarthquake.id)}
                >
                  View Details
                </Button>
              ),
            });
          }
        }
      }).catch(error => console.error("Error polling earthquake data:", error));
    }, 60000); // Poll every minute
    
    return () => clearInterval(interval);
  }, [toast, recentEarthquakes.length]);

  const highRiskPrediction = predictions.find(p => p.riskLevel === 'high' || p.riskLevel === 'extreme');

  return (
    <div className="min-h-screen flex flex-col">
      {highRiskPrediction && (
        <WarningBanner 
          message={`High risk alert: ${highRiskPrediction.location}, ${highRiskPrediction.region} - ${highRiskPrediction.probability}% chance of M${highRiskPrediction.magnitude.min}+ in ${highRiskPrediction.timeframe}`}
          type="warning"
        />
      )}
      
      <Header 
        toggleSidebar={toggleSidebar} 
        onNotificationClick={handleEarthquakeNotification}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        
        <main className={`flex-1 overflow-auto p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Predictive Risk Dashboard</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={togglePanels}
              className="flex items-center gap-2"
            >
              {showPanels ? (
                <>
                  <ArrowLeftFromLine className="h-4 w-4" />
                  Hide Panels
                </>
              ) : (
                <>
                  <ArrowRightFromLine className="h-4 w-4" />
                  Show Panels
                </>
              )}
            </Button>
          </div>
          
          <div className={`grid gap-4 h-[calc(100vh-150px)] ${showPanels ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
            {/* Left Column - Recent Earthquakes */}
            {showPanels && (
              <div className="h-full">
                <RecentEarthquakesPanel 
                  recentEarthquakes={recentEarthquakes}
                  historicalEarthquakes={historicalEarthquakes}
                  activeEarthquakeId={activeEarthquakeId}
                  setActiveEarthquakeId={setActiveEarthquakeId}
                />
              </div>
            )}
            
            {/* Center/Main Column - Map and Controls */}
            <div className={`h-full flex flex-col space-y-4 ${showPanels ? 'md:col-span-1 lg:col-span-1' : 'col-span-1'}`}>
              <Card className="flex-1">
                <CardContent className="p-3 h-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-sm text-muted-foreground">Loading earthquake data...</p>
                      </div>
                    </div>
                  ) : (
                    <EarthquakeMap 
                      earthquakes={recentEarthquakes}
                      predictions={predictions}
                      riskZones={riskZones}
                      enabledLayers={enabledLayers}
                      activeEarthquakeId={activeEarthquakeId}
                      activePredictionId={activePredictionId}
                    />
                  )}
                </CardContent>
              </Card>
              
              <MapControls 
                enabledLayers={enabledLayers}
                toggleLayer={toggleLayer}
              />
            </div>
            
            {/* Right Column - Predictions */}
            {showPanels && (
              <div className="h-full">
                <PredictivePanel 
                  predictions={predictions} 
                  activePredictionId={activePredictionId}
                  setActivePredictionId={setActivePredictionId}
                />
              </div>
            )}
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground flex items-center">
            <Info className="h-3 w-3 mr-1" />
            <span>
              Predictions are based on probabilistic models and should not be interpreted as definitive forecasts. 
              QuakeAware uses AI and historical seismic data to estimate risk levels.
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
