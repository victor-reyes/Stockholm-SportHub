"use client";
import { FacilitySelect } from "@/features/book/types";
import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";

type Props = {
  apiKey: string;
  facilities: FacilitySelect[];
};
export function Map({ apiKey, facilities }: Props) {
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
        >
          {facilities.map((facility) => (
            <Marker
              key={facility.id}
              position={{ lat: facility.lat, lng: facility.lng }}
            ></Marker>
          ))}
        </GoogleMap>
      </div>
    </APIProvider>
  );
}
