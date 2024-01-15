import React from "react"

interface VGraphProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  // Add any additional props you expect
  // For example:
  // customProp?: string;
}

export const VGraph = React.forwardRef<HTMLCanvasElement, VGraphProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <canvas
        id="vgraph"
        width="100%" // Consider making this a defaultProp or part of VGraphProps
        height="100%" // Same as above
        className={className}
        style={style}
        ref={ref}
        {...props} // Spreads any other props passed to the component
      ></canvas>
    )
  }
)

VGraph.defaultProps = {
  style: { width: "100%", height: "100%" },
}
