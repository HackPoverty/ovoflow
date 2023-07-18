import { Location } from '@/hooks/useGeolocation';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslations } from 'next-intl';
import { Map, Marker } from 'react-map-gl';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export const LocationPreview = ({ location }: { location: Location }) => {
  const t = useTranslations("FarmChecklist")
  return <>
    <h4 className="bg-neutral text-neutral-content font-semibold px-4 py-1 sticky top-0">{t("location")}</h4>
    <Map
      mapLib={import('mapbox-gl')}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={ACCESS_TOKEN}
      initialViewState={{
        ...location,
        zoom: 12,
      }}
      style={{
        width: "100%",
        height: "200px"
      }}
    >
      <Marker {...location} anchor="bottom">
        <MapPin className="text-error" />
      </Marker>
    </Map>
  </>
}