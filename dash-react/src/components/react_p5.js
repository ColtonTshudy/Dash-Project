import React from "react";
import Sketch from "react-p5";

// NON-WEBGL

let x = 50;
let y = 50;
let c = 0;
const ReactP5Comp = (props) => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const canvas = p5.createCanvas(100, 100)
    canvas.parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(100);
    p5.ellipse(x, y, 70, 70);
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    c++;
    x = (c%240)-70
  };

  return <Sketch setup={setup} draw={draw} className={props.className}/>;
};

export default ReactP5Comp