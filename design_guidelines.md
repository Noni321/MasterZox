# Master Zox Portfolio - Design Guidelines

## Design Approach: Hacker/Cybersecurity Theme
Reference inspiration: Matrix aesthetics, terminal interfaces, GitHub dark themes, and modern cybersecurity tools like Kali Linux, HackerRank, and CyberChef.

## Core Design Principles
- **Terminal-Inspired Aesthetic**: Monospace typography, command-line style interactions
- **Dynamic Motion**: Continuous background animations, cursor-reactive elements
- **Glassmorphism**: Translucent panels with backdrop blur for depth
- **High Contrast**: Sharp readability with glowing accents

## Typography System
**Primary Font**: JetBrains Mono, Fira Code, or Courier New (monospace)
- Hero/Heading: text-4xl to text-6xl, font-bold, tracking-wider
- Subheadings: text-2xl to text-3xl, font-semibold
- Body: text-base to text-lg, font-normal, leading-relaxed
- Code/Terminal Elements: text-sm, font-mono

## Layout & Spacing
**Spacing Units**: Primarily use p-4, p-6, p-8, p-12, m-4, m-6, m-8
- Section padding: py-16 to py-24 on desktop, py-8 to py-12 on mobile
- Card spacing: p-6 to p-8 with gap-6 to gap-8 between elements
- Full viewport sections allowed for landing and hero areas

## Three Theme Variations

### Theme 1: Dark Hacker (Default)
- Background: Deep blacks (#000000, #0a0a0a)
- Accent: Matrix green (#00ff41, #00ff9f)
- Text: Bright green on black
- Glow effects on interactive elements

### Theme 2: Cyberpunk
- Background: Dark purple (#1a0033, #2d1b4e)
- Accent: Neon pink/magenta (#ff00ff, #ff006e)
- Secondary: Electric cyan (#00ffff)
- Vibrant, high-saturation colors

### Theme 3: Red Alert
- Background: Deep black/dark red (#0d0000, #1a0505)
- Accent: Danger red (#ff0000, #ff3333)
- Warning aesthetics with sharp contrast

## Component Library

### Landing Screen Animation
- Full viewport (100vh) centered container
- Large animated text (text-6xl) with glitch effect
- "Continue" → "Welcome" transition on click with fade/slide animation
- Typing cursor effect after word changes

### Navigation
- Fixed top nav with glassmorphism (backdrop-blur-md, bg-black/30)
- Hamburger menu for mobile (animated to X on toggle)
- Logo/name on left, social icons on right
- Smooth scroll navigation with active section indicators

### Background Particle System
- Canvas-based particle network with connecting lines
- Particles follow cursor with trailing effect
- Continuous subtle movement even without cursor interaction
- Reduced particle count on mobile for performance

### Theme Toggle
- Floating toggle button (fixed position, top-right or bottom-right)
- Icon-based switcher showing current theme
- Smooth CSS transition for all theme changes (transition-all duration-300)
- Persist theme choice in localStorage

### Portfolio Sections

**About Section**:
- 2-column layout (desktop): Profile image + bio text
- Glassmorphic card with border glow effect
- Animated skill tags/badges with hover effects

**Skills Section**:
- Grid layout: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Icon + skill name cards with progress indicators
- Glassmorphic cards with subtle hover lift effect

**Projects/Repositories**:
- Card grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Each card: Project name, description, tech stack, GitHub link
- Glassmorphic cards with 3D tilt effect on hover
- Terminal-style code snippet previews

**Contact Section**:
- 2-column layout: Form + social links/info
- Form fields: Name, Email, Telegram Username, Subject, Message
- Glassmorphic input fields with glowing border on focus
- Submit button with animated loading state
- Social media links (Telegram, YouTube, Medium, Discord) as icon buttons

### Visual Effects
- **Glitch Effect**: On hero text and theme transitions
- **Glow Effects**: On hover states and active elements (box-shadow with theme color)
- **Cursor Trail**: Subtle particle trail following mouse movement
- **3D Card Tilt**: transform: rotateX() rotateY() on card hover
- **Text Typing Animation**: For landing screen and section headers

### Interactive Elements
- Buttons: Glassmorphic with backdrop-blur, border-2 with glow, px-6 py-3
- Links: Underline animation on hover with theme color
- Cards: transform scale(1.02) on hover with smooth transition
- Inputs: Focused state with glowing border matching theme

### Responsive Behavior
- Mobile: Single column, hamburger menu, reduced particles
- Tablet: 2-column grids, compact spacing
- Desktop: Multi-column layouts, full particle effects, larger text

## Accessibility
- Sufficient contrast ratios (WCAG AA minimum)
- Keyboard navigation support for all interactive elements
- Focus indicators with visible glow effects
- Reduced motion fallback (prefers-reduced-motion)
- ARIA labels for icon-only buttons and theme toggle

## Images
No hero images required - landing uses animated text instead. For About section, use a profile image placeholder (circular, 200x200px minimum, centered).