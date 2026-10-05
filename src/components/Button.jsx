import React from "react";

function Button({
  children,
  type = "button",
  onClick,
  className = ""
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`reusable-button ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;