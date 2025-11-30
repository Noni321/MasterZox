import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingScreenProps {
  onComplete: () => void;
}

const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function LandingScreen({ onComplete }: LandingScreenProps) {
  const [currentWord, setCurrentWord] = useState('Continue');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrambleText = useCallback((targetWord: string, onScrambleComplete: () => void) => {
    const duration = 800;
    const frameRate = 30;
    const frames = duration / (1000 / frameRate);
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / frames;
      
      let result = '';
      for (let i = 0; i < targetWord.length; i++) {
        if (progress > (i / targetWord.length) + 0.3) {
          result += targetWord[i];
        } else {
          result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }
      
      setCurrentWord(result);

      if (frame >= frames) {
        clearInterval(interval);
        setCurrentWord(targetWord);
        onScrambleComplete();
      }
    }, 1000 / frameRate);
  }, []);

  const handleClick = useCallback(() => {
    if (isAnimating || isTransitioning) return;

    setIsAnimating(true);
    
    scrambleText('Welcome', () => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(onComplete, 800);
      }, 600);
    });
  }, [isAnimating, isTransitioning, scrambleText, onComplete]);

  return (
    <AnimatePresence>
      {!isTransitioning ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background cursor-pointer"
          onClick={handleClick}
          data-testid="landing-screen"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-glow ${
                  isAnimating ? 'glitch' : ''
                }`}
                data-text={currentWord}
                data-testid="text-landing-word"
                animate={isAnimating ? { 
                  x: [0, -2, 2, -1, 1, 0],
                  filter: [
                    'hue-rotate(0deg)',
                    'hue-rotate(10deg)',
                    'hue-rotate(-10deg)',
                    'hue-rotate(5deg)',
                    'hue-rotate(-5deg)',
                    'hue-rotate(0deg)',
                  ]
                } : {}}
                transition={{ duration: 0.3, repeat: isAnimating ? 2 : 0 }}
              >
                <span className="text-foreground">{currentWord}</span>
                <span 
                  className={`text-primary ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transition: 'opacity 0.1s' }}
                  data-testid="text-cursor"
                >
                  _
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8 text-sm sm:text-base text-muted-foreground tracking-widest uppercase"
                data-testid="text-landing-hint"
              >
                {currentWord === 'Continue' ? 'Click to enter' : 'Initializing...'}
              </motion.p>
            </motion.div>

            <motion.div
              className="absolute -inset-20 border border-primary/20 rounded-lg"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <motion.div
              className="absolute -inset-32 border border-primary/10 rounded-lg"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 h-2 bg-primary rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
