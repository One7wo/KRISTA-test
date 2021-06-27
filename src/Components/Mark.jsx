import React from "react";

export default function Mark({ value, obj, deleteMark }) {
  return (
    <div className="mark-line">
      <div className="mark-title">{value}</div>
      <div className="delete-mark" onClick={() => deleteMark(obj.id)}>
        <span className="del">×</span>
      </div>
    </div>
  );
}
