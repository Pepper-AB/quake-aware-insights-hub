
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Earthquake, EarthquakePrediction, MapLayer, RiskZone } from '../types/earthquake';
import { getMarkerSize, getMagnitudeColor, getRiskLevelColor } from '../utils/mapUtils';
import { formatDate } from '../utils/dateUtils';

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  predictions: EarthquakePrediction[];
  riskZones: RiskZone[];
  enabledLayers: MapLayer[];
}

const EarthquakeMap = ({ earthquakes, predictions, riskZones, enabledLayers }: EarthquakeMapProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom, setMapZoom] = useState<number>(2);

  // Update map center if we're focusing on a recent major earthquake
  useEffect(() => {
    if (earthquakes.length > 0) {
      // Find the most significant earthquake in the list
      const significantEq = earthquakes.reduce((prev, current) => 
        current.significance > prev.significance ? current : prev
      );
      
      // If it's very significant, center the map on it
      if (significantEq.significance > 800) {
        setMapCenter([significantEq.coordinates[1], significantEq.coordinates[0]]);
        setMapZoom(5);
      }
    }
  }, [earthquakes]);

  return (
    <MapContainer 
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom={true}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <LayersControl>
        {/* Recent Earthquakes Layer */}
        <LayersControl.Overlay checked name="Recent Earthquakes">
          <LayerGroup>
            {earthquakes.map(earthquake => {
              const markerRadius = getMarkerSize(earthquake.magnitude);
              const markerColor = getMagnitudeColor(earthquake.magnitude);
              return (
                <CircleMarker 
                  key={earthquake.id}
                  center={[earthquake.coordinates[1], earthquake.coordinates[0]]}
                  pathOptions={{ 
                    fillColor: markerColor,
                    color: markerColor,
                    fillOpacity: 0.7,
                    weight: 1
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-bold">{earthquake.place}</h3>
                      <p>Magnitude: <span className="font-semibold">{earthquake.magnitude.toFixed(1)}</span></p>
                      <p>Time: {formatDate(earthquake.time)}</p>
                      {earthquake.tsunami && <p className="text-red-500 font-bold">Tsunami Alert</p>}
                      <a 
                        href={earthquake.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-500 hover:underline mt-2 inline-block"
                      >
                        More details
                      </a>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </LayerGroup>
        </LayersControl.Overlay>
        
        {/* Risk Zones Layer */}
        {enabledLayers.includes(MapLayer.RISK_ZONES) && (
          <LayersControl.Overlay checked name="Risk Zones">
            <LayerGroup>
              {riskZones.map(zone => {
                const { color } = getRiskLevelColor(zone.riskLevel);
                return (
                  <CircleMarker 
                    key={zone.id}
                    center={[zone.coordinates[1], zone.coordinates[0]]}
                    pathOptions={{ 
                      fillColor: color,
                      color: color,
                      fillOpacity: 0.2,
                      weight: 1
                    }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <h3 className="font-bold">{zone.name}</h3>
                        <p>Risk Level: <span className="font-semibold capitalize">{zone.riskLevel}</span></p>
                        {zone.description && <p>{zone.description}</p>}
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        )}
        
        {/* Predictions Layer */}
        {enabledLayers.includes(MapLayer.PREDICTIONS) && (
          <LayersControl.Overlay checked name="Predictions">
            <LayerGroup>
              {predictions.map((prediction, idx) => {
                const { color } = getRiskLevelColor(prediction.riskLevel);
                return (
                  <CircleMarker 
                    key={idx}
                    center={[prediction.coordinates[1], prediction.coordinates[0]]}
                    pathOptions={{ 
                      fillColor: color,
                      color: color,
                      fillOpacity: 0.4,
                      weight: 2,
                      dashArray: "5, 5"
                    }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <h3 className="font-bold">{prediction.location}</h3>
                        <p>{prediction.region}</p>
                        <p>Predicted Magnitude: {prediction.magnitude.min}-{prediction.magnitude.max}</p>
                        <p>Probability: {prediction.probability}% within {prediction.timeframe}</p>
                        <p>Confidence: <span className="capitalize">{prediction.confidenceLevel}</span></p>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        )}
      </LayersControl>
    </MapContainer>
  );
};

export default EarthquakeMap;
