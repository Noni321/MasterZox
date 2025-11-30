import { motion } from 'framer-motion';
import { Shield, Code, Lock, Bug, Server, Wifi } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const skills = [
  { icon: Shield, label: 'Penetration Testing' },
  { icon: Code, label: 'Exploit Development' },
  { icon: Lock, label: 'Security Auditing' },
  { icon: Bug, label: 'Bug Bounty' },
  { icon: Server, label: 'Network Security' },
  { icon: Wifi, label: 'Wireless Hacking' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-about-heading">
            <span className="text-primary">&gt;_</span> About
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-sm" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 border-2 border-primary/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-8 border border-primary/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              
              <Avatar className="w-48 h-48 sm:w-56 sm:h-56 border-4 border-primary glow" data-testid="avatar-profile">
                <img 
                  src="/logo.jpg" 
                  alt="Master Zox" 
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="bg-card text-primary text-5xl sm:text-6xl font-bold">
                  MZ
                </AvatarFallback>
              </Avatar>
              
              <motion.div
                className="absolute -bottom-2 -right-2 p-3 glass rounded-md glow-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Shield className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass p-6 rounded-md glow-sm" data-testid="card-about-bio">
              <h3 className="text-2xl font-bold mb-4 text-foreground" data-testid="text-name">
                Hello, I am <span className="text-primary text-glow-sm">Master Zox</span>
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="terminal-prompt" data-testid="text-bio-1">
                  Cybersecurity Expert & Ethical Hacker with expertise in penetration testing, vulnerability assessment, and security research.
                </p>
                <p className="terminal-prompt" data-testid="text-bio-2">
                  Passionate about discovering vulnerabilities and helping organizations strengthen their security posture.
                </p>
                <p className="terminal-prompt" data-testid="text-bio-3">
                  Check my repositories and follow for the latest security research and tools.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="glass p-3 rounded-md flex items-center gap-2 cursor-default"
                  data-testid={`badge-skill-${skill.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <skill.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-medium text-foreground truncate">
                    {skill.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
