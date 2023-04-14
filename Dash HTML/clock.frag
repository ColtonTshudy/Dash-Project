// Created by inigo quilez - iq/2013
//   https://www.youtube.com/c/InigoQuilez
//   https://iquilezles.org/

precision mediump float;

uniform float u_mils;
uniform float u_secs;
uniform float u_mins;
uniform float u_hors;
uniform vec2 u_resolution;

varying vec2 vectorCoord;

float sdLine( in vec2 p, in vec2 a, in vec2 b )
{
	vec2 pa = p-a, ba = b-a;
	float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
	return length( pa - ba*h );
}

vec3 line( in vec3 buf, in vec2 a, in vec2 b, in vec2 p, in vec2 w, in vec4 col )
{
   float f = sdLine( p, a, b );
   float g = fwidth(f)*w.y;
   return mix( buf, col.xyz, col.w*(1.0-smoothstep(w.x-g, w.x+g, f)) );
}

vec3 hash3( float n ) { return fract(sin(vec3(n,n+1.0,n+2.0))*43758.5453123); }

void main()
{
    // get time
    float mils = u_mils
	float secs = u_secs
	float mins = u_mins
	float hors = u_hors
    
    // enable this for subsecond resolution
    //secs += mils;

	vec2 uv = (2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.y,u_resolution.x);

	float r = length( uv );
	float a = atan( uv.y, uv.x )+3.1415926;
    
	// background color
	vec3 nightColor = vec3( 0.2, 0.2, 0.2 ) + 0.1*uv.y;
	vec3 dayColor   = vec3( 0.5, 0.6, 0.7 ) + 0.2*uv.y;
	vec3 col = mix( nightColor, dayColor, smoothstep( 5.0, 7.0, hors ) - 
				                          smoothstep(19.0,21.0, hors ) );

    // inner watch body	
	col = mix( col, vec3(0.9-0.4*pow(r,4.0)), 1.0-smoothstep(0.94,0.95,r) );

    // 5 minute marks	
	float f = abs(2.0*fract(0.5+a*60.0/6.2831)-1.0);
	float g = 1.0-smoothstep( 0.0, 0.1, abs(2.0*fract(0.5+a*12.0/6.2831)-1.0) );
	float w = fwidth(f);
	f = 1.0 - smoothstep( 0.1*g+0.05-w, 0.1*g+0.05+w, f );
	f *= smoothstep( 0.85, 0.86, r+0.05*g ) - smoothstep( 0.94, 0.95, r );
	col = mix( col, vec3(0.0), f );

	// seconds hand
	vec2 dir;
    float secondsVal = 6.2831*secs/60.0;
	dir = vec2( sin(secondsVal), cos(secondsVal) );
    col = line( col, vec2(0.0), dir*0.9, uv+0.05, vec2(0.005,4.0), vec4(0.0,0.0,0.0,0.2) );
    col = line( col, vec2(0.0), dir*0.0, uv+0.05, vec2(0.055,4.0), vec4(0.0,0.0,0.0,0.2) ); 
    col = line( col, vec2(0.0), dir*0.9, uv,      vec2(0.005,1.0), vec4(0.5,0.0,0.0,1.0) );

	// minutes hand
    float minutesVal = 6.2831 * mins/60.0 + secondsVal/60.0;
	dir = vec2( sin(minutesVal), cos(minutesVal) );
    col = line( col, vec2(0.0), dir*0.7, uv+0.05, vec2(0.015,4.0), vec4(0.0,0.0,0.0,0.2) );
    col = line( col, vec2(0.0), dir*0.7, uv,      vec2(0.015,1.0), vec4(0.0,0.0,0.0,1.0) );

    // hours hand
    float hoursVal = 6.2831 * hors/12.0 + minutesVal/12.0;
	dir = vec2( sin(hoursVal), cos(hoursVal) );
    col = line( col, vec2(0.0), dir*0.4, uv+0.05, vec2(0.015,4.0), vec4(0.0,0.0,0.0,0.2) );
    col = line( col, vec2(0.0), dir*0.4, uv,      vec2(0.015,1.0), vec4(0.0,0.0,0.0,1.0) );

    // center mini circle	
	col = mix( col, vec3(0.5), 1.0-smoothstep(0.050,0.055,r) );
	col = mix( col, vec3(0.0), 1.0-smoothstep(0.005,0.01,abs(r-0.055)) );

    // border of watch
	col = mix( col, vec3(0.0), 1.0-smoothstep(0.01,0.02,abs(r-0.95)) );

    // dithering    
    col += (1.0/255.0)*hash3(uv.x+13.0*uv.y);

	gl_FragColor = vec4( col,1.0 );
}