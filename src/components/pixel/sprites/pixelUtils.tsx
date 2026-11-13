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
