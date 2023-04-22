precision mediump float;

uniform float u_value;
uniform vec2 u_resolution;
uniform float u_max_value;
varying vec2 vectorCoord;

const float PI = 3.1415926535897932384626433832795;
const float TAU = PI * 2.;
const float _275DegRad = TAU * 0.75;
const float rad = 0.95;
const float inner = rad * 0.75;
const float outer = inner + 0.1;

void main()
{
    float w = min(u_resolution.x,u_resolution.y);
	vec2 uv = (2.0*gl_FragCoord.xy-u_resolution.xy)/w;
    vec2 delta = -uv;
    float len = length(delta);
    float mask = (1.0-smoothstep(0.0, rad, len))*w;
    float del = (1. - (len/(rad*2.0))) * 1.75;
    float bmi = step(len, inner);
    float bma = step(len, outer);
    vec2 nrm = normalize(delta);
    float ang = TAU-mod(atan(nrm.y, nrm.x)+PI + _275DegRad, TAU);
    float s = ang/TAU;
    float q = u_value/u_max_value;
    float v = step(s, q);
    float u = (1.-bmi) * bma;
    float l = step(mod(s,0.05),0.0025);
    float p = (1.0-l) * u * v;
    gl_FragColor = mask * (vec4(del, del, del, 1) * (1.-p) + (p * vec4(v, 0., s, 1.)));
}