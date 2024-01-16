import React from "react"
import { VGraphProps } from "./VGraphProps"

/**
 * VGraph: A customizable canvas component.
 * ForwardRef is used to allow ref forwarding to the canvas element.
 */
export const VGraph = React.forwardRef<HTMLCanvasElement, VGraphProps>(
  (
    { id = "vgraph", className, style, width, height, bgColor, ...props },
    ref
  ) => {
    const combinedStyle = {
      width: width,
      height: height,
      backgroundColor: bgColor,
      ...style,
    }

    return (
      <canvas
        id={id}
        className={className}
        style={combinedStyle}
        ref={ref}
        {...props}
      ></canvas>
    )
  }
)

// Default props for the VGraph component.
VGraph.defaultProps = {
  width: "100%",
  height: "100%",
  bgColor: "#eeeeee",
}
