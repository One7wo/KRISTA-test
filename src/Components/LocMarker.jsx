import React, { useMemo, useRef } from "react";

import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";

import { Marker, Popup } from "react-leaflet";

export default function LocMarker({ position, name, markerList, index, move }) {
  const myIcon = L.icon({
    iconUrl: icon,
  });

  const markRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markRef.current;
        if (marker != null) {
          move(false);
          markerList[index].lat = marker.getLatLng().lat;
          markerList[index].lng = marker.getLatLng().lng;
          move(true);
        }
      },
    }),
    []
  );

  return (
    <Marker
      position={position}
      draggable={true}
      icon={myIcon}
      ref={markRef}
      eventHandlers={eventHandlers}
    >
      <Popup>{name}</Popup>
    </Marker>
  );
}
