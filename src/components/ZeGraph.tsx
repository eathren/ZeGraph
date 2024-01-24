import React, { useEffect, useRef, useState } from "react"
import { ZeGraphProps } from "./ZeGraphProps"
import { drawSequential, zoom } from "../util"
import { generateDemoGraphData } from "../util/data"
import { LayoutType } from "../types"

const { nodes, edges } = generateDemoGraphData() // For development purposes

export const ZeGraph = ({
  id = "ZeGraph",
  className,
  style,
  width,
  height,
  bgColor,
  layout = LayoutType.SEQUENTIAL,
  ...props
}: ZeGraphProps) => {
  const combinedStyle = {
    width: width,
    height: height,
    backgroundColor: bgColor,
    ...style,
  }

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  const handleMouseDown = (event: {
    preventDefault: () => void
    clientX: any
    clientY: any
  }) => {
    event.preventDefault()
    setIsDragging(true)
    setLastMousePos({ x: event.clientX, y: event.clientY })
  }

  const handleMouseMove = (event: { clientX: number; clientY: number }) => {
    if (isDragging) {
      const deltaX = event.clientX - lastMousePos.x
      const deltaY = event.clientY - lastMousePos.y

      const newOffset = {
        x: offset.x + deltaX / scale,
        y: offset.y + deltaY / scale,
      }

      setOffset(newOffset)
      setLastMousePos({ x: event.clientX, y: event.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Mouse wheel event handler for zooming
  const handleCanvasWheel = (event: WheelEvent) => {
    event.preventDefault()
    const canvas = canvasRef.current
    if (canvas && context) {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      const delta = event.deltaY > 0 ? 0.9 : 1.1

      const { scale: newScale, offset: newOffset } = zoom(
        scale,
        offset,
        mouseX,
        mouseY,
        delta
      )

      setScale(newScale)
      setOffset(newOffset)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        setContext(ctx)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas) {
      canvas.addEventListener("mousedown", handleMouseDown)
      canvas.addEventListener("mousemove", handleMouseMove)
      canvas.addEventListener("mouseup", handleMouseUp)
      canvas.addEventListener("wheel", handleCanvasWheel, { passive: false })
    }

    // Clean up event listeners when the component unmounts
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", handleMouseDown)
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("mouseup", handleMouseUp)
        canvas.removeEventListener("wheel", handleCanvasWheel)
      }
    }
  }, [offset, scale, isDragging])

  const drawGraph = () => {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      context.save()
      context.translate(offset.x, offset.y)
      context.scale(scale, scale)
      switch (layout) {
        case LayoutType.SEQUENTIAL:
          drawSequential(context, nodes, edges)
        case LayoutType.ORGANIC:
          break
        default:
          break
      }
      // edges.forEach((edge) => {
      //   const sourceNode = nodes.find((n) => n.id === edge.source)
      //   const targetNode = nodes.find((n) => n.id === edge.target)
      //   if (sourceNode && targetNode) {
      //     drawEdge(context, sourceNode, targetNode, edge)
      //   }
      // })
      // nodes.forEach((node) => drawNode(context, node))
      context.restore()
    }
  }

  useEffect(() => {
    drawGraph()
  }, [drawGraph])

  return (
    <canvas
      id={id}
      className={className}
      style={combinedStyle}
      ref={canvasRef}
      width={width}
      height={height}
      {...props}
    ></canvas>
  )
}

ZeGraph.defaultProps = {
  width: "100%",
  height: "100%",
  bgColor: "#eeeeee",
  layout: LayoutType.SEQUENTIAL,
}
