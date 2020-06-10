#define PI 3.14159265

precision mediump float;
uniform float time;
uniform vec2 imageSize;

const vec3 mainColor = vec3(106./255., 24./255., 67./255.);
const float pix = 4.0;

float sawtooth(float a, float freq) {
    if (mod(a, freq) < freq * 0.5) return mod(a, freq * 0.5);
    return freq * 0.5 - mod(a, freq * 0.5);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/imageSize.xy;
    float resolutionRatio = imageSize.x / imageSize.y;
    
    // uv fuckery !
    
    // pixel at ion
        
    float plx = imageSize.x * pix / 500.0;
    float ply = imageSize.y * pix / 275.0;
    
    float dx = plx * (1.0 / imageSize.x);
    float dy = ply * (1.0 / imageSize.y);
    
    uv.x = dx * floor(uv.x / dx);
    uv.y = dy * floor(uv.y / dy);
    
    // interlacing .
    float pixAmt = 2.;
    if (mod(fragCoord.y, pixAmt) < pixAmt * 0.5) {
        uv += 0.1 + sin(time * 0.2 + uv.y * 8.) * 0.05;
    } else {
        uv -= 0.1 + sin(time * 0.2 + uv.y * 8. + .5) * 0.05;
    }
    
    vec2 uv2 = uv;
    
    vec3 color = vec3(0.1);
    
    // first one (bg-ish thing??)
    
    color = vec3(mod(abs(sawtooth(uv.x, 0.6) * resolutionRatio + sawtooth(uv.y, 0.6) + time * 0.3), 0.4)) * mainColor;
    
    // second one (stripes-like thing)
    
    if (uv2.x < 0.5) {
        uv2.x = 1.0 - uv2.x;
    }
    if (uv2.y > 0.5) {
        uv2.y = 1.0 - uv2.y;
    }

    uv2.x += sin(uv2.y * 4.0 + time) * 0.1;
    
    if (mod(abs(uv2.x * resolutionRatio + uv2.y + time * 0.2), 0.2) < 0.1) {
        vec3 lines = vec3(cos(uv.x * 2.0 + time + uv.y * 3.0)) * mainColor * 0.7;
        color = mix(color, lines, 0.3);
    }
    
    // color shortening
    float shortAmt = 15.0;
    color = ceil(color * shortAmt) / shortAmt;
    
    // weird gradient-ish bright idk
    uv = fragCoord/imageSize.xy;
    float brightness = uv.y;
    if (uv.y > 0.5) brightness = 1.0 - uv.y;
    
    color *= brightness + .8;
    
    // feed the frag color .
    fragColor = vec4(color, 1.0);
}

void main() {
	mainImage(gl_FragColor.rgba, gl_FragCoord.xy);
}
