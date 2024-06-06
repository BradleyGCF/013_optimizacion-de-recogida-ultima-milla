import { useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useMapStore } from "../../stores/Actions/Maps/storeMap";

export default function CardMaps() {
  const origin = useMapStore((state) => state.origin);
  const destination = useMapStore((state) => state.destination);
  const response = useMapStore((state) => state.response);
  const travelMode = useMapStore((state) => state.travelMode);
  const setOrigin = useMapStore((state) => state.setOrigin);
  const setDestination = useMapStore((state) => state.setDestination);
  const setResponse = useMapStore((state) => state.setResponse);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDestination({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const directionsCallback = (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      setResponse(response);
    } else {
      console.log("response: ", response);
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setOrigin({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDGTxfOhSrJ9CzAQ7gkQPxIxgpLLfpIJgk">
      <GoogleMap
        mapContainerStyle={{
          height: "90vh",
          width: "100%",
        }}
        zoom={14}
        center={destination || { lat: -34.6037, lng: -58.3816 }}
        onClick={handleMapClick}
      >
        {origin && destination && response === null && (
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: travelMode,
            }}
            callback={directionsCallback}
          />
        )}

        {response !== null && (
          <DirectionsRenderer
            options={{
              directions: response,
              preserveViewport: true,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}
