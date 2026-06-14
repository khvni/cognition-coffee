/**
 * WebGL2 CRT post-processor. Each frame, a caller paints the terminal onto a 2D
 * canvas; this uploads it as a texture and renders it onto a curved, glowing CRT
 * "screen": barrel distortion, phosphor bloom, chromatic aberration, scanlines +
 * slow roll, vignette, and flicker. Purely a presentation layer — the DOM
 * terminal underneath stays the source of truth for input + accessibility.
 * Returns null when WebGL2 is unavailable so callers can fall back to the DOM.
 */

const VERT = `#version 300 es
in vec2 p;
out vec2 v_uv;
void main() {
  v_uv = (p + 1.0) * 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_tex;
uniform float u_time;
uniform vec2 u_res;
in vec2 v_uv;
out vec4 o;

vec2 barrel(vec2 uv) {
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + 0.10 * r2 + 0.045 * r2 * r2;
  return c * 0.5 + 0.5;
}

float vignette(vec2 uv) {
  vec2 c = uv * 2.0 - 1.0;
  return clamp(1.0 - dot(c, c) * 0.5, 0.0, 1.0);
}

vec3 aberrate(vec2 uv) {
  vec2 dir = uv - 0.5;
  float a = 0.0018;
  float r = texture(u_tex, uv + dir * a).r;
  float g = texture(u_tex, uv).g;
  float b = texture(u_tex, uv - dir * a).b;
  return vec3(r, g, b);
}

vec3 bloom(vec2 uv) {
  vec3 sum = vec3(0.0);
  float wsum = 0.0;
  for (int i = -3; i <= 3; i++) {
    for (int j = -3; j <= 3; j++) {
      vec2 off = vec2(float(i), float(j)) / u_res * 2.4;
      float w = 1.0 / (1.0 + float(i * i + j * j));
      sum += texture(u_tex, uv + off).rgb * w;
      wsum += w;
    }
  }
  return sum / wsum;
}

void main() {
  vec2 uv = barrel(v_uv);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    o = vec4(0.015, 0.02, 0.035, 1.0);
    return;
  }
  vec3 col = aberrate(uv);
  col += bloom(uv) * 0.5;
  col *= 0.82 + 0.18 * sin(uv.y * u_res.y * 1.5);
  col *= 0.95 + 0.05 * sin(uv.y * 9.0 - u_time * 2.5);
  col *= vignette(v_uv);
  col *= 0.97 + 0.03 * sin(u_time * 55.0);
  o = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, src: string, type: number) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("CRT shader compile failed:", gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

export interface CrtHandle {
  stop(): void;
}

type Painter = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

export function startCrt(glCanvas: HTMLCanvasElement, paint: Painter): CrtHandle | null {
  let gl: WebGL2RenderingContext | null = null;
  try {
    gl = glCanvas.getContext("webgl2", { alpha: false, antialias: false, premultipliedAlpha: false });
  } catch {
    gl = null;
  }
  if (!gl) return null;

  const vs = compile(gl, VERT, gl.VERTEX_SHADER);
  const fs = compile(gl, FRAG, gl.FRAGMENT_SHADER);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.useProgram(prog);
  const uTime = gl.getUniformLocation(prog, "u_time");
  const uRes = gl.getUniformLocation(prog, "u_res");

  const src = document.createElement("canvas");
  const ctx = src.getContext("2d")!;
  let cssW = 0;
  let cssH = 0;
  let dpr = 1;

  const size = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = glCanvas.clientWidth;
    cssH = glCanvas.clientHeight;
    const w = Math.max(1, Math.round(cssW * dpr));
    const h = Math.max(1, Math.round(cssH * dpr));
    glCanvas.width = w;
    glCanvas.height = h;
    src.width = w;
    src.height = h;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gl!.viewport(0, 0, w, h);
  };
  size();

  const ro = new ResizeObserver(size);
  ro.observe(glCanvas);

  let raf = 0;
  const t0 = performance.now();
  const frame = () => {
    paint(ctx, cssW, cssH);
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, true);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, src);
    gl!.uniform1f(uTime, (performance.now() - t0) / 1000);
    gl!.uniform2f(uRes, src.width, src.height);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    stop() {
      cancelAnimationFrame(raf);
      ro.disconnect();
    },
  };
}
