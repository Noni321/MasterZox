import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Send, User, Mail, MessageSquare, FileText, Loader2 } from 'lucide-react';
import { SiTelegram, SiYoutube, SiMedium, SiDiscord } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  telegramUsername: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { 
    icon: SiTelegram, 
    href: 'https://t.me/masterzoxofficial', 
    label: 'Telegram',
    color: 'hover:text-[#0088cc]',
    testId: 'contact-telegram'
  },
  { 
    icon: SiYoutube, 
    href: 'https://youtube.com/@masterzoxsecofficial?si=4HmGfe4-91IXY61l', 
    label: 'YouTube',
    color: 'hover:text-[#ff0000]',
    testId: 'contact-youtube'
  },
  { 
    icon: SiMedium, 
    href: 'https://medium.com/@masterzoxofficial', 
    label: 'Medium',
    color: 'hover:text-foreground',
    testId: 'contact-medium'
  },
  { 
    icon: SiDiscord, 
    href: 'https://discord.gg/UaFw5yvs', 
    label: 'Discord',
    color: 'hover:text-[#5865f2]',
    testId: 'contact-discord'
  },
];

export function ContactSection() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      telegramUsername: '',
      subject: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response;
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: 'Message sent!',
        description: 'Thanks for reaching out. I\'ll get back to you soon.',
      });
      setTimeout(() => setIsSuccess(false), 3000);
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to send message',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-primary">&gt;_</span> Contact
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full glow-sm" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Drop a message, I'll try to contact you soon.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-6 sm:p-8 rounded-md"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground">
                        <User className="w-4 h-4 text-primary" />
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="bg-muted/30 border-border focus:border-primary focus:glow-sm"
                          data-testid="input-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground">
                        <Mail className="w-4 h-4 text-primary" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="bg-muted/30 border-border focus:border-primary focus:glow-sm"
                          data-testid="input-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telegramUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground">
                        <SiTelegram className="w-4 h-4 text-primary" />
                        Telegram Username
                        <span className="text-muted-foreground text-xs">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="@username"
                          className="bg-muted/30 border-border focus:border-primary focus:glow-sm"
                          data-testid="input-telegram"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground">
                        <FileText className="w-4 h-4 text-primary" />
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's this about?"
                          className="bg-muted/30 border-border focus:border-primary focus:glow-sm"
                          data-testid="input-subject"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message..."
                          rows={5}
                          className="bg-muted/30 border-border focus:border-primary focus:glow-sm resize-none"
                          data-testid="input-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 glow"
                  disabled={mutation.isPending || isSuccess}
                  data-testid="button-submit-contact"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass p-6 rounded-md">
              <h3 className="text-lg font-bold mb-4 text-foreground">
                Connect With Me
              </h3>
              <p className="text-muted-foreground mb-6">
                Follow me on social media for the latest security research, tutorials, and updates.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-4 bg-muted/30 rounded-md border border-border/50 text-muted-foreground transition-colors ${social.color}`}
                    data-testid={social.testId}
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-md">
              <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                <span className="text-primary">&gt;_</span> Quick Response
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-start gap-3">
                  <span className="text-primary">$</span>
                  <span>For urgent matters, reach out via Telegram for faster response.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-primary">$</span>
                  <span>Security consultations and collaborations are welcome.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-primary">$</span>
                  <span>Join our Discord community for discussions and resources.</span>
                </p>
              </div>
            </div>

            <motion.div
              className="glass p-6 rounded-md text-center"
              animate={{ 
                boxShadow: [
                  '0 0 10px hsl(var(--glow-color) / 0.2)',
                  '0 0 20px hsl(var(--glow-color) / 0.4)',
                  '0 0 10px hsl(var(--glow-color) / 0.2)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-sm text-muted-foreground">
                Response time: Usually within <span className="text-primary font-bold">24 hours</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
