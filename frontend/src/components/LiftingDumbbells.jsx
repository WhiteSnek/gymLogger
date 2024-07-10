import React from 'react';

const LiftingDumbbells = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <style>
      {`
      .body { fill: #1C1917; } /* stone-900 */
      .dumbbell { fill: #EF4444; } /* red-500 */
      .arm {
        fill: #1C1917;
        transform-origin: top;
        animation: lift 1s infinite alternate;
      }
      @keyframes lift {
        0% { transform: rotate(0); }
        100% { transform: rotate(-45deg); }
      }
      `}
    </style>

    {/* Body */}
    <circle className="body" cx="100" cy="100" r="50" />
    
    {/* Arms */}
    <rect className="arm" x="80" y="60" width="10" height="40" />
    <rect className="arm" x="110" y="60" width="10" height="40" />

    {/* Dumbbells */}
    <rect className="dumbbell" x="70" y="20" width="30" height="10" />
    <rect className="dumbbell" x="100" y="20" width="30" height="10" />
  </svg>
);

export default LiftingDumbbells;
