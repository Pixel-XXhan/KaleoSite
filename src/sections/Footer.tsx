import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Github, ExternalLink } from 'lucide-react';
import { footerConfig } from '../config';

// Magnetic Button Component
const MagneticButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
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
  github: Github,
};

const Footer = () => {
  if (!footerConfig.heading && !footerConfig.logoText) return null;

  return (
    <footer className="relative w-full bg-background text-foreground overflow-hidden transition-colors duration-700">
      
      {/* Top decorative gradient line */}
      <div className="footer-gradient-line h-px w-full" />

      {/* Ambient glow */}
      <div className="footer-glow absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">

        {/* ───── Main Section ───── */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-20 md:pt-28 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

            {/* Left Column - CTA & Description */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-kaleo-terracotta mb-4 block">
                {footerConfig.schoolName}
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05]">
                {footerConfig.heading}
              </h2>
              <p className="font-prose text-base md:text-lg text-foreground/70 mt-6 max-w-lg leading-[1.85] italic">
                {footerConfig.description}
              </p>
              {footerConfig.ctaText && (
                <a href={footerConfig.contact[0]?.href || "mailto:arisachan2026@gmail.com"}>
                  <MagneticButton className="relative mt-8 px-8 py-4 border border-foreground/30 rounded-full font-body text-sm uppercase tracking-wider overflow-hidden transition-colors hover:border-foreground">
                    <span className="flex items-center gap-2">
                      {footerConfig.ctaText}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </MagneticButton>
                </a>
              )}
            </motion.div>

            {/* Right Column - Contact Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
                
                {/* Contact Info */}
                <div>
                  <h4 className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-foreground/70 mb-5 flex items-center gap-2">
                    <span className="w-4 h-px bg-foreground/20" />
                    Contact
                  </h4>
                  <ul className="space-y-4">
                    {footerConfig.contact.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className="group font-body text-sm text-foreground/70 hover:text-foreground transition-all duration-300 flex items-center gap-3"
                        >
                          <span className="flex-shrink-0 w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center group-hover:border-foreground/30 group-hover:bg-foreground/5 transition-all duration-300">
                            {item.type === 'email' ? <Mail className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                          </span>
                          <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                            {item.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Location */}
                <div>
                  <h4 className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-foreground/70 mb-5 flex items-center gap-2">
                    <span className="w-4 h-px bg-foreground/20" />
                    {footerConfig.locationLabel}
                  </h4>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-foreground/70" />
                    </span>
                    <p className="font-body text-sm text-foreground/70 leading-relaxed">
                      {footerConfig.address.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < footerConfig.address.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-foreground/70 mb-5 flex items-center gap-2">
                    <span className="w-4 h-px bg-foreground/20" />
                    Explore
                  </h4>
                  <ul className="space-y-3">
                    {footerConfig.links.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="group font-body text-sm text-foreground/70 hover:text-foreground transition-all duration-300 flex items-center gap-2"
                        >
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social */}
                {footerConfig.socials.length > 0 && (
                  <div>
                    <h4 className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-foreground/70 mb-5 flex items-center gap-2">
                      <span className="w-4 h-px bg-foreground/20" />
                      {footerConfig.socialLabel}
                    </h4>
                    <div className="flex gap-3">
                      {footerConfig.socials.map((social, index) => {
                        const Icon = iconMap[social.platform.toLowerCase()] || Instagram;
                        return (
                          <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300"
                            aria-label={social.platform}
                          >
                            <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
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

        {/* ───── Full Brand Display Watermark ───── */}
        {footerConfig.logoText && (
          <div className="relative overflow-hidden py-16 md:py-24">
            <div className="footer-gradient-line h-px w-full mb-10 md:mb-16" />
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col items-center justify-center">
              {/* Full brand logo: pinwheel | divider | ARISA + tagline */}
              <div className="relative select-none">
                <img
                  src="/assets/logo/logo-full.webp"
                  alt="ARISA - Agronomic Risk Intelligence System for Agriculture"
                  className="w-[280px] md:w-[420px] lg:w-[520px] object-contain opacity-40 dark:opacity-25 transition-opacity duration-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* ───── Bottom Bar ───── */}
        <div className="footer-gradient-line h-px w-full" />
        <div className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-[0.65rem] text-foreground/70 tracking-wide">
              {footerConfig.copyright}
            </p>
            <div className="flex items-center gap-1.5 text-foreground/70">
              <span className="font-body text-[0.6rem] tracking-wide">Crafted with precision by</span>
              <span className="font-display text-sm italic text-foreground/70">Arief & Reza</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
