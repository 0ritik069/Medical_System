import React, { useEffect, useState } from "react";
// import "./AnalogClock.css";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="clock">
      {[...Array(12)].map((_, i) => {
        const number = i + 1;
        const angle = number * 30;
        const radius = 40;  
        const center = 51;

        const x = center + radius * Math.sin((angle * Math.PI) / 180);
        const y = center - radius * Math.cos((angle * Math.PI) / 180);

        // Optional visual correction
        let xOffset = 0;
        if (number >= 10) {
          xOffset = -1.5;
        } else if ([1, 2, 3, 4].includes(number)) {
          xOffset = 1.5;
        } else if ([8, 9].includes(number)) {
          xOffset = -1;
        }

        return (
          <div
            key={i}
            className="number"
            style={{
              position: "absolute",
              left: `${x + xOffset}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {number}
          </div>
        );
      })}

      <div
        className="hand hour"
        style={{ transform: `rotate(${hourDeg}deg)` }}
      />
      <div
        className="hand minute"
        style={{ transform: `rotate(${minuteDeg}deg)` }}
      />
      <div
        className="hand second"
        style={{ transform: `rotate(${secondDeg}deg)` }}
      />
      <div className="center-dot" />
    </div>
  );
};

export default AnalogClock;
