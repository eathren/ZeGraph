import { Edge, Node } from "../types"

const DEFAULT_HEIGHT = 80
const DEFAULT_WIDTH = 80

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor: string,
  strokeColor: string = fillColor,
  lineWidth: number = 2,
  path: Path2D
): Path2D {
  path.moveTo(x + radius, y)
  path.arcTo(x + width, y, x + width, y + height, radius) // Top right corner
  path.arcTo(x + width, y + height, x, y + height, radius) // Bottom right corner
  path.arcTo(x, y + height, x, y, radius) // Bottom left corner
  path.arcTo(x, y, x + width, y, radius) // Top left corner
  path.closePath()

  ctx.fillStyle = fillColor
  ctx.fill(path)

  if (lineWidth > 0) {
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = lineWidth
    ctx.stroke(path)
  }

  return path
}
export const drawNode = (ctx: CanvasRenderingContext2D, canvasNode: Node) => {
  const width = canvasNode.width || DEFAULT_WIDTH
  const height = canvasNode.height || DEFAULT_HEIGHT
  const radius = canvasNode.radius || 10
  const fillColor = canvasNode.fillColor || "#FFFFFF"
  const strokeColor = canvasNode.strokeColor || "#000000"
  const lineWidth = 2
  const path = new Path2D()
  drawRoundedRect(
    ctx,
    canvasNode.x,
    canvasNode.y,
    width,
    height,
    radius,
    fillColor,
    strokeColor,
    lineWidth,
    path
  )

  // Drawing the text inside the node
  const textX = canvasNode.x + width / 2
  const textY = canvasNode.y + height / 2
  ctx.fillStyle = "black" // Set text color to white
  ctx.font = "16px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(canvasNode.label || "", textX, textY)
}
export const drawEdge = (
  ctx: CanvasRenderingContext2D,
  sourceNode: Node,
  targetNode: Node,
  edge: Edge
) => {
  const controlPointOffset = 50 // Adjust this value to control the curve's shape
  const sourceWidth = sourceNode.width || DEFAULT_WIDTH
  const sourceHeight = sourceNode.height || DEFAULT_HEIGHT
  const targetWidth = targetNode.width || DEFAULT_WIDTH
  const targetHeight = targetNode.height || DEFAULT_HEIGHT

  const sourceX = sourceNode.x + sourceWidth / 2
  const sourceY = sourceNode.y + sourceHeight / 2
  const targetX = targetNode.x + targetWidth / 2
  const targetY = targetNode.y + targetHeight / 2

  const strokeColor = edge.color || "#000000"
  ctx.beginPath()
  ctx.moveTo(sourceX, sourceY)
  ctx.bezierCurveTo(
    sourceX + controlPointOffset, // Control point 1 x
    sourceY, // Control point 1 y
    targetX - controlPointOffset, // Control point 2 x
    targetY, // Control point 2 y
    targetX, // End point x
    targetY // End point y
  )
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = 2
  ctx.stroke()
}
