import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

function Tooltip({
  id,
  place,
  content,
  children,
  className,
  AfterCLickContent,
}) {
  return (
    <div
      data-tooltip-html={content}
      data-tooltip-id={id}
      onMouseOut={(e) =>
        e.currentTarget.setAttribute("data-tooltip-html", content)
      }
      onClick={(e) =>
        e.currentTarget.setAttribute(
          "data-tooltip-html",
          AfterCLickContent ? AfterCLickContent : content
        )
      }
      className={className}
    >
      {children}
      <ReactTooltip
        place={place}
        className="shadow-massive-2 z-20 opacity-100 !backdrop-blur-0 text-white/90 border border-onyx-800 !bg-onyx-900 rounded-xl"
        id={id}
      />
    </div>
  );
}

export default Tooltip;
