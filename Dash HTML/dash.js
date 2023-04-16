/*
 * author: Colton Tshudy
 * version: 04/07/2023
 */

const date = new Date()

const LedSketch = (p) => {
  p.preload = () => {
    shader = p.loadShader('shader.vert', 'led-progress.frag');
  }

  p.setup = () => {
    let canvas = p.createCanvas(400, 400, p.WEBGL);
    canvas.parent('led-sketch');
    t = 0
  };

  p.draw = () => {
    p.shader(shader)
    shader.setUniform("u_time", t)
    shader.setUniform("u_resolution", [p.width * p.pixelDensity(), p.width * p.pixelDensity()])
    p.rect(0, 0, p.width, p.height)
    t+=0.05
  };
};

const LedReadout = (p) => {
  p.preload = () => {
    shader = p.loadShader('shader.vert', 'led-readout.frag');
  }

  p.setup = () => {
    let canvas = p.createCanvas(400, 400, p.WEBGL);
    canvas.parent('led-readout');
    t = 0
  };

  p.draw = () => {
    p.shader(shader)
    shader.setUniform("u_value", 0.5)
    shader.setUniform("u_resolution", [p.width * p.pixelDensity(), p.width * p.pixelDensity()])
    p.rect(0, 0, p.width, p.height)
  };
};

const ClockSketch = (p) => {
  p.preload = () => {
    shader = p.loadShader('shader.vert', 'clock.frag');
  }

  p.setup = () => {
    let canvas = p.createCanvas(200, 200, p.WEBGL);
    canvas.parent('clock-sketch');
    t = 0
  };

  p.draw = () => {
    p.shader(shader)
    shader.setUniform("u_mils", date.getMilliseconds())
    shader.setUniform("u_secs", date.getSeconds())
    shader.setUniform("u_mins", date.getMinutes())
    shader.setUniform("u_hors", date.getHours())
    shader.setUniform("u_resolution", [p.width * p.pixelDensity(), p.width * p.pixelDensity()])
    p.rect(0, 0, p.width, p.height)
    t += 0.025
  };
};

function onload() {
  new p5(LedSketch)
  new p5(LedReadout)
}