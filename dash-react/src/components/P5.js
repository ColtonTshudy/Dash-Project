import React, { Component, createRef } from "react";
import p5 from 'p5'

// WEBGL

class P5Comp extends Component {
    /**
      * Default props
      */
    static defaultProps = {
        className: "",
        fragShader: undefined,
    };

    /**
      * @param props: className, fragShader
      */
    constructor(props) {
        super(props);
        this.myRef = createRef()  //createRef() provides a way to integrate third-party DOM elements into our React app.// Check https://reactjs.org/docs/refs-and-the-dom.html for more detail.
        this.state = { className: this.props.className, fragShader: this.props.fragShader }
    }

    // We define our sketch here
    // Our sketch is a function object that gets a reference to the P5 object
    // With this we can call all the function inside our sketch
    // We call this function object when initializing new p5 object.
    Sketch = (p) => {
        p.preload = () => {
            if (!(this.state.fragShader === ""))
                this.shader = p.loadShader('/shaders/shader.vert', this.state.fragShader);
        }
        p.setup = () => {
            this.canvas = p.createCanvas(100, 100, p.WEBGL)
        }
        p.draw = () => {
            if (!(this.state.fragShader === "")) {
                this.shader.setUniform("u_time",p.frameCount)
            }
            p.background(p.frameCount % 255)
        }
    }

    componentDidMount() {
        // After rendering the component class we have access to the element reference inside the DOM tree.
        // Looking at the constructor we can see the p5 object gets sketch and HTMLElement
        new p5(this.Sketch, this.myRef.current)
    }

    render() {
        // The render method is being called first and then the componentDidmount will be called.
        return (
            <div ref={this.myRef} className={this.state.className}></div>
        );
    }
}


export default P5Comp