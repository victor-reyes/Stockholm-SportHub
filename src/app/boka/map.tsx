"use client";
import { Button } from "@/components/ui/button";
import { FacilitySelect } from "@/features/book/types";
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  APIProvider,
  Map as GoogleMap,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useCallback, useState } from "react";

type Props = {
  apiKey: string;
  facilities: FacilitySelect[];
  onBoundsChanged?: (bounds: google.maps.LatLngBounds) => void;
};
export function Map({ apiKey, facilities, onBoundsChanged = () => {} }: Props) {
  return (
    <APIProvider apiKey={apiKey}>
      <div className="max-w-full w-3/4 not-prose">
        <GoogleMap
          className="h-[440]"
          mapId={"bf51a910020fa25a"}
          defaultZoom={11}
          defaultCenter={{ lat: 59.33258, lng: 18.0649 }}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          reuseMaps={true}
          onBoundsChanged={(event) => {
            const bounds = event.map.getBounds();
            if (bounds) onBoundsChanged(bounds);
          }}
        >
          {facilities.map((facility) => (
            <Marker key={facility.id} {...facility} />
          ))}
        </GoogleMap>
      </div>
    </APIProvider>
  );
}

function Marker({ id, name, description, lat, lng }: FacilitySelect) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    [],
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        key={id}
        ref={markerRef}
        onClick={handleMarkerClick}
        position={{ lat, lng }}
      >
        <img
          src={"https://www.svgrepo.com/show/398389/stadium.svg"}
          width={40}
          height={40}
        />
      </AdvancedMarker>
      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          shouldFocus={false}
          onClose={handleClose}
          className="prose prose-sm max-w-sm max-h-36"
        >
          <h1 className="font-bold">{name}</h1>

          <Image
            src="/Camp_Nou_més_que_un_club.jpg"
            width={130}
            height={120}
            alt={"Més que un club"}
            className="float-start pe-1 pb-1"
          />
          <p className="leading-4 tracking-tight">
            {description}. {description}
          </p>
          <Button className="float-right">Book</Button>
        </InfoWindow>
      )}
    </>
  );
}
