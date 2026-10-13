---
name: Neo-Grid Cybernetic Interface
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393842'
  surface-container-lowest: '#0d0d16'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#302f39'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e3fdff'
  on-primary: '#00373a'
  primary-container: '#00f3ff'
  on-primary-container: '#006b71'
  inverse-primary: '#00696f'
  secondary: '#ffb1c4'
  on-secondary: '#65002e'
  secondary-container: '#ff4a8d'
  on-secondary-container: '#590028'
  tertiary: '#e8ffda'
  on-tertiary: '#053900'
  tertiary-container: '#36fd0f'
  on-tertiary-container: '#107000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#ffd9e1'
  secondary-fixed-dim: '#ffb1c4'
  on-secondary-fixed: '#3f001a'
  on-secondary-fixed-variant: '#8f0044'
  tertiary-fixed: '#79ff5b'
  tertiary-fixed-dim: '#2ae500'
  on-tertiary-fixed: '#022100'
  on-tertiary-fixed-variant: '#095300'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0.12em
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system establishes a high-performance, dark-mode-first cybernetic aesthetic tailored for personal profile aggregators, link-in-bio hubs, and digital personas. The personality is sharp, technical, and electric—channeling underground digital subcultures, military-spec HUDs, and high-density terminal interfaces.

The design movement combines **Minimalist Cyberpunk** with **Tactical HUD Architecture**:
- Heavy reliance on near-absolute black ground plates to absorb light and create limitless contrast.
- Controlled emissive lighting: luminescence is applied strictly as purposeful data indicators, active states, and focal boundaries rather than indiscriminate decorative glow.
- Functional technical precision: monospaced data readouts, micro-coordinates, angled brackets, and segmented progress indicators lend authentic hardware-level credibility.

## Colors

The color architecture is built around extreme contrast between an ultra-deep obsidian baseline and saturated emissive spectral accents.

### Palette Architecture
- **Canvas Base (`#0a0a12`)**: The foundational canvas plane. Absorbs all ambient light; keeps battery usage negligible on OLED screens.
- **Surface Elevation (`#131322`)**: The card and container surface. A cold, deep-void slate that provides minimal separation from the base canvas.
- **Surface Elevated Interactive (`#1a1a2e`)**: Active state hover/press tier for interactive modules.
- **Primary Accent (`#00f3ff`)**: Electric Cyan. Used for primary interactive triggers, active tabs, verified identifiers, and primary link glow outlines.
- **Secondary Accent (`#ff007f`)**: Neon Fuchsia. Dedicated to secondary highlights, alert-tier notifications, VIP badge counters, and intense kinetic feedback.
- **Tertiary Accent (`#39ff14`)**: Acid Lime. Reserved for system-state telemetry, online/ping status indicators, network latency metrics, and verified signature nodes.
- **Structural Neutral Border (`#261d42`)**: Deep violet-tinted edge lines that hold component geometries intact even when unpowered/idle.
- **Muted Data (`#797999`)**: Mid-tier desaturated purple-gray for auxiliary technical readouts, labels, and sub-labels.
- **Foreground Primary (`#f0f4fc`)**: High-legibility crisp white-blue for titles, primary URLs, and core readable text.

## Typography

The typographic hierarchy relies on a tripartite structural pairing:
1. **Space Grotesk** serves display and headline positions, offering geometric rigidity with distinctive technical cuts and idiosyncratic terminal angles.
2. **Inter** handles multi-line descriptions and functional body content, ensuring high legibility against pitch-black backgrounds.
3. **JetBrains Mono** governs all tactical metadata, badges, telemetry tags, URL protocols, and timestamp indicators.

All `label-*` tokens must be rendered in full uppercase with expanded letter-spacing to reproduce telemetry readouts.

## Layout & Spacing

The layout is built for mobile-first single-column aggregation, centering around a fixed max-width container (`480px`) on wider screens.

### Spatial Rhythm
- **Canvas Bounds**: Safe screen edge padding starts at `1rem` (`16px`) on standard smartphones, expanding to `1.5rem` (`24px`) on tablets.
- **Vertical Rhythm**: A strict 4px/8px modular scale. Primary link cards maintain a persistent vertical separation of `space-md` (`1rem`).
- **Dense Tactical Layout**: Profile headers, social strip anchors, and telemetry chips utilize `space-xs` and `space-sm` gaps to maintain a dense, compact HUD density.

## Elevation & Depth

Depth in this system is created using **luminous edge emission and surface contrast**, completely eschewing traditional drop shadows.

### Atmospheric Hierarchy
1. **Base Ground (Level 0)**: `#0a0a12`. Zero glow, raw backdrop.
2. **Container Shells (Level 1)**: `#131322` bordered by a 1px solid stroke of `#261d42`. No blur.
3. **Active/Focus Planes (Level 2)**: 1px border of `#00f3ff` backed by an internal and external localized aura:
   - Outer glow: `box-shadow: 0 0 16px rgba(0, 243, 255, 0.28), 0 0 2px rgba(0, 243, 255, 0.8)`
   - Inner glow: `inset 0 0 12px rgba(0, 243, 255, 0.08)`
4. **Critical/Alert State (Level 3)**:
   - 1px border of `#ff007f` with a localized aura: `box-shadow: 0 0 18px rgba(255, 0, 127, 0.35), 0 0 2px rgba(255, 0, 127, 0.9)`

Translucent panels use `backdrop-filter: blur(12px)` over a 85% opacity surface to permit background lighting conduits to bleed through subtly.

## Shapes

The shape system adopts a **strict zero-radius (sharp)** standard (`roundedness: 0`). Curved edges are completely absent to preserve the mechanical, hardware-chassis look.

### Architectural Cuts
- Standard components use razor-sharp 90-degree corners.
- Featured profile anchors and primary action nodes may utilize angled 45-degree chamfers (`clip-path: polygon(...)`) on top-right and bottom-left diagonal edges (4px to 8px cuts) to signify cybernetic chassis construction.

## Components

### Profile Header & Avatar Module
- **Avatar Frame**: Square geometry framed with a 2px dual border (outer `#00f3ff`, inner `#131322`). A floating corner status notch displays an active `#39ff14` pulsing telemetry pip (`STATUS: ONLINE`).
- **Handle & Bio**: Verified insignia appears as a sharp micro-badge using `label-md` accompanied by an electric cyan check or terminal symbol (`[#_]`).

### Link Cards
- **Base State**: Surface background `#131322`, 1px perimeter border `#261d42`, inner padding `space-md`. Typographic title in `headline-sm` with subtext URL in `label-sm` (`#797999`).
- **Hover/Tap State**: Instant border swap to `#00f3ff`, triggering a cyan outer neon glow (`0 0 12px rgba(0, 243, 255, 0.35)`). Right accessory icon shifts 4px horizontally.
- **Featured / Priority Card**: Bordered in `#ff007f` with a subtle pulsing magenta corner glow. Top edge contains an embedded tag: `// PRIORITY_STREAM`.

### HUD Badges & Chips
- Constructed with `label-sm`, monospace text, encapsulated in a high-contrast container with a 1px border.
- **Live Indicator**: `#39ff14` text and border with a green dot icon featuring a ping animation.
- **Counter Badge**: Filled `#ff007f` with pitch black text (`#0a0a12`), positioned flush on corner intersections.

### Buttons & Quick Actions
- **Primary CTA**: `#00f3ff` background with pitch black `#0a0a12` text in `label-lg`, completely sharp edges, emitting a perpetual cyan shadow aura. On interaction, invert to black background with electric cyan typography and full border glow.
- **Ghost/Tactical Action**: Background transparent, 1px border `#261d42`, foreground `#f0f4fc`. Hover state switches border to `#39ff14` with matching text tint.

### Inputs & Micro-Controls
- **Input Fields (Newsletter / Submissions)**: Surface `#131322`, bottom border only (2px `#261d42`), shifting to 2px `#00f3ff` with an active focus glow. Monospaced input text with a blinking block caret (`▍`).
- **Toggles**: Segmented binary rocker switches. Active state illuminated in `#00f3ff` or `#39ff14`; inactive state matches `#261d42`.