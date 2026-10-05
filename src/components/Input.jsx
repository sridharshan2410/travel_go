import React from "react";

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error
}) {
  return (
    <div className="reusable-input">
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && (
        <p className="error">{error}</p>
      )}
    </div>
  );
}

export default Input;