import React from 'react';

export interface CompiledRect {
  x: number;
  y: number;
  w: number;
  color: string;
}

export interface CompileOptions {
  /** Hex color for 1px exterior silhouette outline around opaque cells */
  outlineColor?: string;
  /** Characters in the grid that should NOT trigger an outline around themselves (e.g. detached aura/spores) */
  noOutlineChars?: string;
  offsetX?: number;
  offsetY?: number;
}

/**
 * Compiles an ASCII pixel matrix into run-length encoded integer `<rect>` descriptors.
 * Call at module initialization so React render stays O(rects) with zero per-frame computation.
 */
export function compilePixelGrid(
  rows: string[],
  palette: Record<string, string>,
  options: CompileOptions = {}
): CompiledRect[] {
  const { outlineColor, noOutlineChars = '', offsetX = 0, offsetY = 0 } = options;
  const h = rows.length;
  const w = rows.reduce((max, row) => Math.max(max, row.length), 0);
  if (h === 0 || w === 0) return [];

  const skipOutline = new Set(noOutlineChars.split(''));

  // Pad by 1px on every side when outlining so perimeter pixels receive clean borders
  const pad = outlineColor ? 1 : 0;
  const gw = w + pad * 2;
  const gh = h + pad * 2;

  const grid: (string | null)[][] = Array.from({ length: gh }, () =>
    Array<string | null>(gw).fill(null)
  );
  const canOutlineFrom: boolean[][] = Array.from({ length: gh }, () =>
    Array<boolean>(gw).fill(false)
  );

  for (let y = 0; y < h; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === '.' || ch === ' ') continue;
      const color = palette[ch];
      if (!color) continue;
      grid[y + pad][x + pad] = color;
      if (!skipOutline.has(ch)) {
        canOutlineFrom[y + pad][x + pad] = true;
      }
    }
  }

  if (outlineColor) {
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        if (grid[y][x] !== null) continue;
        const touchesBody =
          (y > 0 && canOutlineFrom[y - 1][x]) ||
          (y < gh - 1 && canOutlineFrom[y + 1][x]) ||
          (x > 0 && canOutlineFrom[y][x - 1]) ||
          (x < gw - 1 && canOutlineFrom[y][x + 1]);
        if (touchesBody) {
          grid[y][x] = outlineColor;
        }
      }
    }
  }

  const rects: CompiledRect[] = [];
  for (let y = 0; y < gh; y++) {
    let x = 0;
    while (x < gw) {
      const color = grid[y][x];
      if (!color) {
        x++;
        continue;
      }
      let run = 1;
      while (x + run < gw && grid[y][x + run] === color) {
        run++;
      }
      rects.push({
        x: x - pad + offsetX,
        y: y - pad + offsetY,
        w: run,
        color,
      });
      x += run;
    }
  }

  return rects;
}

interface PixelLayerProps {
  rects: CompiledRect[];
}

export const PixelLayer: React.FC<PixelLayerProps> = ({ rects }) => (
  <>
    {rects.map((r, idx) => (
      <rect key={idx} x={r.x} y={r.y} width={r.w} height={1} fill={r.color} />
    ))}
  </>
);

/**
 * Integer 2D pixel-art sculpting buffer that compiles directly to run-length encoded `<rect>` strips
 * with automatic 1px exterior dark ink outline (`#0d0a18`). Used at module init for high-detail
 * 48x48 and 64x64 enemy/boss sprites with zero runtime overhead.
 */
export class PixelGrid {
  readonly width: number;
  readonly height: number;
  private readonly grid: (string | null)[][];
  private readonly canOutlineFrom: boolean[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => Array<string | null>(width).fill(null));
    this.canOutlineFrom = Array.from({ length: height }, () => Array<boolean>(width).fill(false));
  }

  set(x: number, y: number, color: string, outlineable = true): void {
    const ix = Math.round(x);
    const iy = Math.round(y);
    if (ix < 0 || ix >= this.width || iy < 0 || iy >= this.height) return;
    this.grid[iy][ix] = color;
    this.canOutlineFrom[iy][ix] = outlineable;
  }

  get(x: number, y: number): string | null {
    const ix = Math.round(x);
    const iy = Math.round(y);
    if (ix < 0 || ix >= this.width || iy < 0 || iy >= this.height) return null;
    return this.grid[iy][ix];
  }

  rect(x: number, y: number, w: number, h: number, color: string, outlineable = true): void {
    const x0 = Math.round(x);
    const y0 = Math.round(y);
    const x1 = Math.round(x + w);
    const y1 = Math.round(y + h);
    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        this.set(px, py, color, outlineable);
      }
    }
  }

  oval(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    mid: string,
    light?: string,
    shadow?: string,
    outlineable = true
  ): void {
    if (rx <= 0 || ry <= 0) return;
    const minX = Math.floor(cx - rx);
    const maxX = Math.ceil(cx + rx);
    const minY = Math.floor(cy - ry);
    const maxY = Math.ceil(cy + ry);
    for (let py = minY; py <= maxY; py++) {
      for (let px = minX; px <= maxX; px++) {
        const nx = (px - cx) / rx;
        const ny = (py - cy) / ry;
        const d = nx * nx + ny * ny;
        if (d <= 1.0) {
          let col = mid;
          if (light && nx + ny < -0.55) {
            col = light;
          } else if (shadow && nx + ny > 0.55) {
            col = shadow;
          }
          this.set(px, py, col, outlineable);
        }
      }
    }
  }

  line(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string,
    thickness = 1,
    outlineable = true
  ): void {
    let ix0 = Math.round(x0);
    let iy0 = Math.round(y0);
    const ix1 = Math.round(x1);
    const iy1 = Math.round(y1);
    const dx = Math.abs(ix1 - ix0);
    const dy = Math.abs(iy1 - iy0);
    const sx = ix0 < ix1 ? 1 : -1;
    const sy = iy0 < iy1 ? 1 : -1;
    let err = dx - dy;
    const r = Math.max(0, (thickness - 1) / 2);

    while (true) {
      if (thickness <= 1) {
        this.set(ix0, iy0, color, outlineable);
      } else {
        this.oval(ix0, iy0, r + 0.35, r + 0.35, color, undefined, undefined, outlineable);
      }
      if (ix0 === ix1 && iy0 === iy1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        ix0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        iy0 += sy;
      }
    }
  }

  poly(points: readonly [number, number][], color: string, outlineable = true): void {
    if (points.length < 3) return;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const [, y] of points) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const yStart = Math.max(0, Math.floor(minY));
    const yEnd = Math.min(this.height - 1, Math.ceil(maxY));

    for (let y = yStart; y <= yEnd; y++) {
      const scanY = y + 0.5;
      const xs: number[] = [];
      for (let i = 0; i < points.length; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[(i + 1) % points.length];
        if ((y1 <= scanY && y2 > scanY) || (y2 <= scanY && y1 > scanY)) {
          const x = x1 + ((scanY - y1) * (x2 - x1)) / (y2 - y1);
          xs.push(x);
        }
      }
      xs.sort((a, b) => a - b);
      for (let i = 0; i + 1 < xs.length; i += 2) {
        const startX = Math.max(0, Math.ceil(xs[i] - 0.5));
        const endX = Math.min(this.width - 1, Math.floor(xs[i + 1] - 0.5));
        for (let x = startX; x <= endX; x++) {
          this.set(x, y, color, outlineable);
        }
      }
    }
  }

  /** Draw a 2x2 or 3x2 pixel eye (glow + dark pupil + white glint) */
  eye(x: number, y: number, iris: string, glint = '#ffffff', ink = '#0d0a18', wide = false): void {
    this.set(x - 1, y, ink);
    this.set(x, y - 1, ink);
    this.set(x + 1, y - 1, ink);
    this.set(x, y, iris);
    this.set(x + 1, y, glint);
    if (wide) {
      this.set(x + 2, y, iris);
      this.set(x + 2, y - 1, ink);
      this.set(x + 3, y, ink);
    } else {
      this.set(x + 2, y, ink);
    }
  }

  compile(outlineColor?: string): CompiledRect[] {
    const out: (string | null)[][] = this.grid.map((row) => row.slice());
    if (outlineColor) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          if (out[y][x] !== null) continue;
          const touchesBody =
            (y > 0 && this.canOutlineFrom[y - 1][x]) ||
            (y < this.height - 1 && this.canOutlineFrom[y + 1][x]) ||
            (x > 0 && this.canOutlineFrom[y][x - 1]) ||
            (x < this.width - 1 && this.canOutlineFrom[y][x + 1]);
          if (touchesBody) {
            out[y][x] = outlineColor;
          }
        }
      }
    }

    const rects: CompiledRect[] = [];
    for (let y = 0; y < this.height; y++) {
      let x = 0;
      while (x < this.width) {
        const color = out[y][x];
        if (!color) {
          x++;
          continue;
        }
        let run = 1;
        while (x + run < this.width && out[y][x + run] === color) {
          run++;
        }
        rects.push({ x, y, w: run, color });
        x += run;
      }
    }
    return rects;
  }
}
