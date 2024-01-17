import { Edge, Node } from "../types"

export const generateDemoGraphData = () => {
  const nodes: Node[] = Array.from({ length: 30 }, (_, index) => ({
    id: `node-${index}`,
    label: `Node ${index}`,
    x: Math.random() * 800, // Randomize or set positions
    y: Math.random() * 600,
    radius: 1,
    fillColor: "white",
    strokeColor: "black",
    textColor: "black",
  }))

  const edges: Edge[] = Array.from({ length: 30 }, (_, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${(index + 1) % 10}`, // Connect to next node (circular)
    color: "black",
  }))

  return { nodes, edges }
}
