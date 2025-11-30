import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, AlertTriangle } from 'lucide-react';

type Theme = 'hacker' | 'cyberpunk' | 'red-alert';

interface ThemeConfig {
  name: string;
  icon: typeof Shield;
  class: string;
  label: string;
}

const themes: Record<Theme, ThemeConfig> = {
  hacker: {
    name: 'Dark Hacker',
    icon: Shield,
    class: '',
    label: 'Matrix Green Theme',
  },
  cyberpunk: {
    name: 'Cyberpunk',
    icon: Zap,
    class: 'theme-cyberpunk',
    label: 'Neon Purple Theme',
  },
  'red-alert': {
    name: 'Red Alert',
    icon: AlertTriangle,
    class: 'theme-red-alert',
    label: 'Danger Red Theme',
  },
};

const themeOrder: Theme[] = ['hacker', 'cyberpunk', 'red-alert'];

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('hacker');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme;
    if (saved && themes[saved]) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    themeOrder.forEach(t => {
      const themeClass = themes[t].class;
      if (themeClass) {
        root.classList.remove(themeClass);
      }
    });
    if (themes[theme].class) {
      root.classList.add(themes[theme].class);
    }
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
    setIsOpen(false);
  };

  const CurrentIcon = themes[currentTheme].icon;

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-md glass glow-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Current theme: ${themes[currentTheme].name}. Click to change theme.`}
        data-testid="button-theme-toggle"
      >
        <CurrentIcon className="w-5 h-5 text-primary" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 p-2 glass-strong rounded-md min-w-48 z-50"
              data-testid="menu-theme-options"
            >
              <div className="text-xs text-muted-foreground mb-2 px-2 font-semibold tracking-wider">
                SELECT THEME
              </div>
              {themeOrder.map((theme) => {
                const config = themes[theme];
                const Icon = config.icon;
                const isActive = currentTheme === theme;

                return (
                  <motion.button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'text-foreground/70 hover:bg-primary/10 hover:text-foreground'
                    }`}
                    whileHover={{ x: 4 }}
                    data-testid={`button-theme-${theme}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{config.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="theme-indicator"
                        className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
