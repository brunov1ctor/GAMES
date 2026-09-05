# Image analysis — grass-block.png

## Layer 1 — Identification & classification
Object: a grass block (voxel terrain block). Category: cuboid prop / voxel terrain block.
primaryDomain: object. Confidence: 1.0 (unambiguous, iconic isometric render).

## Layer 2 — Form & silhouette
Bounding volume: a single cuboid with equal width/height/depth (1:1:1) — the top face renders as a
rhombus and both visible side faces are congruent parallelograms, consistent with a cube viewed in
an isometric 3/4 projection (no perspective convergence). Shape language: purely geometric,
axis-aligned, no bevels or rounded edges — hard voxel aesthetic.

## Layer 3 — Macro → meso → micro decomposition
Macro: single monolithic cube, no separate assemblies.
Meso: three material regions by role — top face (grass), side faces (grass-topped dirt), bottom
face (not visible in this view).
Micro: a jagged grass-fringe band along the top edge of each side face, dipping into the dirt
below at irregular depths; mottled green pixel clusters on the top face; scattered small
dark/gray fleck pixels across the dirt regions.

## Layer 4 — Spatial relationships
`<grass-fringe, overlaps, dirt-side-face>` — texture-space feature, not a modeled geometric part.
`<top-face, flush-with, side-faces>` — sharp 90° edge, no chamfer.
`<side-face, flush-with, side-face>` — sharp vertical edge, no rounding.
All faces belong to one rigid cuboid; no articulation.

## Layer 5 — Materials & surface (PBR)
Fully diffuse/matte across all regions — no specular highlights, no gloss, no reflections.
Metalness: 0. Roughness: uniformly high (~0.9-1.0). No baked bump/pitting — all texture variation
is flat albedo pixel-color noise (stylized pixel-art material, not photoreal). Fully opaque.

## Layer 6 — Color & finish
Top face: mid-saturation green (~hue 100-110°), mottled two-tone noise pattern (no directional
gradient). Side-face fringe: same green palette as top, irregular jagged-edged band. Side-face
dirt: warm brown (~hue 25-30°), pixel-level noise plus sparse cooler gray-blue flecks (small
pebble-like inclusions). Finish: matte flat swatches throughout, no gloss/metallic, no smooth
gradients (low-resolution voxel-game pixel-art style).

## Layer 7 — Identity-defining features
1. **Jagged grass-overhang fringe** on the side faces — the single most identity-defining trait.
   A straight horizontal band would read as a generic two-tone cube, not this object.
2. Blocky/quantized pixel-grain resolution itself (stylistic identity marker).
3. Sparse gray-blue fleck pixels in the dirt (secondary recognizable detail).
No inscriptions, no unique wear marks — a generic, repeatable game asset.

## Layer 8 — Uncertainty & single-image limits
- Bottom face: occluded in this view. Inferred as plain dirt by canon convention for this asset,
  not observed evidence — flagged `undetermined-from-this-view`.
- The two hidden side faces: inferred identical to the two visible ones by the object's known
  radial symmetry (canon convention), not directly observed.
- Exact texel grid (e.g. 16x16) cannot be measured pixel-perfectly from this 300x300 render;
  treated as an approximation, not a measured fact.
- A slight value difference between the two visible side faces suggests a single soft directional
  light (upper-left); inferred from relative panel brightness, not confirmed via a specular probe.

## Reference suitability verdict (validation_rubric.md)

**PASS** — one obvious target object; occupies 68.8% of frame (foreground coverage from
`check_reference_admission.py`); strong silhouette; major materials visible (grass top, dirt
sides); hidden bottom face and far side faces can be reasonably inferred from the object's known
radial symmetry and canon convention; target approximates cleanly with a single procedural
primitive (cube).

## Assessment
Complexity: **simple** — single monolithic cuboid, 3 material regions, no moving parts, no
character/CS2 routing. Solid procedural albedo is sufficient for every region (rule of thumb:
solid albedo for flat paint) — no photographic material crops needed given the flat, unlit
pixel-art finish.
