import React from "react";

function AnimatedLogo({ className }) {
  
  document.addEventListener("mousemove", (e) => {
    const AnimateSVG = document.getElementById("ew0VXTbFc281");
    if (AnimateSVG) {
      AnimateSVG.style = `transform: translateY(${
        e.clientY / 70
      }px) translateX(${e.clientX / 70}px)`;
    }
  });

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="ew0VXTbFc281"
      viewBox="0 0 134 134"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <filter
          id="ew0VXTbFc285-filter"
          x="-150%"
          width="400%"
          y="-150%"
          height="400%"
        >
          <feGaussianBlur
            id="ew0VXTbFc285-filter-blur-0"
            stdDeviation="4.71086,4.71086"
            result="result"
          />
        </filter>
      </defs>
      <g clipPath="url(#ew0VXTbFc288)">
        <g>
          <g
            id="ew0VXTbFc284_to"
            style={{
              offsetPath:
                "path('M66.090374,126.872261C26.984606,107.077524,4.212628,75.577674,66.090374,53.872261')",
              offsetRotate: "0deg",
            }}
          >
            <path
              d="M80.0037,4L109.223,66.6601L55.8383,102.668c-3.1035,2.094-6.9019,1.04-8.484-2.353L23.5782,49.3273c-1.4239-3.0535-.3139-7.0561,2.4793-8.9401L80.0037,4Z"
              transform="skewX(3.394873) skewY(0) translate(-66.090374,-53.872261)"
              fill="#e3e3e8"
            />
          </g>
          <g
            id="ew0VXTbFc285_to"
            style={{
              offsetPath:
                "path('M68.005358,134.310993C103.514686,114.549959,128.390279,86.741428,68.005358,51.550993')",
              offsetRotate: "0deg",
            }}
          >
            <g
              transform="translate(-68.005358,-51.548293)"
              filter="url(#ew0VXTbFc285-filter)"
            >
              <path
                d="M73.2749,9.2373l15.5074,27.976-23.69,53.2085c-1.9794,4.4458-5.4966,4.5994-7.856.343L48.3012,74.6455c-1.2704-2.2919-1.4362-6.0905-.3704-8.4844L73.2749,9.2373Z"
                fill="#272991"
                fillOpacity="0.3"
              />
            </g>
          </g>
          <g
            id="ew0VXTbFc287_to"
            style={{
              offsetPath:
                "path('M82.902227,137.437519C130.600148,119.978248,132.110102,83.510205,82.902227,64.437519')",
              offsetRotate: "0deg",
            }}
          >
            <path
              d="M80.0029,4L113.522,64.4693L88.1577,121.438c-1.9794,4.445-5.4967,4.599-7.856.343L53.3553,73.168c-1.2704-2.2919-1.4363-6.0905-.3705-8.4844L80.0029,4Z"
              transform="skewX(2.547398) skewY(0) translate(-82.902227,-64.437519)"
              fill="#6366f1"
            />
          </g>
        </g>
        <clipPath id="ew0VXTbFc288">
          <rect width="134" height="134" rx="0" ry="0" fill="#fff" />
        </clipPath>
      </g>
    </svg>
  );
}

export default AnimatedLogo;
