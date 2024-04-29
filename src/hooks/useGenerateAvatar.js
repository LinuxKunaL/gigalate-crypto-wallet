import React from "react";

function useGenerateAvatar() {
  const generateAvatar = () => {
    const svgWidth = 64;
    const svgHeight = 64;

    const faceColor = `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(
      Math.random() * 100
    )}%, ${Math.floor(Math.random() * 50) + 50}%)`;
    const eyeColor = "#333333";
    const mouthColor = "#333333";

    const eye1X = Math.floor(Math.random() * 20) + 22;
    const eye2X = Math.floor(Math.random() * 20) + 42;
    const eyeY = Math.floor(Math.random() * 10) + 24;

    const mouthShape = Math.floor(Math.random() * 5);

    let mouthPath;
    switch (mouthShape) {
      case 1:
        mouthPath = `M20 45 Q 32 30 44 45`;
        break;
      case 2:
        mouthPath = `M20 45 Q 32 50 44 45`;
        break;
      case 3:
        mouthPath = `M20 40 Q 32 30 44 40`;
        break;
      case 4:
        mouthPath = `M20 40 Q 32 25 44 40`;
        break;
      default:
        mouthPath = `M20 40 Q 32 40 44 40`;
    }

    const svgString = `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${svgWidth} ${svgHeight}"
        width="${svgWidth}"
        height="${svgHeight}"
      >
        <circle cx="32" cy="32" r="30" fill="${faceColor}" />
        <circle cx="${eye1X}" cy="${eyeY}" r="4" fill="${eyeColor}" />
        <circle cx="${eye2X}" cy="${eyeY}" r="4" fill="${eyeColor}" />
        <path d="${mouthPath}" fill="none" stroke="${mouthColor}" strokeWidth="3" />
      </svg>`;

    const base64String = btoa(svgString);
    const dataUri = `data:image/svg+xml;base64,${base64String}`;

    return dataUri;
  };

  return {
    generateAvatar,
  };
}

export default useGenerateAvatar;
