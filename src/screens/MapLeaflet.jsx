import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";
import axios from "axios";
import "./Map.style.css";

const MapLeaflet = ({ address2 }) => {
  const mapRef = useRef(null);
  const [routeLayers, setRouteLayers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(
        [address2?.[0].lat, address2?.[0].lng],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapRef.current);

      // biome-ignore lint/complexity/noForEach: <explanation>
      address2.forEach((location) => {
        L.marker([location.lat, location.lng]).addTo(mapRef.current);
      });

      // Dibujar la ruta
      drawRoute(address2);
    }
  }, [address2]);

  const getColorBasedOnDistance = (distance) => {
    // Define your logic to get color based on distance
    return distance > 2000 ? "red" : "green";
  };

  const drawRoute = async (waypoints) => {
    if (waypoints.length < 2) {
      return;
    }

    // biome-ignore lint/complexity/noForEach: <explanation>
    routeLayers.forEach((layer) => mapRef.current.removeLayer(layer));
    setRouteLayers([]);

    const segments = [];
    for (let i = 0; i < waypoints.length - 1; i++) {
      segments.push([waypoints[i], waypoints[i + 1]]);
    }

    const coordinates = segments.map((segment) =>
      segment.map((point) => [point.lng, point.lat])
    );

    const url =
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

    try {
      const response = await axios.post(
        url,
        { coordinates: coordinates.flat() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "5b3ce3597851110001cf6248fb92c2050b27472ba542a828a1334e31",
          },
        }
      );

      const data = response.data.features[0];
      const segments = data.properties.segments;
      const allCoordinates = data.geometry.coordinates;

      let previousEnd = 0;

      // biome-ignore lint/complexity/noForEach: <explanation>
      segments.forEach((segment) => {
        const segmentCoordinates = allCoordinates
          .slice(
            previousEnd,
            segment.steps[segment.steps.length - 1].way_points[1] + 1
          )
          .map((coord) => [coord[1], coord[0]]);

        const distance = segment.distance;
        const color = getColorBasedOnDistance(distance);

        const polylineBorder = L.polyline(segmentCoordinates, {
          color: "black",
          weight: 8,
        });
        const polyline = L.polyline(segmentCoordinates, {
          color: color,
          weight: 5,
        });

        polylineBorder.addTo(mapRef.current);
        polyline.addTo(mapRef.current);

        setRouteLayers((prevLayers) => [
          ...prevLayers,
          polyline,
          polylineBorder,
        ]);

        previousEnd = segment.steps[segment.steps.length - 1].way_points[1];
      });
    } catch (error) {
      const errorCode = error?.response?.data?.error?.code;

      if (errorCode === 2010) {
        setErrorMsg("No se pudo encontrar una ruta entre las direcciones.");
      } else {
        setErrorMsg(
          "Error dibujando la ruta. Espera un momento y vuelve a intentarlo."
        );
      }
    }
  };

  // if (!address2.length) {
  //   return <div> </div>;
  // }

  return (
    <>
      <div id="map" />
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
};

export default MapLeaflet;
