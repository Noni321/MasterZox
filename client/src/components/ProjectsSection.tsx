import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, Shield, Code, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'SecureScanner Pro',
    description: 'Advanced vulnerability scanner with automated penetration testing capabilities and detailed reporting.',
    tech: ['Python', 'Nmap', 'SQLMap', 'Docker'],
    icon: Shield,
    status: 'Active',
    category: 'Security Tool',
  },
  {
    id: 2,
    title: 'CryptoVault',
    description: 'Secure password manager with military-grade encryption and zero-knowledge architecture.',
    tech: ['Python', 'AES-256', 'Argon2', 'SQLite'],
    icon: Lock,
    status: 'Active',
    category: 'Cryptography',
  },
  {
    id: 3,
    title: 'NetMonitor',
    description: 'Real-time network traffic analyzer and intrusion detection system with ML-based threat detection.',
    tech: ['Python', 'Scapy', 'TensorFlow', 'Elasticsearch'],
    icon: Terminal,
    status: 'Development',
    category: 'Network Security',
  },
  {
    id: 4,
    title: 'ExploitDB Client',
    description: 'Command-line tool for searching and downloading exploits from various security databases.',
    tech: ['Python', 'Requests', 'BeautifulSoup', 'CLI'],
    icon: Code,
    status: 'Active',
    category: 'Security Tool',
  },
  {
    id: 5,
    title: 'PhishGuard',
    description: 'Anti-phishing browser extension with AI-powered detection and URL reputation checking.',
    tech: ['JavaScript', 'Chrome API', 'ML', 'Node.js'],
    icon: Shield,
    status: 'Beta',
    category: 'Security Tool',
  },
  {
    id: 6,
    title: 'MemoryForensics',
    description: 'Memory analysis toolkit for malware detection and incident response investigations.',
    tech: ['Python', 'Volatility', 'YARA', 'Memory Analysis'],
    icon: Terminal,
    status: 'Active',
    category: 'Forensics',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-projects-heading">
            <span className="text-primary">&gt;_</span> Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-sm" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto" data-testid="text-projects-description">
            Security tools and research projects focused on vulnerability assessment, 
            penetration testing, and cybersecurity automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group glass p-6 rounded-md relative overflow-visible"
              data-testid={`card-project-${project.id}`}
            >
              <div className="absolute top-4 right-4">
                <span 
                  className={`px-2 py-1 text-xs font-medium rounded-md ${
                    project.status === 'Active' 
                      ? 'bg-primary/20 text-primary' 
                      : project.status === 'Beta'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  data-testid={`badge-status-${project.id}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:glow-sm transition-all">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>
                
                <span className="text-xs text-muted-foreground uppercase tracking-wider" data-testid={`text-category-${project.id}`}>
                  {project.category}
                </span>
                
                <h3 className="text-lg font-bold mt-1 text-foreground group-hover:text-primary transition-colors" data-testid={`text-title-${project.id}`}>
                  {project.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`text-description-${project.id}`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-muted/50 rounded-sm text-xs font-medium text-foreground/80"
                    data-testid={`badge-tech-${project.id}-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 gap-2 text-muted-foreground hover:text-primary"
                  data-testid={`button-github-${project.id}`}
                >
                  <Github className="w-4 h-4" />
                  Code
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 gap-2 text-muted-foreground hover:text-primary"
                  data-testid={`button-demo-${project.id}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="gap-2 glow-sm"
            asChild
          >
            <a 
              href="https://github.com/masterzoxofficial" 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid="link-github-profile"
            >
              <Github className="w-5 h-5" />
              View All Repositories
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
