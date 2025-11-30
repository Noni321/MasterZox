import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { SiTelegram, SiYoutube, SiMedium, SiDiscord } from 'react-icons/si';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { 
    icon: SiTelegram, 
    href: 'https://t.me/masterzoxofficial', 
    label: 'Telegram',
    testId: 'link-social-telegram'
  },
  { 
    icon: SiYoutube, 
    href: 'https://youtube.com/@masterzoxsecofficial?si=4HmGfe4-91IXY61l', 
    label: 'YouTube',
    testId: 'link-social-youtube'
  },
  { 
    icon: SiMedium, 
    href: 'https://medium.com/@masterzoxofficial', 
    label: 'Medium',
    testId: 'link-social-medium'
  },
  { 
    icon: SiDiscord, 
    href: 'https://discord.gg/UaFw5yvs', 
    label: 'Discord',
    testId: 'link-social-discord'
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-strong py-3' : 'py-4'
      }`}
      data-testid="navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <motion.a
            href="#"
            className="flex items-center gap-2 text-foreground"
            whileHover={{ scale: 1.02 }}
            data-testid="link-logo"
          >
            <Terminal className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg tracking-wider">
              <span className="text-primary">Master</span>
              <span className="text-foreground">Zox</span>
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                }`}
                whileHover={{ y: -2 }}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
                data-testid={social.testId}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong mt-2 mx-4 rounded-md overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium tracking-wide transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:bg-primary/5'
                  }`}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                >
                  <span className="text-primary mr-2">&gt;</span>
                  {link.label}
                </motion.button>
              ))}

              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-center gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                      data-testid={`mobile-${social.testId}`}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
