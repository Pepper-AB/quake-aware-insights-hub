
import { Earthquake, EarthquakePrediction, HistoricalEarthquake, RiskZone } from "../types/earthquake";

// This is a temporary API key - In a production app, this should be stored in a server-side environment variable
const DEEPSEEK_API_KEY = 'sk-62c1e325209244e5a61eef35f5cec117';

// Fetch recent earthquakes from USGS API
export const fetchRecentEarthquakes = async (
  magnitude: number = 4.5,
  period: string = "month",
  limit: number = 20
): Promise<Earthquake[]> => {
  try {
    const response = await fetch(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${magnitude}_${period}.geojson`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch earthquake data");
    }

    const data = await response.json();
    
    return data.features
      .slice(0, limit)
      .map((feature: any) => ({
        id: feature.id,
        place: feature.properties.place,
        time: feature.properties.time,
        magnitude: feature.properties.mag,
        coordinates: feature.geometry.coordinates,
        url: feature.properties.url,
        felt: feature.properties.felt,
        alert: feature.properties.alert,
        tsunami: feature.properties.tsunami,
        title: feature.properties.title,
        status: feature.properties.status,
        type: feature.properties.type,
        significance: feature.properties.sig,
        sources: feature.properties.sources
      }));
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
    return [];
  }
};

// Fetch earthquake predictions using DeepSeek API
// This is a simulation since we don't have direct access to a prediction model
export const fetchEarthquakePredictions = async (): Promise<EarthquakePrediction[]> => {
  try {
    // In a real application, we would send a request to the DeepSeek API
    // For now we'll simulate a response
    
    // This would be where you'd make the actual API call to DeepSeek
    /*
    const response = await fetch('https://api.deepseek.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Request parameters
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch predictions');
    }
    
    const data = await response.json();
    return data.predictions;
    */
    
    // For now, return mock data
    return [
      {
        region: "California",
        location: "San Andreas Fault",
        coordinates: [-119.4179, 36.7783],
        magnitude: { min: 6.0, max: 7.5 },
        probability: 25,
        timeframe: "30 days",
        confidenceLevel: "moderate",
        dataSources: ["USGS", "DeepSeek ML Model", "Historical Patterns"],
        riskLevel: "high"
      },
      {
        region: "Japan",
        location: "Tokyo Region",
        coordinates: [139.6503, 35.6762],
        magnitude: { min: 5.5, max: 6.8 },
        probability: 30,
        timeframe: "2 weeks",
        confidenceLevel: "high",
        dataSources: ["JMA", "DeepSeek ML Model", "Recent Tremor Analysis"],
        riskLevel: "high"
      },
      {
        region: "Indonesia",
        location: "Mentawai Islands",
        coordinates: [99.1415, -1.2833],
        magnitude: { min: 7.0, max: 8.5 },
        probability: 15,
        timeframe: "60 days",
        confidenceLevel: "moderate",
        dataSources: ["BMKG", "DeepSeek ML Model", "Tectonic Stress Analysis"],
        riskLevel: "extreme"
      },
      {
        region: "Chile",
        location: "Valparaiso Region",
        coordinates: [-71.6127, -33.0472],
        magnitude: { min: 6.5, max: 7.8 },
        probability: 20,
        timeframe: "45 days",
        confidenceLevel: "low",
        dataSources: ["CSN", "DeepSeek ML Model"],
        riskLevel: "high"
      },
      {
        region: "New Zealand",
        location: "Alpine Fault",
        coordinates: [170.4545, -44.0705],
        magnitude: { min: 6.0, max: 7.2 },
        probability: 10,
        timeframe: "90 days",
        confidenceLevel: "low",
        dataSources: ["GNS", "DeepSeek ML Model"],
        riskLevel: "moderate"
      }
    ];
  } catch (error) {
    console.error("Error fetching earthquake predictions:", error);
    return [];
  }
};

// Fetch historical significant earthquakes
export const fetchHistoricalEarthquakes = async (): Promise<HistoricalEarthquake[]> => {
  // In a real application, this would come from an API or database
  // For now, we'll return static data
  return [
    {
      id: "1",
      year: 2023,
      region: "Turkey-Syria",
      location: "Gaziantep, Turkey",
      magnitude: 7.8,
      casualties: "50,000+",
      impact: "Devastating structural damage, humanitarian crisis",
      coordinates: [37.0662, 37.3825]
    },
    {
      id: "2",
      year: 2021,
      region: "Haiti",
      location: "Petit-Trou-de-Nippes",
      magnitude: 7.2,
      casualties: "2,000+",
      impact: "Extensive damage to infrastructure, landslides",
      coordinates: [-73.4852, 18.4075]
    },
    {
      id: "3",
      year: 2011,
      region: "Japan",
      location: "Tōhoku region",
      magnitude: 9.1,
      casualties: "18,000+",
      impact: "Tsunami, nuclear disaster at Fukushima",
      coordinates: [142.3692, 38.3223]
    },
    {
      id: "4",
      year: 2010,
      region: "Haiti",
      location: "Port-au-Prince",
      magnitude: 7.0,
      casualties: "100,000+",
      impact: "Capital city devastated, critical infrastructure collapse",
      coordinates: [-72.3388, 18.5944]
    },
    {
      id: "5",
      year: 2008,
      region: "China",
      location: "Sichuan",
      magnitude: 7.9,
      casualties: "87,000+",
      impact: "Massive landslides, schools collapsed, 4.8M homeless",
      coordinates: [103.3647, 31.0023]
    },
    {
      id: "6",
      year: 2004,
      region: "Indonesia",
      location: "Indian Ocean",
      magnitude: 9.1,
      casualties: "227,000+",
      impact: "Tsunami affecting 14 countries, global humanitarian response",
      coordinates: [95.8538, 3.2951]
    }
  ];
};

// Fetch risk zones based on tectonic activity and historical patterns
export const fetchRiskZones = async (): Promise<RiskZone[]> => {
  // In a real application, this would come from an API based on real-time analysis
  // For now, we'll return static data for major seismic risk zones
  return [
    {
      id: "1",
      name: "San Andreas Fault Zone",
      coordinates: [-119.4179, 36.7783],
      radius: 300,
      riskLevel: "high",
      description: "Major transform fault between Pacific & North American plates"
    },
    {
      id: "2",
      name: "Japan Trench",
      coordinates: [143.7994, 39.0742],
      radius: 250,
      riskLevel: "extreme",
      description: "Subduction zone where Pacific plate dives under Eurasian plate"
    },
    {
      id: "3", 
      name: "Ring of Fire - Indonesia",
      coordinates: [106.8456, -6.2088],
      radius: 400,
      riskLevel: "extreme",
      description: "Complex convergent plate boundaries with frequent seismic activity"
    },
    {
      id: "4",
      name: "Himalayan Front",
      coordinates: [86.9250, 27.9881],
      radius: 350,
      riskLevel: "high", 
      description: "Continental collision zone between Indian & Eurasian plates"
    },
    {
      id: "5",
      name: "Cascadia Subduction Zone",
      coordinates: [-124.7337, 47.9041],
      radius: 200,
      riskLevel: "high",
      description: "Subduction zone capable of M9.0+ earthquakes"
    },
    {
      id: "6",
      name: "New Madrid Seismic Zone",
      coordinates: [-89.5833, 36.5667],
      radius: 150,
      riskLevel: "moderate",
      description: "Intraplate seismic zone with history of major earthquakes"
    },
    {
      id: "7",
      name: "Chile-Peru Trench",
      coordinates: [-75.0000, -25.0000],
      radius: 400,
      riskLevel: "high",
      description: "Subduction of Nazca plate under South American plate"
    }
  ];
};
