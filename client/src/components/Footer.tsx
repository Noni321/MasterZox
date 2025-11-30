import { motion } from 'framer-motion';
import { Terminal, ArrowUp } from 'lucide-react';
import { SiTelegram, SiYoutube, SiMedium, SiDiscord } from 'react-icons/si';

const socialLinks = [
  { icon: SiTelegram, href: 'https://t.me/masterzoxofficial', label: 'Telegram', testId: 'footer-link-telegram' },
  { icon: SiYoutube, href: 'https://youtube.com/@masterzoxsecofficial?si=4HmGfe4-91IXY61l', label: 'YouTube', testId: 'footer-link-youtube' },
  { icon: SiMedium, href: 'https://medium.com/@masterzoxofficial', label: 'Medium', testId: 'footer-link-medium' },
  { icon: SiDiscord, href: 'https://discord.gg/UaFw5yvs', label: 'Discord', testId: 'footer-link-discord' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-border/30 relative" data-testid="footer">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg tracking-wider" data-testid="text-footer-logo">
              <span className="text-primary">Master</span>
              <span className="text-foreground">Zox</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
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
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={scrollToTop}
            className="p-3 glass rounded-md text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
            data-testid="button-scroll-top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-border/20 text-center"
        >
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            <span className="text-primary">&gt;</span> {new Date().getFullYear()} Master Zox. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2" data-testid="text-tagline">
            Designed with security in mind.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
