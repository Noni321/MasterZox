import { motion } from 'framer-motion';
import { 
  Shield, 
  Terminal, 
  Code, 
  Database, 
  Network, 
  Lock,
  Eye,
  Cpu,
  Globe,
  FileCode,
  Braces,
  Layers
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Security',
    skills: [
      { name: 'Penetration Testing', icon: Shield, level: 95 },
      { name: 'Vulnerability Research', icon: Eye, level: 90 },
      { name: 'Malware Analysis', icon: Lock, level: 85 },
      { name: 'Cryptography', icon: Braces, level: 80 },
    ],
  },
  {
    title: 'Development',
    skills: [
      { name: 'Python', icon: Code, level: 95 },
      { name: 'Bash/Shell', icon: Terminal, level: 90 },
      { name: 'JavaScript', icon: FileCode, level: 85 },
      { name: 'C/C++', icon: Cpu, level: 75 },
    ],
  },
  {
    title: 'Infrastructure',
    skills: [
      { name: 'Linux Systems', icon: Terminal, level: 95 },
      { name: 'Network Security', icon: Network, level: 92 },
      { name: 'Cloud Security', icon: Globe, level: 85 },
      { name: 'Database Security', icon: Database, level: 80 },
    ],
  },
];

const tools = [
  'Kali Linux', 'Burp Suite', 'Metasploit', 'Nmap',
  'Wireshark', 'Ghidra', 'IDA Pro', 'Hashcat',
  'SQLMap', 'Aircrack-ng', 'John the Ripper', 'Hydra',
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-skills-heading">
            <span className="text-primary">&gt;_</span> Skills
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-sm" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
              className="glass p-6 rounded-md"
              data-testid={`card-skill-category-${category.title.toLowerCase()}`}
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2" data-testid={`text-category-title-${category.title.toLowerCase()}`}>
                <Layers className="w-5 h-5 text-primary" />
                <span className="text-foreground">{category.title}</span>
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + skillIndex * 0.1 }}
                    data-testid={`skill-item-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <skill.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground" data-testid={`text-skill-name-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground" data-testid={`text-skill-level-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary glow-sm rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + skillIndex * 0.1, ease: 'easeOut' }}
                        data-testid={`progress-bar-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass p-6 rounded-md"
          data-testid="card-tools"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2" data-testid="text-tools-heading">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-foreground">Tools & Technologies</span>
          </h3>

          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-md text-sm font-medium text-foreground cursor-default"
                data-testid={`badge-tool-${tool.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
