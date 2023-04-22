import React, { Component, createRef } from "react";
import p5 from 'p5'
import vert from '../shaders/shader.vert'
import frag from '../shaders/circle-progress2.frag'

// WEBGL

class Dial extends Component {
    /**
      * Default props
      */
    static defaultProps = {
        className: "",
        value: 0,
        max: 0,
    };

    /**
      * @param props: className, fragShader
      */
    constructor(props) {
        super(props);
        this.myRef = createRef()  //createRef() provides a way to integrate third-party DOM elements into our React app.// Check https://reactjs.org/docs/refs-and-the-dom.html for more detail.
        this.extraClass = ''
    }

    // Defining the sketch
    Sketch = (p) => {
        p.preload = () => {
            this.shader = p.loadShader(vert, frag, null, 'es3');
        }
        p.setup = () => {
            this.canvas = p.createCanvas(400, 400, p.WEBGL)
        }
        p.draw = () => {
            let value = this.props.value

            p.shader(this.shader)
            this.shader.setUniform("u_value", value)
            this.shader.setUniform("u_max_value", this.props.max)
            this.shader.setUniform("u_resolution", [p.width * p.pixelDensity(), p.height * p.pixelDensity()])
            p.rect(0, 0, p.width, p.height)
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
            <div ref={this.myRef} className={`${this.props.className} ${this.extraClass}`}></div>
        );
    }
}


export default Dial