import React from "react";

function AnimatedLoading() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 600 600"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      width="600"
      height="600"
    >
      <script>{`var ythdlog = () => {}; var ythderror = () => {};`}</script>
      <style>
        {`#eTRjWHx8psJ3_tr {animation: eTRjWHx8psJ3_tr__tr 3000ms linear infinite normal forwards} @keyframes eTRjWHx8psJ3_tr__tr { 0% {transform: translate(300px,300px) rotate(90deg)} 100% {transform: translate(300px,300px) rotate(810deg)}} #eTRjWHx8psJ4_tr {animation: eTRjWHx8psJ4_tr__tr 3000ms linear infinite normal forwards} @keyframes eTRjWHx8psJ4_tr__tr { 0% {transform: translate(300px,300px) rotate(90deg)} 100% {transform: translate(300px,300px) rotate(810deg)}} #eTRjWHx8psJ4 {animation: eTRjWHx8psJ4_s_do 3000ms linear infinite normal forwards} @keyframes eTRjWHx8psJ4_s_do { 0% {stroke-dashoffset: 1602.210000} 100% {stroke-dashoffset: 4806.630000}}`}
      </style>
      <g id="eTRjWHx8psJ2">
        <g id="eTRjWHx8psJ3_tr" transform="translate(300,300) rotate(90)">
          <ellipse
            id="eTRjWHx8psJ3"
            rx="255"
            ry="255"
            transform="scale(-1,1) translate(0,0)"
            fill="none"
            stroke="rgb(255,255,255)"
            strokeWidth="75"
            strokeOpacity="0.2"
            strokeLinecap="round"
          />
        </g>
        <g id="eTRjWHx8psJ4_tr" transform="translate(300,300) rotate(90)">
          <ellipse
            id="eTRjWHx8psJ4"
            rx="255"
            ry="255"
            transform="scale(-1,1) translate(0,0)"
            fill="none"
            stroke="rgb(255,255,255)"
            strokeWidth="75"
            strokeLinecap="round"
            strokeDashoffset="1602.210000"
            strokeDasharray="1602.210000"
          />
        </g>
      </g>
    </svg>
  );
}

export default AnimatedLoading;
