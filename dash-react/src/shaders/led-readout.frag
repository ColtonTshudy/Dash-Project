//Following the meme / hype train started by mrange https://www.shadertoy.com/view/DlsXzn
//mercurysexy

precision mediump float;

uniform float u_time;
uniform float u_value;
uniform vec2 u_resolution;
varying vec2 vectorCoord;

// Returns the index of an LED, with 0 being center
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
    // SETTINGS (defaults commented)
    float scale = 1.4; //1.0
    float zoom = 5.; //5.0
    float numLeds = 9.0; //9.0 Odd numbers only
    float spacing = 0.7; //0.7
    float size = .25; //0.25
    float glow = 4.0; // 0.0

    vec2 uv = scale*(gl_FragCoord.xy -.5* u_resolution.xy)/u_resolution.y;
    vec3 p=vec3(0);
    vec3 d=vec3(uv,1.);
    vec3 col=vec3(0.); //returned color and background color
    vec3 inactive = vec3(1.); //off color
    vec3 act = vec3(.45,.55,1.); //on color
    float st = mod(u_value*10.,numLeds+1.); //keeps time within scope of number of leds
    float e=0.;
    float g=glow;
    for(float i=1.;i<9.;i++){
            p = d*g;
            // p.x for horizontal: change to p.y for vertical
            float idx  = pModInterval1(p.y,spacing,0.-floor(numLeds/2.),0.+floor(numLeds/2.));
            p.z -= zoom;
            float isAct = pow(smoothstep(idx+5.,idx+6.,st+.2*length(p)*dot(cos(p*70.+st),sin(p.yzx*20.-st))),2.5);
            
            float h=length(p)-size-isAct*.01;
            g+=e=max(.005,h);
            vec3 c = mix(inactive, act, isAct-p.x);
            col+=c*(.1+isAct)/exp(2.*i*i*e)/3.;

            if (idx < -1.){
                act = vec3(1.,.5,.5);
            }
            else if (idx > 1.){
                act = vec3(.1,1.,.5);
            }
            else {
                act = vec3(.45,.55,1.);
            }
    }
    gl_FragColor = vec4(col,1.);
}