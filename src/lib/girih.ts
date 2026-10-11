// Islamic star patterns built with Hankin's "polygons in contact" method,
// the same construction behind Timurid tilework in Samarkand and Bukhara:
// take a tiling of regular polygons, cast two rays from the midpoint of every edge
// at a fixed angle, and keep the segments up to where neighbouring rays meet.

type Pt = [number, number];
type Poly = Pt[];

const rad = (d: number) => (d * Math.PI) / 180;

function regular(cx: number, cy: number, n: number, circumR: number, startDeg: number): Poly {
  return Array.from({ length: n }, (_, k) => {
    const a = rad(startDeg + (360 / n) * k);
    return [cx + circumR * Math.cos(a), cy + circumR * Math.sin(a)] as Pt;
  });
}

// Square octagons + small squares: gives the 8-point star and cross (the classic "khatam").
function tiling488(a: number, span: number): Poly[] {
  const L = a * (1 + Math.SQRT2);
  const R8 = a / (2 * Math.sin(rad(22.5)));
  const out: Poly[] = [];
  const n = Math.ceil(span / L) + 1;
  for (let i = -n; i <= n; i++)
    for (let j = -n; j <= n; j++) {
      out.push(regular(i * L, j * L, 8, R8, 22.5));
      out.push(regular((i + 0.5) * L, (j + 0.5) * L, 4, a / Math.SQRT2, 0));
    }
  return out;
}

// Dodecagons + triangles: gives 12-point star rosettes, as on Shah-i-Zinda.
function tiling31212(a: number, span: number): Poly[] {
  const r12 = a / (2 * Math.tan(rad(15)));
  const R12 = a / (2 * Math.sin(rad(15)));
  const D = 2 * r12;
  const h = (D * Math.sqrt(3)) / 2;
  const Rt = a / Math.sqrt(3);
  const out: Poly[] = [];
  const n = Math.ceil(span / D) + 2;
  for (let j = -n; j <= n; j++)
    for (let i = -n; i <= n; i++) {
      const x = i * D + (j * D) / 2;
      const y = j * h;
      out.push(regular(x, y, 12, R12, 15));
      out.push(regular(x + D / 2, y + h / 3, 3, Rt, 30)); // upward triangle
      out.push(regular(x + D, y + (2 * h) / 3, 3, Rt, 90)); // downward triangle
    }
  return out;
}

// Hexagons: gives the 6-point star and hexagon pattern.
function tiling666(a: number, span: number): Poly[] {
  const D = a * Math.sqrt(3);
  const h = (D * Math.sqrt(3)) / 2;
  const out: Poly[] = [];
  const n = Math.ceil(span / D) + 2;
  for (let j = -n; j <= n; j++)
    for (let i = -n; i <= n; i++) out.push(regular(i * D + (j * D) / 2, j * h, 6, a, 30));
  return out;
}

function hankin(polys: Poly[], thetaDeg: number, span: number): string {
  const t = rad(thetaDeg);
  const segs: string[] = [];
  const f = (n: number) => n.toFixed(2);
  for (const p of polys) {
    // skip polygons far outside the window
    const cx = p.reduce((s, v) => s + v[0], 0) / p.length;
    const cy = p.reduce((s, v) => s + v[1], 0) / p.length;
    if (Math.hypot(cx, cy) > span * 1.5) continue;
    const n = p.length;
    // make sure vertices run counter-clockwise (in screen coords, y down)
    let area = 0;
    for (let i = 0; i < n; i++) {
      const [x1, y1] = p[i];
      const [x2, y2] = p[(i + 1) % n];
      area += x1 * y2 - x2 * y1;
    }
    const pts = area > 0 ? p : [...p].reverse();
    const edge = (i: number) => {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + 1) % n];
      const len = Math.hypot(x2 - x1, y2 - y1);
      const d: Pt = [(x2 - x1) / len, (y2 - y1) / len];
      const nrm: Pt = [-d[1], d[0]]; // points inside for this winding
      return { m: [(x1 + x2) / 2, (y1 + y2) / 2] as Pt, d, nrm };
    };
    for (let i = 0; i < n; i++) {
      const A = edge(i);
      const B = edge((i + 1) % n);
      const fwd: Pt = [Math.cos(t) * A.d[0] + Math.sin(t) * A.nrm[0], Math.cos(t) * A.d[1] + Math.sin(t) * A.nrm[1]];
      const back: Pt = [-Math.cos(t) * B.d[0] + Math.sin(t) * B.nrm[0], -Math.cos(t) * B.d[1] + Math.sin(t) * B.nrm[1]];
      // solve A.m + s*fwd = B.m + u*back
      const det = fwd[0] * -back[1] - fwd[1] * -back[0];
      if (Math.abs(det) < 1e-9) continue;
      const dx = B.m[0] - A.m[0];
      const dy = B.m[1] - A.m[1];
      const s = (dx * -back[1] - dy * -back[0]) / det;
      const X: Pt = [A.m[0] + s * fwd[0], A.m[1] + s * fwd[1]];
      segs.push(`M${f(A.m[0])} ${f(A.m[1])}L${f(X[0])} ${f(X[1])}L${f(B.m[0])} ${f(B.m[1])}`);
    }
  }
  return segs.join("");
}

export type PatternKind = "khatam" | "khatam2" | "rosette12" | "star6";

// Returns path data centred on (0,0), covering roughly a circle of radius `span`.
export function pattern(kind: PatternKind, cell: number, span: number): string {
  switch (kind) {
    case "khatam": // eight-point star and cross
      return hankin(tiling488(cell, span), 45, span);
    case "khatam2": // interlaced eight-point stars
      return hankin(tiling488(cell, span), 67.5, span);
    case "rosette12": // twelve-point rosette
      return hankin(tiling31212(cell, span), 78, span);
    case "star6":
      return hankin(tiling666(cell, span), 70, span);
  }
}

// Outline shapes used to frame a medallion.
export function frame(shape: "circle" | "octagon" | "star8" | "diamond", r: number): string {
  const f = (n: number) => n.toFixed(2);
  const path = (pts: Poly) => "M" + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L") + "Z";
  if (shape === "circle") return `M${-r} 0a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
  if (shape === "octagon") return path(regular(0, 0, 8, r, 22.5));
  if (shape === "diamond") return path(regular(0, 0, 4, r, 0));
  // eight-point star: two overlapping squares, traced as one outline
  const inner = (r * Math.cos(rad(45))) / Math.cos(rad(22.5));
  return path(Array.from({ length: 16 }, (_, k) => {
    const a = rad(k * 22.5);
    const rr = k % 2 === 0 ? r : inner;
    return [rr * Math.cos(a), rr * Math.sin(a)] as Pt;
  }));
}
