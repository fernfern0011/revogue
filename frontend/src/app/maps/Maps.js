import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapComponent = dynamic(() => import('./MapsComponent'), {
  ssr: false,
});

export default MapComponent;
