# Master Zox Portfolio

## Overview
A hacker-themed portfolio web application for Master Zox, a cybersecurity expert and ethical hacker. Features stunning animations, interactive particle effects, and 3 customizable themes.

## Current State
- **Status**: MVP Complete
- **Last Updated**: November 30, 2025

## Key Features

### 1. Animated Landing Screen
- "Continue" → "Welcome" word transition with glitch/scramble effect on click
- Typing cursor animation
- Smooth fade-out transition to main portfolio

### 2. Interactive Particle Background
- Canvas-based particle network with connecting lines
- Particles follow cursor movement with trailing effect
- Continuous subtle animation even without interaction
- Performance optimized for mobile devices

### 3. Three Theme System
- **Dark Hacker** (Default): Matrix green (#00ff41) on black
- **Cyberpunk**: Neon pink/magenta (#ff00ff) with cyan accents
- **Red Alert**: Danger red (#ff0000) with dark accents
- Theme persists in localStorage
- Smooth CSS transitions between themes

### 4. Portfolio Sections
- **About**: Profile with animated avatar and skill badges
- **Skills**: Categorized skill bars with progress indicators
- **Projects**: Card grid showcasing security tools/projects
- **Contact**: Form with validation + social media links

### 5. Contact Form
- Fields: Name, Email, Telegram Username (optional), Subject, Message
- Zod validation on frontend and backend
- Toast notifications for success/error states
- In-memory storage for messages

## Project Architecture

### Frontend (React + Vite)
```
client/src/
├── components/
│   ├── ParticleCanvas.tsx     # Interactive particle background
│   ├── ThemeToggle.tsx        # 3-theme switcher
│   ├── LandingScreen.tsx      # Animated entry screen
│   ├── Navigation.tsx         # Header with hamburger menu
│   ├── AboutSection.tsx       # Profile and bio
│   ├── SkillsSection.tsx      # Skills with progress bars
│   ├── ProjectsSection.tsx    # Project cards grid
│   ├── ContactSection.tsx     # Contact form + social links
│   └── Footer.tsx             # Footer with scroll-to-top
├── pages/
│   └── Portfolio.tsx          # Main portfolio page
└── App.tsx                    # Router and providers
```

### Backend (Express)
```
server/
├── routes.ts      # API endpoints (/api/contact)
├── storage.ts     # In-memory storage
└── index.ts       # Server entry point
```

### Shared
```
shared/
└── schema.ts      # Zod schemas & TypeScript types
```

## Design System

### Fonts
- Primary: JetBrains Mono (monospace for hacker aesthetic)
- Fallback: Fira Code

### Color Tokens (CSS Variables)
- `--primary`: Theme accent color
- `--foreground`: Text color
- `--background`: Page background
- `--glow-color`: Glow effects
- `--particle-color`: Particle animation color

### Utilities (index.css)
- `.glass` / `.glass-strong`: Glassmorphism effects
- `.glow` / `.glow-sm` / `.glow-lg`: Box shadow glows
- `.text-glow`: Text shadow glows
- `.glitch`: Glitch text effect
- `.typing-cursor`: Blinking cursor
- `.terminal-prompt`: Command line style prefix
- `.pulse-glow` / `.float`: Keyframe animations

## API Endpoints

### POST /api/contact
Submit a contact message
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "telegramUsername": "string (optional)",
  "subject": "string (required)",
  "message": "string (required, min 10 chars)"
}
```

### GET /api/contact
Retrieve all contact messages (admin use)

## Social Links
- Telegram: https://t.me/masterzoxofficial
- YouTube: https://youtube.com/@masterzoxsecofficial
- Medium: https://medium.com/@masterzoxofficial
- Discord: https://discord.gg/UaFw5yvs

## User Preferences
- Theme preference saved in localStorage as 'portfolio-theme'
- Reduced motion support via prefers-reduced-motion media query

## Recent Changes
- Initial build: Complete hacker-themed portfolio with all MVP features
- 3-theme system with Dark Hacker, Cyberpunk, and Red Alert options
- Animated landing screen with word scramble effect
- Interactive particle canvas following cursor
- Responsive design for mobile and desktop
