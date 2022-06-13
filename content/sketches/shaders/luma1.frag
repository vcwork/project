precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
vec3 luma(vec3 texel) {
    float max = texel.r;
    float min = texel.r;
    if(texel.g > max){
        max = texel.g;
    }else if(texel.g < min){
        min = texel.g;
    }
    
    if(texel.b > max){
        max = texel.b;
    }else if(texel.b < min){
        min = texel.b;
    }
    float r = (max+min)*0.5;
    return vec3(r,r,r);
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}