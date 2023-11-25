import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoJsonObject } from 'geojson';

type MapComponentProps = {
  uploadedFile: File | null;
};

const MapComponent: React.FC<MapComponentProps> = ({ uploadedFile }) => {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const json = JSON.parse(event.target.result as string);
          setGeoJsonData(json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setGeoJsonData(null);
        }
      };
      reader.readAsText(uploadedFile);
    }
  }, [uploadedFile]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoJsonData && <GeoJSON data={geoJsonData} />}
    </MapContainer>
  );
};

export default MapComponent;
