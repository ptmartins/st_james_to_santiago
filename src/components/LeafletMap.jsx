import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const route = [
    { name: "London (St James's Park)", coords: [51.5020, -0.1347] },
    { name: "Haslemere", coords: [51.0881, -0.7198] },
    { name: "Portsmouth", coords: [50.7989, -1.0912] },
    { name: 'Santander', coords: [43.4623, -3.8099] },
    { name: 'Santillana del Mar', coords: [43.3935, -4.1090] },
    { name: 'San Vicente de la Barquera', coords: [43.3879, -4.3954] },
    { name: 'Llanes', coords: [43.4197, -4.7521] },
    { name: 'Ribadesella', coords: [43.4636, -5.0590] },
    { name: 'Villaviciosa', coords: [43.4811, -5.4357] },
    { name: 'Avilés', coords: [43.5561, -5.9245] },
    { name: 'Soto de Luiña', coords: [43.5589, -6.2989] },
    { name: 'Luarca', coords: [43.5386, -6.5317] },
    { name: 'Navia', coords: [43.5346, -6.7222] },
    { name: 'Tapia de Casariego', coords: [43.5697, -6.9439] },
    { name: 'Ribadeo', coords: [43.5330, -7.0419] },
    { name: 'Mondoñedo', coords: [43.4289, -7.3561] },
    { name: 'Vilalba', coords: [43.3002, -7.6814] },
    { name: 'Baamonde', coords: [43.1833, -7.7833] },
    { name: 'Sobrado dos Monxes', coords: [43.0706, -8.0132] },
    { name: 'Arzúa', coords: [42.9277, -8.1517] },
    { name: 'Santiago de Compostela', coords: [42.8782, -8.5448] }
];

export default function LeafletMap() {
  useEffect(() => {
    const map = L.map('map').setView([47, -3], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add markers
    route.forEach((point) => {
        L.marker(point.coords).addTo(map).bindPopup(point.name);
    });

    // Separate UK and Spain routes
    const ukWaypoints = route.slice(0, 3).map((p) => L.latLng(p.coords[0], p.coords[1]));
    const spainWaypoints = route.slice(3).map((p) => L.latLng(p.coords[0], p.coords[1]));

    // UK route
    L.Routing.control({
        waypoints: ukWaypoints,
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null,
        lineOptions: {
        styles: [{ 
          color: 'blue', 
          weight: 4 }]
        }
    }).addTo(map);

    // Spain route
    L.Routing.control({
        waypoints: spainWaypoints,
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null,
        lineOptions: {
        styles: [{ 
          color: 'blue', 
          weight: 4 }]
        }
    }).addTo(map);    
  }, []);

  return (
    <div
      id="map"
      style={{ 
        height: '65vh', 
        width: '100%', 
        borderRadius: '0' }}
    />
  );
}