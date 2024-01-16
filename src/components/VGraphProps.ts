export interface VGraphProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  /**
   * Optional ID for the canvas.
   */

  id?: string
  /**
   * Optional width of the canvas, can be a percentage or pixel value.
   */
  width?: string

  /**
   * Optional height of the canvas, can be a percentage or pixel value.
   */
  height?: string

  /**
   * Optional background color for the canvas.
   */
  bgColor?: string

  /**
   *
   * Optional nodes to render on the canvas.
   *
   */
  nodes?: Node[]

  /**
   * Optional callback for when the canvas is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void

  /**
   * Optional callback for when the canvas is double clicked.
   */
  onDoubleClick?: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void

  /**
   * Optional callback for when the canvas is right clicked.
   */
  onContextMenu?: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void

  /**
   * Optional callback for when the mouse enters the canvas.
   */
  onMouseEnter?: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void

  /**
   * Optional callback for when the mouse leaves the canvas.
   */
  onMouseLeave?: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void

  /**
   * Optional callback for when the mouse moves over the canvas.
   */
  onMouseMove?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void

  /**
   * Optional callback for when the mouse button is pressed over the canvas.
   */
  onMouseDown?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void

  /**
   * Optional callback for when the mouse button is released over the canvas.
   */
  onMouseUp?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void

  /**
   * Optional callback for when the mouse wheel is scrolled over the canvas.
   */
  onWheel?: (event: React.WheelEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is touched.
   */
  onTouchStart?: (event: React.TouchEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the touch is moved over the canvas.
   */
  onTouchMove?: (event: React.TouchEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the touch is released over the canvas.
   */
  onTouchEnd?: (event: React.TouchEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the touch is cancelled over the canvas.
   */
  onTouchCancel?: (event: React.TouchEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is focused.
   */
  onFocus?: (event: React.FocusEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is blurred.
   */
  onBlur?: (event: React.FocusEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when a key is pressed over the canvas.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when a key is released over the canvas.
   */
  onKeyUp?: (event: React.KeyboardEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when a key is pressed and held over the canvas.
   */
  onKeyPress?: (event: React.KeyboardEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is copied.
   */
  onCopy?: (event: React.ClipboardEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is cut.
   */
  onCut?: (event: React.ClipboardEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is pasted.
   */
  onPaste?: (event: React.ClipboardEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is scrolled.
   */
  onScroll?: (event: React.UIEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is loaded.
   */
  onLoad?: (event: React.SyntheticEvent<HTMLCanvasElement, Event>) => void

  /**
   * Optional callback for when the canvas is unloaded.
   */
  onUnload?: (event: React.SyntheticEvent<HTMLCanvasElement, Event>) => void

  /**
   * Optional callback for when the canvas is resized.
   */
  onResize?: (event: React.UIEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is reset.
   */
  onReset?: (event: React.FormEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is submitted.
   */
  onSubmit?: (event: React.FormEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is invalid.
   */
  onInvalid?: (event: React.FormEvent<HTMLCanvasElement>) => void

  /**
   * Optional callback for when the canvas is loaded.
   */
  onLoadedData?: (event: React.SyntheticEvent<HTMLCanvasElement, Event>) => void
}
