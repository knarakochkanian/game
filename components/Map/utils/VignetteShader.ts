/**
 * @author KAPITAN! / http://kapitan.fi
 *
 * Vignette shader.
 * Based on Matt DesLaurie's ShaderLessons and alteredq's sepia shader
 */

import { Vector2 } from "three";

export const VignetteShader = {

  uniforms: {
    "tDiffuse": { type: "t", value: null },

    "resolution": { type: "v2", value: new Vector2() },
    "gain": { type: "f", value: 0.9 },

    "horizontal": { type: "bool", value: false },
    "radius": { type: "f", value: 0.75 },
    "softness": { type: "f", value: 0.3 },
  },

  vertexShader: [

    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform vec2 resolution;",
    "uniform float gain;",
    "uniform float radius;",
    "uniform float softness;",
    "uniform bool horizontal;",

    "varying vec2 vUv;",

    "float rand(vec2 co){",
    "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
    "}",

    "void main() {",
    "vec4 color = texture2D( tDiffuse, vUv );",
    "vec3 c = color.rgb;",
    "float noise = rand(gl_FragCoord.xy) * .05;",

    // determine center
    "vec2 position;",
    "if (horizontal) {",
    "position = (vec2(0, gl_FragCoord.y) / resolution.xy) - vec2(0.5);",
    //"float len = 1.0 - length(position);",
    "} else {",
    "position = (gl_FragCoord.xy / resolution.xy) - vec2(0.5);",
    "}",

    "float len = length(position) * gain;",

    "float x = gl_FragCoord.x / resolution.x;",
    "gl_FragColor = vec4 ( c * vec3 (smoothstep(radius, radius - softness, len)), 0.3);",
    "}"

  ].join("\n")

};
