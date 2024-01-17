# VGraph

## Overview

`VGraph` is a versatile React component designed for rendering interactive graphs using HTML5 Canvas. It features dynamic visualization of nodes and edges, and comes with built-in support for zooming, panning, and layouts, making it ideal for applications requiring graphical representations of networks systems with the immediate rendering system for performant graphs.

## Features

- Customizable dimensions and background color.
- Built-in zoom and pan functionality.
- Efficient rendering of nodes and edges on a canvas.

## Installation

To use `VGraph` in your project, include the `VGraph.tsx` file in your components directory.

Usage
Import VGraph into your React component and include it as demonstrated in the example below:

```jsx
Copy code
import React from 'react';
import { VGraph } from './components/VGraph';

const App = () => {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <VGraph />
    </div>
  );
};

export default App;

```

## Props

VGraph accepts the following props:

Contributing
Contributions are welcome. Please feel free to submit pull requests or open issues for bugs and feature requests.

License
Apache 2.0
