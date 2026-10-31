#!/usr/bin/env python3
"""Generate the original SVG plates and personalised constellation sigils
for the Langlands Universe site.

Everything is deterministic: no network, no photography, no external assets.
"""
from __future__ import annotations

import math
import random
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
PORTRAITS = ASSETS / "portraits"
PORTRAITS.mkdir(parents=True, exist_ok=True)

INK = "#050811"
INK2 = "#081120"
GOLD = "#d9b779"
GOLD_DIM = "#8d7448"
CYAN = "#78e4dc"
VIOLET = "#a595ff"
ROSE = "#f28fbe"
PAPER = "#e8e0cf"
MUTED = "#8d96a9"

SERIF = "'Noto Serif SC','Songti SC','STSong','SimSun',Georgia,serif"
SANS = "'Noto Sans SC','PingFang SC','Microsoft YaHei','Segoe UI',sans-serif"
MATH = "'Cambria Math','STIX Two Math','Times New Roman',serif"


def esc(s: str) -> str:
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def svg_open(w: int, h: int, title: str, desc: str) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-labelledby="title desc">
<title id="title">{esc(title)}</title>
<desc id="desc">{esc(desc)}</desc>
'''


def defs(w: int, h: int, accent: str = CYAN) -> str:
    return f'''<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#050811"/>
    <stop offset=".52" stop-color="#07101d"/>
    <stop offset="1" stop-color="#0a0a18"/>
  </linearGradient>
  <radialGradient id="halo" cx="50%" cy="46%" r="58%">
    <stop offset="0" stop-color="{accent}" stop-opacity=".16"/>
    <stop offset=".45" stop-color="{accent}" stop-opacity=".05"/>
    <stop offset="1" stop-color="{accent}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="goldglow" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="{GOLD}" stop-opacity=".9"/>
    <stop offset=".18" stop-color="{GOLD}" stop-opacity=".38"/>
    <stop offset="1" stop-color="{GOLD}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="goldline" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="{GOLD}" stop-opacity="0"/>
    <stop offset=".5" stop-color="{GOLD}" stop-opacity=".9"/>
    <stop offset="1" stop-color="{GOLD}" stop-opacity="0"/>
  </linearGradient>
  <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="5" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="tinyglow" x="-80%" y="-80%" width="260%" height="260%">
    <feGaussianBlur stdDeviation="2" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <pattern id="microgrid" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M24 0H0V24" fill="none" stroke="#b9c7dd" stroke-opacity=".055" stroke-width=".6"/>
  </pattern>
  <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="7" stroke="{ROSE}" stroke-opacity=".18" stroke-width="1"/>
  </pattern>
  <clipPath id="frame"><rect x="0" y="0" width="{w}" height="{h}"/></clipPath>
</defs>'''


def frame(w: int, h: int) -> str:
    return f'''<rect width="{w}" height="{h}" fill="url(#bg)"/>
<rect width="{w}" height="{h}" fill="url(#halo)"/>
<rect width="{w}" height="{h}" fill="url(#microgrid)" clip-path="url(#frame)"/>'''


def starfield(w: int, h: int, n: int, seed: int, avoid_center=False) -> str:
    rng = random.Random(seed)
    out = []
    for _ in range(n):
        x, y = rng.uniform(0, w), rng.uniform(0, h)
        if avoid_center and 0.15 * w < x < 0.85 * w and 0.12 * h < y < 0.9 * h:
            continue
        r = rng.choice([0.5, 0.5, 0.7, 0.9, 1.2])
        op = rng.uniform(0.12, 0.55)
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{PAPER}" opacity="{op:.2f}"/>')
        if rng.random() < 0.035:
            out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r*4:.1f}" fill="{GOLD}" opacity=".10"/>')
    return "\n".join(out)


def corner_marks(w: int, h: int, pad: int = 28) -> str:
    c = GOLD_DIM
    return f'''<g fill="none" stroke="{c}" stroke-width="1" opacity=".8">
<path d="M{pad} {pad+26}V{pad}H{pad+26}"/><path d="M{w-pad-26} {pad}H{w-pad}V{pad+26}"/>
<path d="M{pad} {h-pad-26}V{h-pad}H{pad+26}"/><path d="M{w-pad-26} {h-pad}H{w-pad}V{h-pad-26}"/>
</g>'''


def label(x: float, y: float, text: str, size=12, fill=MUTED, tracking=2.4, family=SANS, weight=400, anchor="start") -> str:
    return (f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" fill="{fill}" '
            f'letter-spacing="{tracking}" font-weight="{weight}" text-anchor="{anchor}">{esc(text)}</text>')


def cn(x: float, y: float, text: str, size=24, fill=PAPER, weight=400, anchor="start", opacity=1) -> str:
    return (f'<text x="{x}" y="{y}" font-family="{SERIF}" font-size="{size}" fill="{fill}" '
            f'font-weight="{weight}" text-anchor="{anchor}" opacity="{opacity}">{esc(text)}</text>')


def poly_projection(vertices, edges, cx, cy, scale, rot=0.0, tilt=0.32):
    pts = []
    for (x, y, z) in vertices:
        xr = x * math.cos(rot) - z * math.sin(rot)
        zr = x * math.sin(rot) + z * math.cos(rot)
        yr = y * math.cos(tilt) - zr * math.sin(tilt)
        zz = y * math.sin(tilt) + zr * math.cos(tilt)
        pts.append((cx + xr * scale, cy - yr * scale, zz))
    return pts


def dodeca_vertices():
    phi = (1 + 5 ** 0.5) / 2
    verts = []
    for a in (-1, 1):
        for b in (-1, 1):
            for c in (-1, 1):
                verts.append((a, b, c))
                verts.append((0, a / phi, b * phi))
                verts.append((a / phi, b * phi, 0))
                verts.append((a * phi, 0, b / phi))
    # unique
    seen, out = set(), []
    for v in verts:
        k = tuple(round(t, 5) for t in v)
        if k not in seen:
            seen.add(k)
            out.append(v)
    return out


def dodeca_edges(verts, tol=1e-4):
    # dodecahedron: vertices at distance 2/phi are adjacent
    target = 2 / ((1 + 5 ** 0.5) / 2)
    edges = []
    for i, a in enumerate(verts):
        for j in range(i + 1, len(verts)):
            b = verts[j]
            d = math.dist(a, b)
            if abs(d - target) < 1e-3:
                edges.append((i, j))
    return edges


# ---------------------------------------------------------------------------
# PLATE 01 — Rosetta stone
# ---------------------------------------------------------------------------
def plate_rosetta():
    w, h = 1200, 700
    out = [svg_open(w, h, "数学的罗塞塔石碑", "算术、表示与几何三种语言之间的翻译图景"), defs(w, h, CYAN), frame(w, h), starfield(w, h, 130, 11)]
    out.append(corner_marks(w, h))
    out.append(label(56, 54, "PLATE 01  /  THREE LANGUAGES", 11, GOLD, 3.2))
    out.append(cn(56, 94, "同一座山，三条登山路", 28))
    out.append(label(56, 118, "THE ROSETTA STONE OF MATHEMATICS", 10, MUTED, 2.2))

    panels = [
        (56, "01", "算术 · 伽罗瓦", "ARITHMETIC", GOLD, "Gal( K̄ / K )"),
        (434, "02", "表示 · 自守", "REPRESENTATION", CYAN, "π ⊂ L²( G(Q)\\G(A) )"),
        (812, "03", "几何 · 层", "GEOMETRY", VIOLET, "D-mod( Bun_G )"),
    ]
    for x, num, zh, en, color, glyph in panels:
        out.append(f'''<g>
<rect x="{x}" y="166" width="332" height="404" fill="#070d18" fill-opacity=".78" stroke="{color}" stroke-opacity=".34"/>
<path d="M{x} 166H{x+64}M{x} 166V222M{x+332} 570H{x+268}M{x+332} 570V514" fill="none" stroke="{color}" stroke-opacity=".8"/>
<text x="{x+24}" y="200" font-family="{SANS}" font-size="11" fill="{color}" letter-spacing="3">{num} / {en}</text>
<text x="{x+24}" y="237" font-family="{SERIF}" font-size="22" fill="{PAPER}">{esc(zh)}</text>
</g>''')
        if num == "01":
            cx, cy = x + 166, 378
            # Galois orbit: central field with branching lines
            out.append(f'<circle cx="{cx}" cy="{cy}" r="64" fill="none" stroke="{GOLD}" stroke-opacity=".55"/>')
            out.append(f'<circle cx="{cx}" cy="{cy}" r="3.5" fill="{GOLD}" filter="url(#tinyglow)"/>')
            for k in range(6):
                a = -math.pi / 2 + k * math.pi / 3
                px, py = cx + 92 * math.cos(a), cy + 92 * math.sin(a)
                out.append(f'<path d="M{cx} {cy}L{px:.1f} {py:.1f}" stroke="{GOLD}" stroke-opacity=".28"/>')
                out.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="4.2" fill="{GOLD}" opacity=".8"/>')
            out.append(f'<text x="{cx}" y="{cy+5}" text-anchor="middle" font-family="{MATH}" font-size="20" fill="{PAPER}">K</text>')
            out.append(label(x + 24, 500, "GALOIS ORBITS", 9, GOLD_DIM, 2))
            out.append(cn(x + 24, 524, "对称性写成置换", 15, PAPER, 400, opacity=.82))
        elif num == "02":
            cx, cy = x + 166, 360
            for k in range(7):
                yy = cy - 72 + k * 24
                wid = 150 - abs(k - 3) * 8
                out.append(f'<path d="M{cx-wid/2:.1f} {yy}H{cx+wid/2:.1f}" stroke="{CYAN}" stroke-opacity="{.65 - abs(k-3)*.07:.2f}" stroke-width="{2.4 if k==3 else 1}"/>')
                out.append(f'<circle cx="{cx-wid/2:.1f}" cy="{yy}" r="2.2" fill="{CYAN}" opacity=".7"/>')
            out.append(f'<path d="M{cx-100} {cy+82}Q{cx-40} {cy+52} {cx+10} {cy+84}T{cx+112} {cy+72}" fill="none" stroke="{CYAN}" stroke-opacity=".35"/>')
            out.append(label(x + 24, 500, "SPECTRAL DECOMPOSITION", 9, "#5b9f9b", 2))
            out.append(cn(x + 24, 524, "频谱中的每个音", 15, PAPER, 400, opacity=.82))
        else:
            cx, cy = x + 166, 370
            out.append(f'<path d="M{cx-92} {cy+28}C{cx-44} {cy-86}, {cx+60} {cy+92}, {cx+96} {cy-30}" fill="none" stroke="{VIOLET}" stroke-opacity=".65" stroke-width="1.4"/>')
            for k in range(9):
                t = k / 8
                px = cx - 92 + 188 * t
                py = cy + 28 + math.sin(t * math.pi * 2 + .4) * 58
                out.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="{3.3 if k%3 else 5}" fill="{VIOLET}" opacity=".8"/>')
            out.append(f'<path d="M{cx-60} {cy-100}V{cy+112}M{cx+60} {cy-100}V{cy+112}" stroke="{VIOLET}" stroke-opacity=".22" stroke-dasharray="3 6"/>')
            out.append(label(x + 24, 500, "SHEAVES OVER A CURVE", 9, "#7b70ad", 2))
            out.append(cn(x + 24, 524, "曲线的每个点都有故事", 15, PAPER, 400, opacity=.82))
        out.append(f'<text x="{x+24}" y="458" font-family="{MATH}" font-size="17" fill="{color}" opacity=".9">{esc(glyph)}</text>')

    # connecting triangle
    out.append(f'''<g fill="none" stroke="{GOLD}" stroke-opacity=".5">
<path d="M388 342L434 342" stroke-dasharray="2 5"/>
<path d="M766 342L812 342" stroke-dasharray="2 5"/>
<path d="M600 570V610M600 610H234M600 610H966" stroke-dasharray="2 6" stroke-opacity=".3"/>
</g>''')
    for px, py in [(411, 342), (789, 342)]:
        out.append(f'<circle cx="{px}" cy="{py}" r="9" fill="url(#goldglow)"/><circle cx="{px}" cy="{py}" r="2.6" fill="{GOLD}"/>')
    out.append(f'<text x="600" y="640" text-anchor="middle" font-family="{SERIF}" font-size="14" fill="{GOLD}" letter-spacing="3">L-FUNCTIONS  ·  THE COMMON LANGUAGE</text>')
    out.append(f'<text x="56" y="668" font-family="{SANS}" font-size="9" fill="{MUTED}" letter-spacing="1.8">SCHEMATIC / 三种语言并非严格同构，而是由猜想网络连接的视角</text>')
    out.append("</svg>")
    (ASSETS / "fig-rosetta.svg").write_text("\n".join(out), encoding="utf-8")


# ---------------------------------------------------------------------------
# PLATE 02 — Duality
# ---------------------------------------------------------------------------
def plate_duality():
    w, h = 1200, 720
    out = [svg_open(w, h, "朗兰兹对偶", "群 G 与其对偶群 L G 之间的对偶图景"), defs(w, h, VIOLET), frame(w, h), starfield(w, h, 150, 22)]
    out.append(corner_marks(w, h))
    out.append(label(56, 54, "PLATE 02  /  DUALITY", 11, GOLD, 3.2))
    out.append(cn(56, 94, "两面镜子之间", 28))
    out.append(label(56, 118, "THE LANGLANDS DUAL GROUP", 10, MUTED, 2.2))
    out.append(f'<text x="600" y="184" text-anchor="middle" font-family="{MATH}" font-size="24" fill="{GOLD}">ᴸG = G<tspan font-size="15" dy="-9">∨</tspan><tspan dy="9"> ⋊ Γ</tspan><tspan font-size="16" dy="8">K</tspan></text>')
    # Left group: GL_n as concentric circles
    lx, ly = 306, 412
    out.append(f'<circle cx="{lx}" cy="{ly}" r="164" fill="url(#halo)" opacity=".55"/>')
    for r, op in [(150, .25), (120, .3), (88, .38), (54, .5)]:
        out.append(f'<circle cx="{lx}" cy="{ly}" r="{r}" fill="none" stroke="{GOLD}" stroke-opacity="{op}"/>')
    for k in range(16):
        a = k * math.pi / 8
        x1, y1 = lx + 54 * math.cos(a), ly + 54 * math.sin(a)
        x2, y2 = lx + 150 * math.cos(a), ly + 150 * math.sin(a)
        out.append(f'<path d="M{x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}" stroke="{GOLD}" stroke-opacity=".17"/>')
        out.append(f'<circle cx="{x2:.1f}" cy="{y2:.1f}" r="3" fill="{GOLD}" opacity=".55"/>')
    out.append(f'<text x="{lx}" y="{ly+10}" text-anchor="middle" font-family="{MATH}" font-size="48" fill="{PAPER}">G</text>')
    out.append(cn(lx, 616, "群 G / 自守侧", 17, PAPER, 400, "middle"))
    out.append(label(lx, 640, "AUTOMORPHIC", 9, MUTED, 2.2, anchor="middle"))

    # Right group: dodecahedron (dual side)
    rx, ry = 894, 412
    verts = dodeca_vertices()
    edges = dodeca_edges(verts)
    pts = poly_projection(verts, edges, rx, ry - 8, 66, rot=0.45)
    for i, j in edges:
        x1, y1, z1 = pts[i]
        x2, y2, z2 = pts[j]
        op = .22 + max(0, (z1 + z2) / 2) * .25
        out.append(f'<path d="M{x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}" stroke="{VIOLET}" stroke-opacity="{op:.2f}" stroke-width="{1 + max(0,(z1+z2)/2)*.7:.2f}"/>')
    for x, y, z in pts:
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{2.4 + max(0,z)*1.4:.1f}" fill="{VIOLET}" opacity=".85"/>')
    out.append(f'<text x="{rx}" y="{ry+18}" text-anchor="middle" font-family="{MATH}" font-size="40" fill="{PAPER}" opacity=".95">G<tspan font-size="17" dy="-16">∨</tspan></text>')
    out.append(cn(rx, 616, "对偶群 G∨ / 伽罗瓦侧", 17, PAPER, 400, "middle"))
    out.append(label(rx, 640, "GALOIS", 9, MUTED, 2.2, anchor="middle"))

    # bridge
    out.append(f'<path d="M492 412C560 330 640 330 708 412" fill="none" stroke="url(#goldline)" stroke-width="1.2"/>')
    out.append(f'<path d="M492 412C560 494 640 494 708 412" fill="none" stroke="url(#goldline)" stroke-width="1.2" opacity=".55"/>')
    out.append(f'<circle cx="600" cy="412" r="5" fill="{GOLD}" filter="url(#tinyglow)"/>')
    out.append(f'<circle cx="600" cy="412" r="26" fill="none" stroke="{GOLD}" stroke-opacity=".4" stroke-dasharray="2 5"/>')
    out.append(f'<text x="600" y="458" text-anchor="middle" font-family="{SANS}" font-size="10" fill="{GOLD}" letter-spacing="2.5">SATAKE  /  UNRAMIFIED BRIDGE</text>')
    out.append(f'<text x="600" y="552" text-anchor="middle" font-family="{SERIF}" font-size="15" fill="{PAPER}" opacity=".82">Hecke 算子  ↔  Frobenius 共轭类</text>')
    out.append(f'<text x="600" y="580" text-anchor="middle" font-family="{SANS}" font-size="10" fill="{MUTED}" letter-spacing="1.4">局部参数把两侧的“指纹”对齐</text>')
    out.append(label(56, 682, "示意图：一般 G 的 L-群还含伽罗瓦作用；对偶群不总是同构于 G", 9, MUTED, 1.2))
    out.append("</svg>")
    (ASSETS / "fig-duality.svg").write_text("\n".join(out), encoding="utf-8")


# ---------------------------------------------------------------------------
# PLATE 03 — Functoriality
# ---------------------------------------------------------------------------
def plate_functoriality():
    w, h = 1200, 720
    out = [svg_open(w, h, "函子性", "从对偶群的同态到自守表示的转移"), defs(w, h, CYAN), frame(w, h), starfield(w, h, 120, 33)]
    out.append(corner_marks(w, h))
    out.append(label(56, 54, "PLATE 03  /  FUNCTORIALITY", 11, GOLD, 3.2))
    out.append(cn(56, 94, "把同态翻译成转移", 28))
    out.append(label(56, 118, "A HOMOMORPHISM BECOMES A TRANSFER", 10, MUTED, 2.2))

    boxes = [
        (120, 250, 260, 110, "Π(G)", "G 的自守表示", CYAN),
        (820, 250, 260, 110, "Π(H)", "H 的自守表示", CYAN),
        (120, 470, 260, 110, "Rep( ᴸG )", "对偶群的表示", VIOLET),
        (820, 470, 260, 110, "Rep( ᴸH )", "对偶群的表示", VIOLET),
    ]
    for x, y, bw, bh, title, sub, color in boxes:
        out.append(f'<rect x="{x}" y="{y}" width="{bw}" height="{bh}" fill="#08111e" stroke="{color}" stroke-opacity=".45"/>')
        out.append(f'<text x="{x+bw/2}" y="{y+48}" text-anchor="middle" font-family="{MATH}" font-size="26" fill="{PAPER}">{esc(title)}</text>')
        out.append(f'<text x="{x+bw/2}" y="{y+76}" text-anchor="middle" font-family="{SERIF}" font-size="13" fill="{MUTED}">{esc(sub)}</text>')

    # arrows
    out.append(f'<path d="M380 305H810" stroke="{CYAN}" stroke-opacity=".75" marker-end="url(#arrowC)"/>')
    out.append(f'<text x="595" y="290" text-anchor="middle" font-family="{SANS}" font-size="10" fill="{CYAN}" letter-spacing="2">FUNCTORIAL TRANSFER</text>')
    out.append(f'<path d="M380 525H810" stroke="{VIOLET}" stroke-opacity=".6" marker-end="url(#arrowV)"/>')
    out.append(f'<text x="595" y="510" text-anchor="middle" font-family="{SANS}" font-size="10" fill="{VIOLET}" letter-spacing="2">COMPOSITION WITH φ</text>')
    out.append(f'<path d="M250 360V462" stroke="{GOLD}" stroke-opacity=".7" marker-end="url(#arrowG)"/>')
    out.append(f'<path d="M950 360V462" stroke="{GOLD}" stroke-opacity=".7" marker-end="url(#arrowG)"/>')
    out.append(f'<path d="M300 610C450 610 750 610 900 610" fill="none" stroke="{GOLD}" stroke-opacity=".28" stroke-dasharray="3 7"/>')
    out.append(f'<text x="600" y="640" text-anchor="middle" font-family="{SERIF}" font-size="14" fill="{GOLD}">φ : ᴸG → ᴸH  ⟹  Π(G) → Π(H)</text>')
    out.append(f'<text x="600" y="668" text-anchor="middle" font-family="{SANS}" font-size="10" fill="{MUTED}" letter-spacing="1.5">L(s, π, r ∘ φ) = L(s, φ(π), r)  /  函子性预测 L-函数的相容性</text>')
    out.append(f'''<defs>
<marker id="arrowC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{CYAN}"/></marker>
<marker id="arrowV" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{VIOLET}"/></marker>
<marker id="arrowG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{GOLD}"/></marker>
</defs>''')
    out.append(f'<text x="56" y="694" font-family="{SANS}" font-size="9" fill="{MUTED}" letter-spacing="1.2">例：Sym²: GL₂ → GL₃；⊗: GLₙ × GLₘ → GLₙₘ；Spin: SO₂ₙ₊₁ → GL₂ⁿ</text>')
    out.append("</svg>")
    (ASSETS / "fig-functoriality.svg").write_text("\n".join(out), encoding="utf-8")


# ---------------------------------------------------------------------------
# PLATE 04 — L-function
# ---------------------------------------------------------------------------
def plate_lfunction():
    w, h = 1200, 720
    out = [svg_open(w, h, "L-函数与临界带", "欧拉乘积、解析延拓与临界线上的零点示意"), defs(w, h, GOLD), frame(w, h), starfield(w, h, 120, 44)]
    out.append(corner_marks(w, h))
    out.append(label(56, 54, "PLATE 04  /  L-FUNCTIONS", 11, GOLD, 3.2))
    out.append(cn(56, 94, "宇宙的指纹", 28))
    out.append(label(56, 118, "EULER PRODUCT  ·  ANALYTIC CONTINUATION  ·  ZEROS", 10, MUTED, 2.2))

    # axes
    ox, oy = 150, 590
    out.append(f'<path d="M{ox} {oy}H690M{ox} {oy}V180" stroke="{PAPER}" stroke-opacity=".35"/>')
    out.append(f'<text x="700" y="{oy+4}" font-family="{MATH}" font-size="16" fill="{MUTED}">Re(s)</text>')
    out.append(f'<text x="{ox-10}" y="170" font-family="{MATH}" font-size="16" fill="{MUTED}" text-anchor="end">Im(s)</text>')
    # critical strip
    out.append(f'<rect x="420" y="190" width="150" height="400" fill="{GOLD}" fill-opacity=".045" stroke="{GOLD}" stroke-opacity=".22"/>')
    out.append(f'<path d="M495 190V590" stroke="{GOLD}" stroke-opacity=".7" stroke-dasharray="4 4"/>')
    out.append(f'<text x="495" y="620" text-anchor="middle" font-family="{MATH}" font-size="13" fill="{GOLD}">Re(s) = 1/2</text>')
    out.append(f'<text x="420" y="176" font-family="{SANS}" font-size="9" fill="{MUTED}" letter-spacing="1.5">CRITICAL STRIP</text>')
    # zero dots
    rng = random.Random(7)
    for k in range(18):
        yy = 560 - k * 21 + rng.uniform(-1.8, 1.8)
        xx = 495 + rng.uniform(-.72, .72) * (1.8 if k == 0 else 1)
        out.append(f'<circle cx="{xx:.1f}" cy="{yy:.1f}" r="3" fill="{GOLD}" opacity=".95"/>')
        out.append(f'<circle cx="{xx:.1f}" cy="{yy:.1f}" r="9" fill="none" stroke="{GOLD}" stroke-opacity=".18"/>')
    # real-axis tick labels
    for val, xx in [("-2", 210), ("0", 300), ("1", 570)]:
        out.append(f'<text x="{xx}" y="{oy+22}" text-anchor="middle" font-family="{MATH}" font-size="12" fill="{MUTED}">{val}</text>')
    out.append(f'<path d="M{ox} 190H690" stroke="{PAPER}" stroke-opacity=".08"/>')

    # right column: formula cards
    rx = 760
    out.append(f'<rect x="{rx}" y="190" width="380" height="92" fill="#08111e" stroke="{GOLD}" stroke-opacity=".3"/>')
    out.append(label(rx+22, 215, "EULER PRODUCT", 9, GOLD, 2))
    out.append(f'<text x="{rx+22}" y="248" font-family="{MATH}" font-size="17" fill="{PAPER}">L(s,π) = ∏<tspan font-size="11" dy="4">p</tspan><tspan dy="-4"> (1 − α</tspan><tspan font-size="11" dy="4">p</tspan><tspan dy="-4"> p</tspan><tspan font-size="11" dy="-7">−s</tspan><tspan dy="7">)</tspan><tspan font-size="11" dy="-7">−1</tspan></text>')
    out.append(f'<rect x="{rx}" y="300" width="380" height="92" fill="#08111e" stroke="{CYAN}" stroke-opacity=".3"/>')
    out.append(label(rx+22, 325, "FUNCTIONAL EQUATION", 9, CYAN, 2))
    out.append(f'<text x="{rx+22}" y="360" font-family="{MATH}" font-size="16" fill="{PAPER}">Λ(s,π) = ω · Λ(1−s, π̃)</text>')
    out.append(f'<rect x="{rx}" y="410" width="380" height="92" fill="#08111e" stroke="{VIOLET}" stroke-opacity=".3"/>')
    out.append(label(rx+22, 435, "THE DREAM", 9, VIOLET, 2))
    out.append(f'<text x="{rx+22}" y="470" font-family="{SERIF}" font-size="17" fill="{PAPER}">所有零点都在临界线上？</text>')
    out.append(f'<text x="{rx+22}" y="492" font-family="{SANS}" font-size="9" fill="{MUTED}" letter-spacing="1">广义黎曼猜想：一个仍未攻克的统一命题</text>')
    out.append(f'<rect x="{rx}" y="524" width="380" height="76" fill="none" stroke="{MUTED}" stroke-opacity=".25" stroke-dasharray="3 5"/>')
    out.append(f'<text x="{rx+18}" y="550" font-family="{SERIF}" font-size="13" fill="{PAPER}" opacity=".8">局部因子 ← 表示论</text>')
    out.append(f'<text x="{rx+18}" y="575" font-family="{SERIF}" font-size="13" fill="{PAPER}" opacity=".8">整体函数 ← 解析延拓 + 函数方程</text>')
    out.append(label(56, 690, "零点的分布为示意；真正的 L-函数计算需要大量数值与严格误差控制。", 9, MUTED, 1.2))
    out.append("</svg>")
    (ASSETS / "fig-lfunction.svg").write_text("\n".join(out), encoding="utf-8")


# ---------------------------------------------------------------------------
# PLATE 05 — Map
# ---------------------------------------------------------------------------
def plate_map():
    w, h = 1200, 760
    out = [svg_open(w, h, "朗兰兹地图", "局部、全局、函数域与几何朗兰兹之间的海域"), defs(w, h, CYAN), frame(w, h), starfield(w, h, 160, 55)]
    out.append(corner_marks(w, h))
    out.append(label(56, 54, "PLATE 05  /  THE ARCHIPELAGO", 11, GOLD, 3.2))
    out.append(cn(56, 94, "群岛与未知海域", 28))
    out.append(label(56, 118, "LOCAL  ·  GLOBAL  ·  FUNCTION FIELD  ·  GEOMETRIC", 10, MUTED, 2.2))

    # sea contours
    rng = random.Random(9)
    for k in range(9):
        y = 190 + k * 58
        d = f"M40 {y}"
        x = 40
        while x < 1160:
            x += rng.randint(40, 100)
            d += f"Q{x-30} {y+rng.randint(-12,12)} {x} {y+rng.randint(-4,4)}"
        out.append(f'<path d="{d}" fill="none" stroke="#7b9fbf" stroke-opacity=".075"/>')

    islands = [
        (200, 310, 118, 56, "局部域", "K_v / p-adic", GOLD),
        (500, 260, 152, 76, "全局数域", "K / Q", CYAN),
        (875, 300, 178, 66, "函数域", "F_q(C)", VIOLET),
        (900, 545, 160, 58, "几何朗兰兹", "Bun_G / D-mod", ROSE),
        (500, 560, 146, 64, "Arthur 迹公式", "spectral / orbital", GOLD),
        (185, 570, 140, 58, "局部对应", "WD_K → L G", CYAN),
    ]
    for cx, cy, rx, ry, title, sub, color in islands:
        # blob polygon
        pts = []
        for k in range(18):
            a = 2 * math.pi * k / 18
            rr = 1 + .16 * math.sin(3 * a + cx) + .08 * math.cos(5 * a)
            pts.append((cx + rx * rr * math.cos(a), cy + ry * rr * math.sin(a)))
        d = "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"
        out.append(f'<path d="{d}" fill="{color}" fill-opacity=".07" stroke="{color}" stroke-opacity=".45"/>')
        out.append(f'<text x="{cx}" y="{cy-2}" text-anchor="middle" font-family="{SERIF}" font-size="20" fill="{PAPER}">{esc(title)}</text>')
        out.append(f'<text x="{cx}" y="{cy+22}" text-anchor="middle" font-family="{SANS}" font-size="9" fill="{color}" letter-spacing="1.4">{esc(sub)}</text>')

    # routes
    routes = [
        ((260, 340), (430, 280), "局部→整体"),
        ((600, 300), (800, 310), "数域 ⇢ 函数域"),
        ((880, 335), (900, 510), "几何化"),
        ((525, 525), (300, 560), "局部展开"),
        ((850, 555), (620, 560), "几何 ↔ 算术"),
    ]
    for (x1, y1), (x2, y2), txt in routes:
        out.append(f'<path d="M{x1} {y1}Q{(x1+x2)/2} {(y1+y2)/2-38} {x2} {y2}" fill="none" stroke="{GOLD}" stroke-opacity=".4" stroke-dasharray="3 7"/>')
        out.append(f'<text x="{(x1+x2)/2}" y="{(y1+y2)/2-46}" text-anchor="middle" font-family="{SANS}" font-size="9" fill="{GOLD}" opacity=".8" letter-spacing="1">{esc(txt)}</text>')
    # unknown waters
    out.append(f'<rect x="700" y="620" width="400" height="72" fill="url(#hatch)" stroke="{ROSE}" stroke-opacity=".25"/>')
    out.append(f'<text x="900" y="652" text-anchor="middle" font-family="{SERIF}" font-size="15" fill="{ROSE}">未知海域：一般约化群的整体函子性</text>')
    out.append(f'<text x="900" y="674" text-anchor="middle" font-family="{SANS}" font-size="9" fill="{MUTED}" letter-spacing="1.4">TERRA INCOGNITA</text>')
    # compass
    out.append(f'''<g transform="translate(1060 190)" stroke="{GOLD}" stroke-opacity=".55" fill="none">
<circle r="42"/><circle r="30" stroke-opacity=".25"/><path d="M0 -38V38M-38 0H38" stroke-opacity=".2"/>
<path d="M0 -32L7 -4L0 0L-7 -4Z" fill="{GOLD}" fill-opacity=".4"/><text y="-48" text-anchor="middle" font-family="{SANS}" font-size="9" fill="{GOLD}" stroke="none" letter-spacing="2">N</text>
</g>''')
    out.append(label(56, 728, "地图为概念示意：区域、距离与面积不表示数学上的包含关系。", 9, MUTED, 1.2))
    out.append("</svg>")
    (ASSETS / "fig-map.svg").write_text("\n".join(out), encoding="utf-8")


# ---------------------------------------------------------------------------
# PLATE 06 — Trace formula
# ---------------------------------------------------------------------------
def plate_trace():
    w, h = 1200, 720
    out = [svg_open(w, h, "迹公式", "谱侧与几何侧之间的等式"), defs(w, h, GOLD), frame(w, h), starfield(w, h, 110, 66)]
    out.append(corner_marks(w, h))
    out.append(label(56, 54, "PLATE 06  /  TRACE FORMULA", 11, GOLD, 3.2))
    out.append(cn(56, 94, "两种计数，一个等式", 28))
    out.append(label(56, 118, "SPECTRAL SIDE  =  GEOMETRIC SIDE", 10, MUTED, 2.2))

    # left spectral
    lx = 290
    out.append(f'<rect x="72" y="180" width="430" height="420" fill="#08111e" fill-opacity=".65" stroke="{CYAN}" stroke-opacity=".25"/>')
    out.append(label(96, 212, "SPECTRAL SIDE / 谱侧", 9, CYAN, 2))
    out.append(f'<text x="96" y="252" font-family="{MATH}" font-size="18" fill="{PAPER}">Σ<tspan font-size="11" dy="5">π</tspan><tspan dy="-5"> m(π) f̂(π)</tspan></text>')
    rng = random.Random(4)
    for k in range(13):
        y = 300 + k * 20
        wid = rng.uniform(80, 330)
        out.append(f'<path d="M128 {y}H{128+wid:.1f}" stroke="{CYAN}" stroke-opacity="{rng.uniform(.22,.75):.2f}" stroke-width="{rng.choice([1,1,2])}"/>')
        out.append(f'<circle cx="{128+wid:.1f}" cy="{y}" r="2" fill="{CYAN}" opacity=".8"/>')
    out.append(f'<text x="96" y="570" font-family="{SERIF}" font-size="13" fill="{MUTED}">自守谱：每个表示贡献一个权重</text>')

    # right geometric
    out.append(f'<rect x="698" y="180" width="430" height="420" fill="#08111e" fill-opacity=".65" stroke="{GOLD}" stroke-opacity=".25"/>')
    out.append(label(722, 212, "GEOMETRIC SIDE / 几何侧", 9, GOLD, 2))
    out.append(f'<text x="722" y="252" font-family="{MATH}" font-size="18" fill="{PAPER}">Σ<tspan font-size="11" dy="5">γ</tspan><tspan dy="-5"> vol(G</tspan><tspan font-size="11" dy="5">γ</tspan><tspan dy="-5">) ∫ f</tspan></text>')
    # orbits
    for k in range(7):
        cx = 800 + (k % 3) * 100
        cy = 320 + (k // 3) * 90
        r = 22 + (k % 3) * 5
        out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{GOLD}" stroke-opacity=".35"/>')
        out.append(f'<circle cx="{cx}" cy="{cy}" r="3.5" fill="{GOLD}" opacity=".9"/>')
        for j in range(5):
            a = j * math.pi * 2 / 5 + k
            out.append(f'<circle cx="{cx+r*math.cos(a):.1f}" cy="{cy+r*math.sin(a):.1f}" r="1.6" fill="{GOLD}" opacity=".55"/>')
        out.append(f'<text x="{cx}" y="{cy+r+16}" text-anchor="middle" font-family="{MATH}" font-size="10" fill="{MUTED}">γ{k+1}</text>')
    out.append(f'<text x="722" y="570" font-family="{SERIF}" font-size="13" fill="{MUTED}">轨道积分：每个共轭类贡献一个体积</text>')

    # equals
    out.append(f'<circle cx="600" cy="390" r="52" fill="#050811" stroke="{GOLD}" stroke-opacity=".45"/>')
    out.append(f'<text x="600" y="407" text-anchor="middle" font-family="{MATH}" font-size="46" fill="{GOLD}">=</text>')
    out.append(f'<path d="M502 390H548M652 390H698" stroke="{GOLD}" stroke-opacity=".4" stroke-dasharray="2 4"/>')

    # bottom formula
    out.append(f'<rect x="72" y="626" width="1056" height="54" fill="#08111e" stroke="{GOLD}" stroke-opacity=".28"/>')
    out.append(f'<text x="600" y="659" text-anchor="middle" font-family="{MATH}" font-size="19" fill="{PAPER}">Σ<tspan font-size="11" dy="5">π</tspan><tspan dy="-5"> m(π) f̂(π)  =  Σ</tspan><tspan font-size="11" dy="5">γ</tspan><tspan dy="-5"> vol(G</tspan><tspan font-size="11" dy="5">γ</tspan><tspan dy="-5">) ∫</tspan><tspan font-size="11" dy="5">Gγ\\G</tspan><tspan dy="-5"> f(g) dg</tspan></text>')
    out.append(label(56, 704, "简化形式；稳定化、内窥分类与基本引理是让等式“可比较”的关键技术。", 9, MUTED, 1.2))
    out.append("</svg>")
    (ASSETS / "fig-trace.svg").write_text("\n".join(out), encoding="utf-8")


# ---------------------------------------------------------------------------
# PLATE 07 — Concept web
# ---------------------------------------------------------------------------
def plate_web():
    w, h = 1200, 760
    out = [svg_open(w, h, "朗兰兹概念网", "核心概念及其连接"), defs(w, h, VIOLET), frame(w, h), starfield(w, h, 140, 77)]
    out.append(corner_marks(w, h))
    out.append(label(56, 54, "PLATE 07  /  THE WEB", 11, GOLD, 3.2))
    out.append(cn(56, 94, "没有中心的网络", 28))
    out.append(label(56, 118, "A CONSTELLATION, NOT A SINGLE THEOREM", 10, MUTED, 2.2))

    nodes = {
        "recip": (600, 330, 1.0, "互反", "RECIPROCITY", GOLD),
        "func": (850, 240, .8, "函子性", "FUNCTORIALITY", CYAN),
        "lgroup": (390, 220, .72, "L-群", "L-GROUP", VIOLET),
        "lfunc": (840, 465, .72, "L-函数", "L-FUNCTION", GOLD),
        "auto": (360, 460, .78, "自守表示", "AUTOMORPHIC", CYAN),
        "galois": (205, 330, .68, "伽罗瓦表示", "GALOIS", GOLD),
        "trace": (600, 590, .72, "迹公式", "TRACE FORMULA", CYAN),
        "endo": (760, 650, .55, "内窥", "ENDOSCOPY", VIOLET),
        "local": (190, 620, .6, "局部 Langlands", "LOCAL", ROSE),
        "geo": (980, 620, .62, "几何 Langlands", "GEOMETRIC", ROSE),
    }
    edges = [("galois", "recip"), ("recip", "auto"), ("recip", "func"), ("lgroup", "recip"), ("lgroup", "func"),
             ("func", "lfunc"), ("auto", "lfunc"), ("auto", "trace"), ("recip", "trace"), ("trace", "endo"),
             ("local", "auto"), ("local", "galois"), ("func", "geo"), ("lfunc", "geo"), ("endo", "geo"), ("lgroup", "auto")]
    for a, b in edges:
        x1, y1, *_ = nodes[a]
        x2, y2, *_ = nodes[b]
        out.append(f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{GOLD}" stroke-opacity=".16" stroke-width="1"/>')
    for key, (x, y, s, zh, en, color) in nodes.items():
        r = 58 * s
        out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{color}" fill-opacity=".06" stroke="{color}" stroke-opacity=".45"/>')
        out.append(f'<circle cx="{x}" cy="{y}" r="{r*1.45:.1f}" fill="none" stroke="{color}" stroke-opacity=".12" stroke-dasharray="2 6"/>')
        out.append(f'<text x="{x}" y="{y+4}" text-anchor="middle" font-family="{SERIF}" font-size="{17*s+7:.0f}" fill="{PAPER}">{esc(zh)}</text>')
        out.append(f'<text x="{x}" y="{y+r+18:.0f}" text-anchor="middle" font-family="{SANS}" font-size="8" fill="{color}" letter-spacing="1.6">{esc(en)}</text>')
    out.append(f'<text x="600" y="710" text-anchor="middle" font-family="{SERIF}" font-size="14" fill="{GOLD}" letter-spacing="2">每一个节点都通过猜想与其它节点相连</text>')
    out.append(label(56, 734, "概念图仅显示部分关系；箭头方向与强弱被省略。", 9, MUTED, 1.2))
    out.append("</svg>")
    (ASSETS / "fig-web.svg").write_text("\n".join(out), encoding="utf-8")


# ---------------------------------------------------------------------------
# People sigils
# ---------------------------------------------------------------------------
PEOPLE = [
    # id, initials, born, died, field, seed, hue
    ("langlands", "RL", "1936", "", "NUMBER THEORY", 1, 42),
    ("weil", "AW", "1906", "1998", "ALGEBRAIC GEOMETRY", 2, 35),
    ("harish", "HC", "1923", "1983", "REPRESENTATION THEORY", 3, 190),
    ("gelfand", "IG", "1913", "2009", "FUNCTIONAL ANALYSIS", 4, 205),
    ("selberg", "AS", "1917", "2007", "SPECTRAL THEORY", 5, 175),
    ("jacquet", "HJ", "1939", "", "AUTOMORPHIC FORMS", 6, 160),
    ("godement", "RG", "1921", "2016", "ZETA INTEGRALS", 7, 45),
    ("drinfeld", "VD", "1954", "", "FUNCTION FIELDS", 8, 265),
    ("lafforgue-l", "LL", "1966", "", "LANGLANDS FOR GL(n)", 9, 280),
    ("lafforgue-v", "VL", "1974", "", "REDUCTIVE GROUPS", 10, 290),
    ("deligne", "PD", "1944", "", "WEIL CONJECTURES", 11, 215),
    ("faltings", "GF", "1954", "", "DIOPHANTINE GEOMETRY", 12, 30),
    ("harris", "MH", "1954", "", "LOCAL LANGLANDS", 13, 170),
    ("taylor", "RT", "1962", "", "AUTOMORPHY", 14, 200),
    ("ngo", "NB", "1972", "", "FUNDAMENTAL LEMMA", 15, 50),
    ("scholze", "PS", "1987", "", "PERFECTOID SPACES", 16, 195),
    ("fargues", "LF", "1970", "", "GEOMETRIZATION", 17, 285),
    ("gaitsgory", "DG", "1973", "", "GEOMETRIC LANGLANDS", 18, 310),
    ("frenkel", "EF", "1968", "", "GEOMETRIC LANGLANDS", 19, 325),
    ("arthur", "JA", "1944", "", "TRACE FORMULA", 20, 185),
    ("serre", "JS", "1926", "", "GALOIS REPRESENTATIONS", 21, 40),
    ("grothendieck", "AG", "1928", "2014", "SCHEMES & MOTIVES", 22, 225),
]


def hsv_hex(h, s, v):
    h = h % 360 / 60.0
    i = int(h)
    f = h - i
    p = v * (1 - s)
    q = v * (1 - s * f)
    t = v * (1 - s * (1 - f))
    vals = [(v, t, p), (q, v, p), (p, v, t), (p, q, v), (t, p, v), (v, p, q)][i % 6]
    return "#%02x%02x%02x" % tuple(round(c * 255) for c in vals)


def sigil(person):
    pid, initials, born, died, field, seed, hue = person
    w, h = 420, 520
    rng = random.Random(seed * 97 + 13)
    accent = hsv_hex(hue, .52, .95)
    accent2 = hsv_hex((hue + 42) % 360, .45, .8)
    years = f"{born} — {died}" if died else f"B. {born}"
    out = [svg_open(w, h, f"{initials} 星徽", f"{initials} 的生成式数学星徽，不是写实肖像"), f'''<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050811"/><stop offset="1" stop-color="#0a0d1b"/></linearGradient>
<radialGradient id="g" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="{accent}" stop-opacity=".2"/><stop offset=".6" stop-color="{accent}" stop-opacity=".04"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></radialGradient>
<filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="{PAPER}" stroke-opacity=".045" stroke-width=".6"/></pattern>
</defs>''']
    out.append(f'<rect width="{w}" height="{h}" fill="url(#bg)"/><rect width="{w}" height="{h}" fill="url(#g)"/><rect width="{w}" height="{h}" fill="url(#grid)"/>')
    # local stars
    for _ in range(55):
        x, y = rng.uniform(0, w), rng.uniform(0, h)
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rng.choice([.5,.7,1])}" fill="{PAPER}" opacity="{rng.uniform(.1,.45):.2f}"/>')
    # corner coordinates
    out.append(label(20, 28, "SIGIL / " + pid.upper().replace("_", "-"), 7, accent, 1.4))
    out.append(label(20, h - 18, years, 8, MUTED, 1.6))
    out.append(label(w - 20, h - 18, "NON-LIKENESS", 7, MUTED, 1.2, anchor="end"))
    # medallion
    cx, cy, r = w / 2, 245, 142
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{r+22}" fill="none" stroke="{accent}" stroke-opacity=".18"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{accent}" stroke-opacity=".55"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{r-8}" fill="none" stroke="{accent}" stroke-opacity=".18" stroke-dasharray="2 8"/>')
    for k in range(72):
        a = 2 * math.pi * k / 72
        r1 = r + 8
        r2 = r + (18 if k % 6 == 0 else 13)
        out.append(f'<path d="M{cx+r1*math.cos(a):.1f} {cy+r1*math.sin(a):.1f}L{cx+r2*math.cos(a):.1f} {cy+r2*math.sin(a):.1f}" stroke="{accent}" stroke-opacity="{.5 if k%6==0 else .2}" stroke-width="{1 if k%6==0 else .6}"/>')
    # unique constellation inside
    pts = []
    for k in range(rng.randint(7, 10)):
        a = rng.uniform(0, 2 * math.pi)
        rr = rng.uniform(.22, .92) * r
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a), rng.uniform(.5, 1)))
    # connect in angular order
    pts_sorted = sorted(pts, key=lambda p: math.atan2(p[1] - cy, p[0] - cx))
    for i in range(len(pts_sorted) - 1):
        x1, y1, _ = pts_sorted[i]
        x2, y2, _ = pts_sorted[i + 1]
        out.append(f'<path d="M{x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}" stroke="{accent}" stroke-opacity=".26"/>')
    for i, (x, y, s) in enumerate(pts):
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{1.4+s*1.8:.1f}" fill="{accent2}" opacity=".9"/>')
        if i % 3 == 0:
            out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{5+s*2:.1f}" fill="none" stroke="{accent}" stroke-opacity=".3"/>')
    # signature bezier
    for k in range(3):
        y0 = 150 + k * 78
        out.append(f'<path d="M{cx-r-18} {y0}C{cx-r/2} {y0+rng.randint(-50,50)} {cx+r/2} {y0+rng.randint(-50,50)} {cx+r+18} {y0}" fill="none" stroke="{accent}" stroke-opacity=".10"/>')
    # initials
    out.append(f'<text x="{cx}" y="{cy+19}" text-anchor="middle" font-family="{SERIF}" font-size="82" font-weight="300" fill="{PAPER}" letter-spacing="2" opacity=".96">{esc(initials)}</text>')
    out.append(f'<path d="M{cx-74} {cy+42}H{cx+74}" stroke="{accent}" stroke-opacity=".55"/>')
    out.append(f'<text x="{cx}" y="{cy+66}" text-anchor="middle" font-family="{SANS}" font-size="8" fill="{accent}" letter-spacing="2.6">{esc(field)}</text>')
    # bottom info
    out.append(f'<path d="M28 {h-54}H{w-28}" stroke="{accent}" stroke-opacity=".2"/>')
    out.append(label(w - 20, 28, f"PLATE P-{seed:02d}", 7, MUTED, 1.2, anchor="end"))
    out.append("</svg>")
    (PORTRAITS / f"{pid}.svg").write_text("\n".join(out), encoding="utf-8")


# ---------------------------------------------------------------------------
# Favicon
# ---------------------------------------------------------------------------
def favicon():
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="12" fill="#050811"/>
<circle cx="32" cy="32" r="23" fill="none" stroke="{GOLD}" stroke-opacity=".45"/>
<ellipse cx="32" cy="32" rx="28" ry="10" fill="none" stroke="{CYAN}" stroke-opacity=".55" transform="rotate(-28 32 32)"/>
<circle cx="32" cy="32" r="3" fill="{GOLD}"/>
<text x="32" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="31" fill="#f3ead7">L</text>
</svg>'''
    (ROOT / "favicon.svg").write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    plate_rosetta()
    plate_duality()
    plate_functoriality()
    plate_lfunction()
    plate_map()
    plate_trace()
    plate_web()
    for p in PEOPLE:
        sigil(p)
    favicon()
    print(f"generated 7 plates, {len(PEOPLE)} sigils, favicon")
