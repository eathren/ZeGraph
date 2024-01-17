export function zoom(
  currentScale: number,
  currentOffset: { x: number; y: number },
  mouseX: number,
  mouseY: number,
  delta: number
) {
  const newScale = currentScale * delta
  const offsetX = currentOffset.x - mouseX * (1 - delta)
  const offsetY = currentOffset.y - mouseY * (1 - delta)

  return {
    scale: newScale,
    offset: { x: offsetX, y: offsetY },
  }
}
