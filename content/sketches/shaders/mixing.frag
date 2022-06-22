precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;
uniform vec3 background;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
vec3 luma(vec3 texel) {
  float v1 = mix(texcoords2.r, background[0], 0.2);
  float v2 = mix(texcoords2.g, background[1], 0.6);
  float v3 = mix(texcoords2.r, background[2], 0.3);
  return vec3(v1,v2,v3);
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((luma(texel.rgb)), 1.0) : texel;
}