import { useEffect, useRef, useState, type CSSProperties } from "react";

const VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D u_mask;
uniform sampler2D u_photo;
uniform vec2 u_center;
uniform float u_radius;
uniform vec2 u_maskScale;
uniform vec2 u_maskOffset;
uniform vec2 u_photoScale;
uniform vec2 u_photoOffset;
varying vec2 v_uv;

void main() {
  vec4 maskColor = texture2D(u_mask, v_uv * u_maskScale + u_maskOffset);
  vec4 photoColor = texture2D(u_photo, v_uv * u_photoScale + u_photoOffset);

  float d = length(gl_FragCoord.xy - u_center);
  float alpha;
  if (u_radius < 1.0) {
    alpha = 1.0;
  } else {
    float r1 = u_radius * 0.45;
    float r2 = u_radius * 0.72;
    if (d < r1) {
      alpha = 0.0;
    } else if (d < r2) {
      alpha = mix(0.0, 0.5, (d - r1) / (r2 - r1));
    } else if (d < u_radius) {
      alpha = mix(0.5, 1.0, (d - r2) / (u_radius - r2));
    } else {
      alpha = 1.0;
    }
  }

  gl_FragColor = mix(photoColor, maskColor, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function coverUV(canvasAspect: number, imgAspect: number, focalX: number, focalY: number) {
  let visX: number, visY: number;
  if (canvasAspect > imgAspect) {
    visX = 1;
    visY = imgAspect / canvasAspect;
  } else {
    visX = canvasAspect / imgAspect;
    visY = 1;
  }
  const offsetX = (1 - visX) * focalX;
  const offsetY = (1 - visY) * (1 - focalY);
  return { scale: [visX, visY] as const, offset: [offsetX, offsetY] as const };
}

interface HeroRevealProps {
  maskSrc: string;
  photoSrc: string;
  className?: string;
  style?: CSSProperties;
  /** ponto focal compartilhado (0..1, mesma semântica do object-position % do CSS) */
  focalX?: number;
  focalY?: number;
}

export default function HeroReveal({
  maskSrc,
  photoSrc,
  className = "",
  style,
  focalX = 0.8,
  focalY = 0.5,
}: HeroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false, premultipliedAlpha: false });
    if (!gl) {
      setWebglOk(false);
      return;
    }

    // o StrictMode do React (em dev) monta este efeito duas vezes no mesmo <canvas>.
    // getContext() retorna o *mesmo* contexto WebGL nas duas vezes, então sem essa
    // trava, os callbacks pendentes (image.onload / rAF) de uma montagem antiga podem
    // disparar depois que sua própria limpeza já apagou as texturas, corrompendo
    // a textura que a montagem viva está usando — o sintoma é a máscara/foto
    // trocando aleatoriamente ao carregar. Todo callback assíncrono abaixo checa
    // `cancelled` antes de tocar no GL; a limpeza marca essa flag como true para
    // que a montagem antiga pare de mexer no contexto compartilhado.
    let cancelled = false;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("WebGL program link error:", gl.getProgramInfoLog(program));
      setWebglOk(false);
      return;
    }
    gl.useProgram(program);

    // um triângulo gigante cobrindo todo o clip space — mais barato que um quad, sem costura
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uMask = gl.getUniformLocation(program, "u_mask");
    const uPhoto = gl.getUniformLocation(program, "u_photo");
    const uCenter = gl.getUniformLocation(program, "u_center");
    const uRadius = gl.getUniformLocation(program, "u_radius");
    const uMaskScale = gl.getUniformLocation(program, "u_maskScale");
    const uMaskOffset = gl.getUniformLocation(program, "u_maskOffset");
    const uPhotoScale = gl.getUniformLocation(program, "u_photoScale");
    const uPhotoOffset = gl.getUniformLocation(program, "u_photoOffset");

    function createTexture() {
      const tex = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, 1, 1, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      return tex;
    }

    const maskTex = createTexture();
    const photoTex = createTexture();
    let maskAspect = 1;
    let photoAspect = 1;
    let maskReady = false;
    let photoReady = false;

    function loadTexture(src: string, tex: WebGLTexture, onReady: (aspect: number) => void) {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, true);
        gl!.bindTexture(gl!.TEXTURE_2D, tex);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, img);
        onReady(img.naturalWidth / img.naturalHeight);
      };
      img.src = src;
    }
    loadTexture(maskSrc, maskTex, (a) => { maskAspect = a; maskReady = true; });
    loadTexture(photoSrc, photoTex, (a) => { photoAspect = a; photoReady = true; });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 1, ch = 1;

    function resize() {
      if (cancelled) return;
      const rect = container!.getBoundingClientRect();
      cw = Math.max(1, Math.round(rect.width * dpr));
      ch = Math.max(1, Math.round(rect.height * dpr));
      canvas!.width = cw;
      canvas!.height = ch;
      gl!.viewport(0, 0, cw, ch);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let tx = 0.5, ty = 0.5, x = 0.5, y = 0.5, tr = 0, r = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = container!.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width;
      ty = (e.clientY - rect.top) / rect.height;
    };
    const onEnter = () => { tr = 1; };
    const onLeave = () => { tr = 0; };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    // dispositivos touch não têm hover — toque e segure faz o reveal
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = container!.getBoundingClientRect();
      tx = (t.clientX - rect.left) / rect.width;
      ty = (t.clientY - rect.top) / rect.height;
      tr = 1;
    };
    const onTouchEnd = () => { tr = 0; };
    container.addEventListener("touchstart", onTouch, { passive: true });
    container.addEventListener("touchmove", onTouch, { passive: true });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("touchcancel", onTouchEnd);

    function tick() {
      if (cancelled) return;
      raf = requestAnimationFrame(tick);
      if (!maskReady || !photoReady) return;

      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      r += (tr - r) * 0.07;

      const radiusPx = Math.max(0, r) * Math.max(cw, ch) * 0.42;
      const centerXpx = x * cw;
      const centerYpx = ch - y * ch; // origem do DOM é canto superior esquerdo, a do WebGL é inferior esquerdo

      const canvasAspect = cw / ch;
      const m = coverUV(canvasAspect, maskAspect, focalX, focalY);
      const p = coverUV(canvasAspect, photoAspect, focalX, focalY);

      gl!.useProgram(program);
      gl!.uniform2f(uCenter, centerXpx, centerYpx);
      gl!.uniform1f(uRadius, radiusPx);
      gl!.uniform2f(uMaskScale, m.scale[0], m.scale[1]);
      gl!.uniform2f(uMaskOffset, m.offset[0], m.offset[1]);
      gl!.uniform2f(uPhotoScale, p.scale[0], p.scale[1]);
      gl!.uniform2f(uPhotoOffset, p.offset[0], p.offset[1]);

      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, maskTex);
      gl!.uniform1i(uMask, 0);

      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, photoTex);
      gl!.uniform1i(uPhoto, 1);

      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }
    tick();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("touchstart", onTouch);
      container.removeEventListener("touchmove", onTouch);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteTexture(maskTex);
      gl.deleteTexture(photoTex);
    };
  }, [maskSrc, photoSrc, focalX, focalY]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={style}>
      {webglOk ? (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      ) : (
        <img
          src={maskSrc}
          alt="Iury Lima"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: `${focalX * 100}% ${focalY * 100}%` }}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      )}
    </div>
  );
}
