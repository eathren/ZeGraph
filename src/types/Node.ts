export interface Node {
  id: string
  label?: string
  x: number
  y: number
  radius?: number
  width?: number
  height?: number
  color?: string
  className?: string
  fillColor?: string
  strokeColor?: string
  textColor?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent) => void
  onDoubleClick?: (e: React.MouseEvent) => void
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
}
