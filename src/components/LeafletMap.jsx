import { useEffect, useRef, useState } from 'react';
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
  const mapRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (mapInstanceRef.current || !hasAnimated) return;
    const map = L.map('map');
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO',
      subdomains: 'abcd',
      minZoom: 4,
      maxZoom: 19,
    }).addTo(map);

    route.forEach((point) => {
      L.marker(point.coords).addTo(map).bindPopup(point.name);
    });

    const ukWaypoints = route.slice(0, 3).map((p) => L.latLng(p.coords));
    const spainWaypoints = route.slice(3).map((p) => L.latLng(p.coords));

    L.Routing.control({
      waypoints: ukWaypoints,
      fitSelectedRoutes: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
      },
    }).addTo(map);

    L.Routing.control({
      waypoints: spainWaypoints,
      fitSelectedRoutes: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: 'green', weight: 4 }],
      },
    }).addTo(map);

    // Define bounds
    const ukBounds = L.latLngBounds(ukWaypoints);
    const spainBounds = L.latLngBounds(spainWaypoints);
    const allBounds = L.latLngBounds(route.map(p => p.coords));

    // Step 1: Fly to UK
    map.fitBounds(ukBounds, { padding: [50, 50] });

    // Step 2: After 3 seconds, fly to Spain
    setTimeout(() => {
      map.flyToBounds(spainBounds, { padding: [50, 50] });
    }, 3000);

    // Step 3: After 3 more seconds, fly to full route
    setTimeout(() => {
      map.flyToBounds(allBounds, { padding: [50, 50] });
    }, 6000);
  }, [hasAnimated]);

  return (
    <div
      ref={mapRef} 
      id="map"
      style={{ 
        borderRadius: '0',
        height: '65vh', 
        width: '100%',  
      }}
    />
  );
}