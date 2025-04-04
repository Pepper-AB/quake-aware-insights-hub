
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Earthquake, HistoricalEarthquake } from '@/types/earthquake';
import { formatRelativeTime } from '@/utils/dateUtils';
import { getMagnitudeColor } from '@/utils/mapUtils';
import { AlertTriangle, ExternalLink, Filter } from 'lucide-react';

interface RecentEarthquakesPanelProps {
  recentEarthquakes: Earthquake[];
  historicalEarthquakes: HistoricalEarthquake[];
}

const RecentEarthquakesPanel = ({ recentEarthquakes, historicalEarthquakes }: RecentEarthquakesPanelProps) => {
  const [activeTab, setActiveTab] = useState('recent');

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">Earthquake Timeline</span>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
        <CardDescription>Recent and historical seismic events</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-4">
          <TabsTrigger value="recent">Recent Events</TabsTrigger>
          <TabsTrigger value="historical">Historical</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="m-0">
          <CardContent className="p-0 h-[calc(100vh-240px)] overflow-y-auto">
            <div className="space-y-4 py-4 px-4">
              {recentEarthquakes.map(earthquake => (
                <div 
                  key={earthquake.id} 
                  className="flex items-start space-x-3 border-b border-muted pb-3 last:border-0"
                >
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: getMagnitudeColor(earthquake.magnitude) }}
                  >
                    {earthquake.magnitude.toFixed(1)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{earthquake.place}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(earthquake.time)}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-muted-foreground">
                        Depth: {earthquake.coordinates[2].toFixed(1)} km
                      </span>
                      {earthquake.tsunami > 0 && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Tsunami
                        </span>
                      )}
                    </div>
                    <a 
                      href={earthquake.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-info flex items-center mt-1 hover:underline"
                    >
                      Details
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="historical" className="m-0">
          <CardContent className="p-0 h-[calc(100vh-240px)] overflow-y-auto">
            <div className="space-y-4 py-4 px-4">
              {historicalEarthquakes.map(earthquake => (
                <div 
                  key={earthquake.id} 
                  className="flex items-start space-x-3 border-b border-muted pb-3 last:border-0"
                >
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: getMagnitudeColor(earthquake.magnitude) }}
                  >
                    {earthquake.magnitude.toFixed(1)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{earthquake.location}</h4>
                      <span className="text-xs font-medium">
                        {earthquake.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{earthquake.region}</p>
                    {earthquake.casualties && (
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Casualties: {earthquake.casualties}
                        </span>
                      </div>
                    )}
                    <p className="text-xs mt-1">{earthquake.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default RecentEarthquakesPanel;
