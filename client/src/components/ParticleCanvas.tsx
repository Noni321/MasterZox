import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticleCanvasProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
}

const THEME_COLORS: Record<string, string> = {
  'default': '#00ff41',
  'theme-cyberpunk': '#ff00ff',
  'theme-red-alert': '#ff0000',
};

function getParticleColorFromTheme(): string {
  const root = document.documentElement;
  
  if (root.classList.contains('theme-cyberpunk')) {
    return THEME_COLORS['theme-cyberpunk'];
  }
  if (root.classList.contains('theme-red-alert')) {
    return THEME_COLORS['theme-red-alert'];
  }
  return THEME_COLORS['default'];
}

export function ParticleCanvas({ 
  particleCount = 80, 
  connectionDistance = 150,
  mouseRadius = 200 
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const colorRef = useRef<string>(getParticleColorFromTheme());

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    particlesRef.current = particles;
  }, [particleCount]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const color = colorRef.current;

    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRadius) {
        const force = (mouseRadius - distance) / mouseRadius;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.02;
        particle.vy -= Math.sin(angle) * force * 0.02;
      }

      const maxSpeed = 2;
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > maxSpeed) {
        particle.vx = (particle.vx / speed) * maxSpeed;
        particle.vy = (particle.vy / speed) * maxSpeed;
      }

      particle.vx *= 0.99;
      particle.vy *= 0.99;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const distX = particle.x - other.x;
        const distY = particle.y - other.y;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - dist / connectionDistance) * 0.3;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      if (distance < mouseRadius * 1.5) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = color;
        ctx.globalAlpha = (1 - distance / (mouseRadius * 1.5)) * 0.5;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });

    ctx.globalAlpha = 1;
    animationRef.current = requestAnimationFrame(animate);
  }, [connectionDistance, mouseRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const observeThemeChanges = new MutationObserver(() => {
      colorRef.current = getParticleColorFromTheme();
    });

    observeThemeChanges.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      observeThemeChanges.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [initParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      data-testid="particle-canvas"
    />
  );
}
