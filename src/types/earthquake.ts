
export interface Earthquake {
  id: string;
  place: string;
  time: number;
  magnitude: number;
  coordinates: [number, number, number]; // [longitude, latitude, depth]
  url: string;
  felt?: number;
  alert?: 'green' | 'yellow' | 'orange' | 'red' | null;
  tsunami?: number;
  title: string;
  status: string;
  type: string;
  significance: number;
  sources?: string;
}

export interface EarthquakePrediction {
  region: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  magnitude: {
    min: number;
    max: number;
  };
  probability: number; // 0-100
  timeframe: string; // e.g., "30 days", "2 weeks"
  confidenceLevel: 'low' | 'moderate' | 'high';
  dataSources: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
}

export interface HistoricalEarthquake {
  id: string;
  year: number;
  region: string;
  location: string;
  magnitude: number;
  casualties?: string;
  impact: string;
  coordinates: [number, number]; // [longitude, latitude]
  imageUrl?: string;
}

export type RiskZone = {
  id: string;
  name: string;
  coordinates: [number, number]; // Center point [longitude, latitude]
  radius: number; // in kilometers
  riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  description?: string;
}

export enum MapLayer {
  FAULT_LINES = 'faultLines',
  TECTONIC_PLATES = 'tectonicPlates',
  INFRASTRUCTURE = 'infrastructure',
  RISK_ZONES = 'riskZones',
  PREDICTIONS = 'predictions',
}
