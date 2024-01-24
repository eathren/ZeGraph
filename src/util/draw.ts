import { CanvasEdge, CanvasNode } from "../types"

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
export const drawNode = (
  ctx: CanvasRenderingContext2D,
  canvasNode: CanvasNode
) => {
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
  sourceNode: CanvasNode,
  targetNode: CanvasNode,
  edge: CanvasEdge
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

export const drawSequential = (
  ctx: CanvasRenderingContext2D,
  nodes: CanvasNode[],
  edges: CanvasEdge[]
) => {
  // Create a mapping of nodes by ID for easier lookup
  const nodeMap: { [id: string]: CanvasNode } = {}
  nodes.forEach((node) => {
    nodeMap[node.id] = node
  })

  // Sort edges by source and target IDs
  edges.sort((a, b) => {
    const sourceA = a.source
    const sourceB = b.source
    const targetA = a.target
    const targetB = b.target

    if (sourceA === sourceB) {
      return targetA.localeCompare(targetB)
    } else {
      return sourceA.localeCompare(sourceB)
    }
  })

  // Set initial positions for nodes
  let xPos = 10
  let yPos = 10 // Start with a vertical offset of 10

  // Define the maximum number of nodes per row and the current node count
  const maxNodesPerRow = 5 // You can adjust this based on your needs
  let nodesInCurrentRow = 0

  // Loop through edges and position nodes sequentially
  edges.forEach((edge) => {
    const sourceNode = nodeMap[edge.source]
    const targetNode = nodeMap[edge.target]

    if (sourceNode && targetNode) {
      // Set positions for source and target nodes
      sourceNode.x = xPos
      sourceNode.y = yPos
      targetNode.x = xPos + 100 // Adjust the horizontal spacing between nodes
      targetNode.y = yPos

      // Update xPos for the next pair of nodes
      xPos += 120 // Adjust this value based on your desired spacing

      // Increment the node count in the current row
      nodesInCurrentRow++

      // Check if the current row is full, and if so, move to the next row
      nodesInCurrentRow = 0
      xPos = 10 // Reset xPos
      yPos += 120 // Move to the next row vertically (adjust as needed)

      // Draw the nodes and edge
      drawEdge(ctx, sourceNode, targetNode, edge)
      drawNode(ctx, sourceNode)
      drawNode(ctx, targetNode)
    }
  })
}

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  nodes: CanvasNode[],
  edges: CanvasEdge[]
) => {
  // Create a mapping of nodes by ID for easier lookup
  const nodeMap: { [id: string]: CanvasNode } = {}
  nodes.forEach((node) => {
    nodeMap[node.id] = node
  })

  // Sort edges by source and target IDs
  edges.sort((a, b) => {
    const sourceA = a.source
    const sourceB = b.source
    const targetA = a.target
    const targetB = b.target

    if (sourceA === sourceB) {
      return targetA.localeCompare(targetB)
    } else {
      return sourceA.localeCompare(sourceB)
    }
  })

  // Create a mapping of parent nodes to their child nodes
  const parentToChildMap: { [parentId: string]: CanvasNode[] } = {}

  // Populate the parentToChildMap based on the edges
  edges.forEach((edge) => {
    const sourceNode = nodeMap[edge.source]
    const targetNode = nodeMap[edge.target]

    if (sourceNode && targetNode) {
      if (!parentToChildMap[sourceNode.id]) {
        parentToChildMap[sourceNode.id] = []
      }
      parentToChildMap[sourceNode.id].push(targetNode)
    }
  })

  // Set initial positions for nodes
  let xPos = 10
  let yPos = 10 // Start with a vertical offset of 10

  // Define the maximum number of nodes per row and the current node count
  const maxNodesPerRow = 5 // You can adjust this based on your needs
  let nodesInCurrentRow = 0

  // Loop through edges and position nodes sequentially
  edges.forEach((edge) => {
    const sourceNode = nodeMap[edge.source]
    const targetNode = nodeMap[edge.target]

    if (sourceNode && targetNode) {
      // Set positions for source and target nodes
      sourceNode.x = xPos
      sourceNode.y = yPos

      // Check if the source node has more than one child
      const children = parentToChildMap[sourceNode.id] || []
      const numChildren = children.length

      // If there are children, stack them vertically below the source node
      if (numChildren > 0) {
        let childYPos = yPos + sourceNode.height + 20 // Adjust the vertical spacing between parent and child nodes
        children.forEach((child) => {
          child.x = xPos
          child.y = childYPos
          childYPos += child.height + 20 // Adjust the vertical spacing between child nodes
          drawNode(ctx, child)

          // Draw an edge from source to child
          const edgeFromSourceToChild: CanvasEdge = {
            source: sourceNode.id,
            target: child.id,
            // Customize edge properties here (color, etc.)
          }
          drawEdge(ctx, sourceNode, child, edgeFromSourceToChild)
        })
      }

      // Update xPos for the next pair of nodes
      xPos += 120 // Adjust this value based on your desired spacing

      // Increment the node count in the current row
      nodesInCurrentRow++

      // Check if the current row is full, and if so, move to the next row
      if (nodesInCurrentRow >= maxNodesPerRow) {
        nodesInCurrentRow = 0
        xPos = 10 // Reset xPos
        yPos += 120 // Move to the next row vertically (adjust as needed)
      }

      // Draw the source node
      drawNode(ctx, sourceNode)
    }
  })
}
