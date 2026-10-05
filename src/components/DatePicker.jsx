import React from "react";

function DatePicker({
  label,
  value,
  onChange,
  min,
  error
}) {
  return (
    <div className="reusable-input">
      <label>{label}</label>

      <input
        type="date"
        value={value || ""}
        min={min}
        onChange={onChange}
      />

      {error && (
        <p className="error">{error}</p>
      )}
    </div>
  );
}

export default DatePicker;