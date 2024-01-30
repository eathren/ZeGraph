# ZeGraph

## Overview

This code is still in active development pending layouts.

`ZeGraph` is a versatile React component designed for rendering interactive graphs using HTML5 Canvas. It features dynamic visualization of nodes and edges, and comes with built-in support for zooming, panning, and layouts, making it ideal for applications requiring graphical representations of networks systems with the immediate rendering system for performant graphs.

## Features

- Customizable dimensions and background color.
- Built-in zoom and pan functionality.
- Efficient rendering of nodes and edges on a canvas.

## Installation

To use `ZeGraph` in your project, include the `ZeGraph.tsx` file in your components directory.

Usage
Import ZeGraph into your React component and include it as demonstrated in the example below:

```jsx
Copy code
import React from 'react';
import { ZeGraph } from './components/ZeGraph';

const App = () => {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <ZeGraph />
    </div>
  );
};

export default App;

```

## Props

Contributing
Contributions are welcome. Please feel free to submit pull requests or open issues for bugs and feature requests.

License
GNU 3.0
