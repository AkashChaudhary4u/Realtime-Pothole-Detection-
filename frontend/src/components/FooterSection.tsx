import { motion } from "framer-motion";
import { Eye, Send, Mail, Github, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <footer className="relative py-20 border-t border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(217_91%_60%/0.04)_0%,transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Get In Touch</h3>
            <p className="text-sm text-muted-foreground mb-6">Have questions about PotholeVision? We'd love to hear from you.</p>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue/50"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue/50 resize-none"
              />
              <button className="btn-primary-glow flex items-center gap-2 text-sm">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </div>
          </motion.div>

          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-heading font-bold text-xl gradient-text">PotholeVision</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                AI-powered road safety intelligence platform for smarter, safer cities. Detecting road hazards in real-time with cutting-edge computer vision technology.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              {[Mail, Github, Twitter, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-lg border border-border hover:border-neon-blue/40 flex items-center justify-center text-muted-foreground hover:text-neon-blue transition-all"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 PotholeVision. AI-Powered Road Safety Intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
