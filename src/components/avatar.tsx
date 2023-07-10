import React from "react";
import Tilt from "react-parallax-tilt";

export default function Avatar({ size }: { size: number }) {
  return (
    <Tilt>
      <img
        height={size}
        width={size}
        style={{
          borderRadius: "50%",
          marginTop: "15px",
          boxShadow: "0 0 10px 1px rgba(0, 0, 0, .25)",
        }}
        src="sept.jpg"
        alt="avatar"
      />
    </Tilt>
  );
}
