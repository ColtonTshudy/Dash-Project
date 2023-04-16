//Following the meme / hype train started by mrange https://www.shadertoy.com/view/DlsXzn
//mercurysexy

// LED readout of 10 LEDs set by a float value from 0 to 1

precision highp float;

uniform float u_value;
uniform vec2 u_resolution;
varying vec2 vectorCoord;


float pModInterval1(inout float p, float size, float start, float stop) {
    float halfsize = size*0.5;
    float c = floor((p + halfsize)/size);
    p = mod(p+halfsize, size) - halfsize;
    if (c > stop) { //yes, this might not be the best thing numerically.
        p += size*(c - stop);
        c = stop;
    }
    if (c <start) {
        p += size*(c - start);
        c = start;
    }
    return c;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy -.5* u_resolution.xy)/u_resolution.y;
    
    vec3 p=vec3(0);
    vec3 d=vec3(uv,1.);
    vec3 col=vec3(0.); //returned color and background color
    vec3 inactive = vec3(1.); //off color
    vec3 act = vec3(.45,.55,1.); //on color
    float st = mod(u_value/10.,15.); //second number determines number of LEDs
    float e=0.;
    float g=0.;
    for(float i=1.;i<10.;i++){
            p = d*g;
            float idx  = pModInterval1(p.x,.7,-5.,4.);
            p.z -= 5.;
            float isAct = pow(smoothstep(idx+5.,idx+6.,st+.2*length(p)*dot(cos(p*70.+st),sin(p.yzx*20.-st))),2.5);
            
            float h=length(p)-.25-isAct*.01;
            g+=e=max(.005,h);
            vec3 c = mix(inactive, act, isAct-p.x);
            col+=c*(.1+isAct)/exp(2.*i*i*e)/3.;
    }
    gl_FragColor = vec4(col,1.);
}