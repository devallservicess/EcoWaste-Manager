import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPoints } from '../services/api';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await getPoints();
                setPoints(response.data);
            } catch (error) {
                console.error("Error fetching points:", error);
            }
        };
        fetchPoints();
    }, []);

    // Default center (Tunis or modify as needed)
    const position = [36.8065, 10.1815];

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map(point => (
                <Marker key={point.id} position={[point.latitude, point.longitude]}>
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold text-lg">Point #{point.id}</h3>
                            <p>Type: {point.typeDechet}</p>
                            <p>Fill Level: <span className={point.niveauRemplissage > 80 ? 'text-red-600 font-bold' : 'text-green-600'}>{point.niveauRemplissage}%</span></p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${point.niveauRemplissage}%` }}></div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
