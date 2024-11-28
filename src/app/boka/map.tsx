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
      <div className="min-w-80 not-prose">
        <GoogleMap
          mapId={"bf51a910020fa25a"}
          style={{ width: "600px", height: "470px" }}
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
        <InfoWindow anchor={marker}
        shouldFocus={false}
        onClose={handleClose} className="prose">
          <h1 className="font-bold">{name}</h1>
          <div className="flex justify-between items-center">
            <Image
              src="/Camp_Nou_més_que_un_club.jpg"
              width={200}
              height={150}
              alt={"Més que un club"}
            />
            <Button>Book</Button>
          </div>
          <p>{description}</p>
        </InfoWindow>
      )}
    </>
  );
}
