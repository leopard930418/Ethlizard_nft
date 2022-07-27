import React from "react";

export default function CustomText({
  size = "base",
  className = "",
  transparent = false,
  shadow = false,
  children = null,
  color = "white",
  // outlined = true,
  align = "center",
  bold = "normal",
  opacity = "",
  onClick = () => {},
}) {
  return (
    <div
      className={[
        className,
        `text-${align} text-${size}`,
        `text-${color}`,
        `font-${bold}`,
        ,
        opacity ? `text-opacity-${opacity}` : "",
        // outlined ? "text-outline" : "",
        transparent ? "opacity-70" : "",
        // shadow ? "drop-shadow-fab" : "",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
