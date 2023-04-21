/*
 * author: Colton Tshudy
 * version: 04/07/2023
 */

const date = new Date()

const LedSketch = (p) => {
  p.preload = () => {
    ledShader = p.loadShader('shader.vert', 'led-progress.frag');
  }

  p.setup = () => {
    let canvas = p.createCanvas(100, 800, p.WEBGL);
    canvas.parent('led-sketch');
    t = 0
  };

  p.draw = () => {
    p.shader(ledShader)
    ledShader.setUniform("u_time", t)
    ledShader.setUniform("u_resolution", [p.width * p.pixelDensity(), p.height * p.pixelDensity()])
    p.rect(0, 0, p.width, p.height)
    t+=0.05
  };
};

const LedReadout = (p) => {
  p.preload = () => {
    roShader = p.loadShader('shader.vert', 'led-readout.frag');
  }

  p.setup = () => {
    let canvas = p.createCanvas(400, 400, p.WEBGL);
    canvas.parent('led-readout');
  };

  p.draw = () => {
    p.shader(roShader)
    roShader.setUniform("u_value", 0.55)
    roShader.setUniform("u_resolution", [p.width * p.pixelDensity(), p.height * p.pixelDensity()])
    p.rect(0, 0, p.width, p.height)
  };
};

const ClockSketch = (p) => {
  p.preload = () => {
    clShader = p.loadShader('shader.vert', 'clock.frag');
  }

  p.setup = () => {
    let canvas = p.createCanvas(200, 200, p.WEBGL);
    canvas.parent('clock-sketch');
  };

  p.draw = () => {
    p.shader(clShader)
    clShader.setUniform("u_mils", date.getMilliseconds())
    clShader.setUniform("u_secs", date.getSeconds())
    clShader.setUniform("u_mins", date.getMinutes())
    clShader.setUniform("u_hors", date.getHours())
    clShader.setUniform("u_resolution", [p.width * p.pixelDensity(), p.height * p.pixelDensity()])
    p.rect(0, 0, p.width, p.height)
  };
};

function onload() {
  new p5(LedSketch)
  new p5(LedReadout)
  //new p5(ClockSketch)
}