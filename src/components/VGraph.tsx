import React, { useEffect, useRef, useState } from "react"
import { VGraphProps } from "./VGraphProps"
import { drawNode, drawEdge } from "../util"
import { generateDemoGraphData } from "../util/data"

export const VGraph = React.forwardRef<HTMLCanvasElement, VGraphProps>(
  ({ id = "vgraph", className, style, width, height, bgColor, ...props }) => {
    const combinedStyle = {
      width: width,
      height: height,
      backgroundColor: bgColor,
      ...style,
    }

    const internalCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(
      null
    )
    const [scale, setScale] = useState(1)
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const { nodes, edges } = generateDemoGraphData()

    const handleWheel = (event: React.WheelEvent) => {
      event.preventDefault()
      const canvas = internalCanvasRef.current
      if (canvas && context) {
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        const delta = event.deltaY > 0 ? 0.9 : 1.1
        setScale((scale) => scale * delta)
        setOffset((offset) => ({
          x: offset.x - mouseX * (1 - delta),
          y: offset.y - mouseY * (1 - delta),
        }))
      }
    }

    const drawGraph = () => {
      if (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.save()
        context.translate(offset.x, offset.y)
        context.scale(scale, scale)
        nodes.forEach((node) => drawNode(context, node))
        edges.forEach((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source)
          const targetNode = nodes.find((n) => n.id === edge.target)
          if (sourceNode && targetNode) {
            drawEdge(context, sourceNode, targetNode, edge)
          }
        })
        context.restore()
      }
    }

    useEffect(() => {
      const canvas = internalCanvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          setContext(ctx)
        }
      }
    }, [])

    useEffect(drawGraph, [nodes, edges, scale, offset])

    return (
      <canvas
        id={id}
        className={className}
        style={combinedStyle}
        ref={internalCanvasRef}
        width={width}
        height={height}
        onWheel={handleWheel}
        {...props}
      ></canvas>
    )
  }
)

VGraph.defaultProps = {
  width: "100%",
  height: "100%",
  bgColor: "#eeeeee",
}
