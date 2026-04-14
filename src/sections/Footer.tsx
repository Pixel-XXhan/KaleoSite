import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { footerConfig } from '../config';

// Magnetic Button Component
const MagneticButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`relative z-10 transition-colors duration-300 ${isHovered ? 'text-zinc-950' : ''}`}>
        {children}
      </span>
      <span
        className={`absolute inset-0 bg-white rounded-full transition-transform duration-300 ${
          isHovered ? 'scale-100' : 'scale-0'
        }`}
      />
    </motion.button>
  );
};

const iconMap: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
};

const Footer = () => {
  if (!footerConfig.heading && !footerConfig.logoText) return null;

  return (
    <footer className="relative w-full bg-background text-foreground overflow-hidden pt-24 border-t border-primary/10 transition-colors duration-700">
      {/* Background Image (Using a valid asset) */}
      <div className="absolute inset-0 opacity-[0.03] object-cover pointer-events-none">
        <img
          src="/breath-bg.jpg"
          alt=""
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Upper Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column - CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <h2 className="font-display text-5xl md:text-6xl text-foreground">
                {footerConfig.heading}
              </h2>
              <p className="font-body text-sm text-foreground/70 mt-6 max-w-md leading-relaxed">
                {footerConfig.description}
              </p>
              {footerConfig.ctaText && (
                <MagneticButton className="relative mt-8 px-8 py-4 border border-foreground/30 rounded-full font-body text-sm uppercase tracking-wider overflow-hidden transition-colors hover:border-foreground">
                  <span className="flex items-center gap-2">
                    {footerConfig.ctaText}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </MagneticButton>
              )}
            </motion.div>

            {/* Right Column - Contact Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact */}
                {footerConfig.contact.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-foreground/50 mb-4">
                      Contact
                    </h4>
                    <ul className="space-y-3">
                      {footerConfig.contact.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.href}
                            className="font-body text-sm text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
                          >
                            {item.type === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Address */}
                {footerConfig.address.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-foreground/50 mb-4">
                      {footerConfig.locationLabel}
                    </h4>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-foreground/60 mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-foreground/80 leading-relaxed">
                        {footerConfig.address.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < footerConfig.address.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}

                {/* Social */}
                {footerConfig.socials.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-foreground/50 mb-4">
                      {footerConfig.socialLabel}
                    </h4>
                    <div className="flex gap-4">
                      {footerConfig.socials.map((social, index) => {
                        const Icon = iconMap[social.platform.toLowerCase()] || Instagram;
                        return (
                          <a
                            key={index}
                            href={social.href}
                            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground hover:bg-foreground/5 transition-all"
                            aria-label={social.platform}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Large Logo */}
        {footerConfig.logoText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="border-t border-primary/10 py-12 md:py-16"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
              <svg
                viewBox="0 0 400 80"
                className="w-full max-w-4xl mx-auto h-auto opacity-10"
                fill="currentColor"
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="font-display"
                  style={{
                    fontSize: '72px',
                    fontFamily: 'Cormorant Garamond, serif',
                    letterSpacing: '0.05em'
                  }}
                >
                  {footerConfig.logoText}
                </text>
              </svg>
            </div>
          </motion.div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 py-6">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-foreground/50">
              {footerConfig.copyright}
            </p>
            {footerConfig.links.length > 0 && (
              <div className="flex gap-6">
                {footerConfig.links.map((link, index) => (
                  <a key={index} href={link.href} className="font-body text-xs text-foreground/50 hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
