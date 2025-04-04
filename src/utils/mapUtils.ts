
import { Earthquake, EarthquakePrediction, RiskZone } from "../types/earthquake";

/**
 * Get marker size based on earthquake magnitude
 * @param magnitude - Earthquake magnitude
 * @returns Marker radius in pixels
 */
export const getMarkerSize = (magnitude: number): number => {
  return Math.max(6, Math.min(25, magnitude * 3));
};

/**
 * Get color based on earthquake magnitude or risk level
 * @param magnitude - Earthquake magnitude or risk level
 * @returns Hex color code
 */
export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude < 3) return "#66bb6a"; // Green
  if (magnitude < 4.5) return "#26a69a"; // Teal
  if (magnitude < 6) return "#ffb74d"; // Orange
  if (magnitude < 7) return "#ff9800"; // Dark Orange
  if (magnitude < 8) return "#ef5350"; // Red
  return "#c62828"; // Dark Red
};

/**
 * Get color based on prediction risk level
 * @param riskLevel - Risk level string
 * @returns Hex color code and corresponding tailwind class
 */
export const getRiskLevelColor = (riskLevel: 'low' | 'moderate' | 'high' | 'extreme'): { color: string, className: string } => {
  switch (riskLevel) {
    case 'low':
      return { color: '#66bb6a', className: 'bg-green-500' };
    case 'moderate':
      return { color: '#ffb74d', className: 'bg-orange-400' };
    case 'high':
      return { color: '#ef5350', className: 'bg-red-500' };
    case 'extreme':
      return { color: '#c62828', className: 'bg-red-800' };
    default:
      return { color: '#90a4ae', className: 'bg-gray-400' };
  }
};

/**
 * Get color based on earthquake alert level
 * @param alert - Alert level
 * @returns Hex color code
 */
export const getAlertColor = (alert: 'green' | 'yellow' | 'orange' | 'red' | null): string => {
  switch (alert) {
    case 'green':
      return "#66bb6a"; // Green
    case 'yellow':
      return "#ffb74d"; // Orange
    case 'orange':
      return "#ef5350"; // Red
    case 'red':
      return "#c62828"; // Dark Red
    default:
      return "#90a4ae"; // Blue Grey
  }
};

/**
 * Create GeoJSON feature from earthquake
 * @param earthquake - Earthquake object
 * @returns GeoJSON feature
 */
export const createEarthquakeFeature = (earthquake: Earthquake) => {
  return {
    type: "Feature",
    properties: {
      ...earthquake,
      color: getMagnitudeColor(earthquake.magnitude)
    },
    geometry: {
      type: "Point",
      coordinates: [earthquake.coordinates[0], earthquake.coordinates[1]]
    }
  };
};

/**
 * Create GeoJSON feature from prediction
 * @param prediction - Earthquake prediction object
 * @returns GeoJSON feature
 */
export const createPredictionFeature = (prediction: EarthquakePrediction) => {
  const { color } = getRiskLevelColor(prediction.riskLevel);
  
  return {
    type: "Feature",
    properties: {
      ...prediction,
      color
    },
    geometry: {
      type: "Point",
      coordinates: [prediction.coordinates[0], prediction.coordinates[1]]
    }
  };
};

/**
 * Create GeoJSON feature from risk zone
 * @param zone - Risk zone object
 * @returns GeoJSON feature
 */
export const createRiskZoneFeature = (zone: RiskZone) => {
  const { color } = getRiskLevelColor(zone.riskLevel);
  
  return {
    type: "Feature",
    properties: {
      ...zone,
      color
    },
    geometry: {
      type: "Point",
      coordinates: [zone.coordinates[0], zone.coordinates[1]]
    }
  };
};
