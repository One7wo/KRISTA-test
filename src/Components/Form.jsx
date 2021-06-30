import React from "react";
import { useState } from "react";
import Mark from "./Mark";

import { useMap } from "react-leaflet";

export default function Form({ marks, setMarks }) {
  const [value, setValue] = useState("");

  const map = useMap();

  const createMark = (text) => {
    const newMark = [
      ...marks,
      {
        name: text,
        id: Math.random().toString(36).substr(2, 9),
        lat: map.getCenter().lat,
        lng: map.getCenter().lng,
      },
    ];
    setMarks(newMark);
  };

  const deleteMark = (id) => {
    const newMark = marks.filter((mark) => mark.id !== id);
    setMarks(newMark);
  };

  return (
    <div className="form">
      <input
        type="text"
        className="mark-input"
        placeholder="Введите название пункта"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && value.length > 0) {
            createMark(value);
            setValue("");
          }
        }}
      />
      {marks.map((obj, i) => (
        <Mark key={i} value={marks[i].name} obj={obj} deleteMark={deleteMark} />
      ))}
    </div>
  );
}
