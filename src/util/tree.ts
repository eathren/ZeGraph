import { CanvasEdge } from "../types/CanvasEdge"
import { CanvasNode } from "../types/CanvasNode"

export const buildTree = (
  nodes: CanvasNode[],
  edges: CanvasEdge[]
): CanvasNode[] => {
  const nodeMap: Map<string, CanvasNode> = new Map()
  const treeNodes: CanvasNode[] = []

  // Step 1: Create a CanvasNode Map
  nodes.forEach((node) => {
    nodeMap.set(node.id, node)
  })

  // Step 2: Identify Root Nodes
  const rootNodes: CanvasNode[] = []
  nodes.forEach((node) => {
    if (!edges.some((edge) => edge.target === node.id)) {
      rootNodes.push({ node, children: [] })
    }
  })

  // Step 3: Initialize the Tree
  treeNodes.push(...rootNodes)

  // Step 4: Build the Tree (Depth-First)
  const buildTreeRecursive = (parentNode: CanvasNode) => {
    const children: CanvasNode[] = []
    edges.forEach((edge) => {
      if (edge.source === parentNode.node.id) {
        const targetNode = nodeMap.get(edge.target)
        if (targetNode) {
          const childNode: CanvasNode = { node: targetNode, children: [] }
          children.push(childNode)
          buildTreeRecursive(childNode)
        }
      }
    })
    parentNode.children = children
  }

  rootNodes.forEach((rootNode) => {
    buildTreeRecursive(rootNode)
  })

  return treeNodes
}
