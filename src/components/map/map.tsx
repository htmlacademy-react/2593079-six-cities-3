import { useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import {Icon, layerGroup, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types';

export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

type mapProps = {
  points: Offer[] | undefined;
  activePoint?: string | null;
  city: City | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [31, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [31, 40],
  iconAnchor: [20, 40]
});

export default function Map({points, activePoint, city}: mapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city || null);

  useEffect(() => {

    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points?.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(point.id === activePoint ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }

  }, [points, map, activePoint]);

  return <div style={{height: '579px'}} ref={mapRef}></div>;
}
