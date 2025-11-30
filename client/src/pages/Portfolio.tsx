import { useState } from 'react';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LandingScreen } from '@/components/LandingScreen';
import { Navigation } from '@/components/Navigation';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Portfolio() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleCanvas particleCount={60} connectionDistance={120} mouseRadius={180} />
      
      {showLanding && (
        <LandingScreen onComplete={() => setShowLanding(false)} />
      )}

      {!showLanding && (
        <>
          <ThemeToggle />
          <Navigation />
          
          <main className="relative z-10">
            <div className="h-16 md:h-20" />
            
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
}
