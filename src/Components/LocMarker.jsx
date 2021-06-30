import React, { useMemo, useRef, useState } from "react";

import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";

import { Marker, Popup, useMap } from "react-leaflet";

export default function LocMarker({
  position,
  name,
  markerList,
  index,
  setMarks,
}) {
  const myIcon = L.icon({
    iconUrl: icon,
  });

  const markRef = useRef(null);

  const [road, setRoad] = useState([]);
  const map = useMap();

  // получение координат всех маркеров
  function getNewRoad() {
    var points = [];
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        points.push([layer._latlng.lat, layer._latlng.lng]);
      }
    });
    return points;
  }

  // обработчик перетаскивания
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markRef.current;
        if (marker != null) {
          markerList[index].lat = marker.getLatLng().lat;
          markerList[index].lng = marker.getLatLng().lng;
          setRoad(getNewRoad());
        }
      },
    }),
    []
  );

  // меняем координаты если точки перетаскивали
  const newList = (road) => {
    if (road.length > 0) {
      const list = markerList.map((e, i) => ({
        name: e.name,
        id: e.id,
        lat: road[i][0],
        lng: road[i][1],
      }));
      setMarks(list);
      setRoad([]);
    }
  };

  // обновляем карту
  newList(road);
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
