import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { route } from '../data/data.js';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


const ferryRoute = [
  { name: "Portsmouth", coords: [50.7989, -1.0912] },
  { name: "South of Isle of Wight", coords: [50.55, -1.0] },
  { name: "South of Isle of Wight", coords: [50.55, -1.3] },
  { name: "Southwest Channel", coords: [49.9, -2.0] },
  { name: "Off Brittany", coords: [48.5, -5.0] },
  { name: "Bay of Biscay", coords: [45.5, -4.5] },
  { name: "Santander", coords: [43.4623, -3.8099] }
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

    // Set waypoints for UK and Spain segments
    const ukWaypoints = route.slice(0, 3).map((p) => L.latLng(p.coords));
    const spainWaypoints = route.slice(3).map((p) => L.latLng(p.coords));

    // Add UK route
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

    // Add Spain route
    L.Routing.control({
      waypoints: spainWaypoints,
      fitSelectedRoutes: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
      },
    }).addTo(map);

    // Add ferry route
    L.polyline(
      ferryRoute.map(point => point.coords),
      { 
        color: 'blue', 
        weight: 4, 
        dashArray: '10,10' }
    ).addTo(map);

    // Define bounds
    const ukBounds = L.latLngBounds(ukWaypoints);
    const spainBounds = L.latLngBounds(spainWaypoints);
    const allBounds = L.latLngBounds(route.map(p => p.coords));

    // Anim 1: Fly to UK
    map.fitBounds(ukBounds, { padding: [50, 50] });

    // Anim 2: After 3 seconds, fly to Spain
    setTimeout(() => {
      map.flyToBounds(spainBounds, { padding: [50, 50] });
    }, 3000);

    // Anim 3: After 3 more seconds, fly to full route
    setTimeout(() => {
      map.flyToBounds(allBounds, { padding: [50, 50] });
    }, 6000);

   // Re-zoom to catch Uk and SP routesm when clicking outside the map
    const handleClick = (e) => {
      const mapEl = mapRef.current;
      if (mapEl && !mapEl.contains(e.target)) {
        map.fitBounds(allBounds, { padding: [50, 50] });
      }
    };

    document.addEventListener('click', handleClick);
  }, [hasAnimated]);

  return (
    <div
      ref={mapRef} 
      id="map"
      style={{ 
        borderRadius: '16px',
        height: '50vh', 
        width: '100%',  
      }}
    />
  );
}