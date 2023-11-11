import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const DynamicMap = () => {
    return (
        <MapContainer style={{ height: "100%", width: "100%" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default DynamicMap;