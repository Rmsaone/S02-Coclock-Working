import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './MapComponent.module.scss';
import { LatLngExpression } from 'leaflet';
import { Workspace } from '../@types/workspace';


const MapComponent: React.FC<{ workspace: Workspace }> = ({ workspace }) => {
    // Transcription des coordonnées en LatLngExpression pour l'affichage dans Leaflet
    const parsedLatLng: LatLngExpression = JSON.parse(workspace.location);
    return (
        <MapContainer style={{height: '100%'}} center={parsedLatLng} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={parsedLatLng}>
                <Popup>
                    {workspace.name}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

  
export default MapComponent;