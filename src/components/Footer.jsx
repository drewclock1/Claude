import { motion } from 'framer-motion'
import { Zap, Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Social Media Management', href: '#services' },
    { label: 'Photography & Content', href: '#services' },
    { label: 'Brand Identity & Design', href: '#services' },
    { label: 'Email Marketing', href: '#services' },
    { label: 'Custom Packages', href: '#contact' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Results', href: '#results' },
    { label: 'Client Stories', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  Resources: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Free Strategy Call', href: '#contact' },
    { label: 'Social Media Audit', href: '#contact' },
    { label: 'Marketing Blog', href: '#' },
    { label: 'Case Studies', href: '#results' },
  ],
}

const socials = [
  { icon: Instagram, href: 'https://instagram.com/jvmarketing', label: 'Instagram' },
  { icon: Facebook,  href: 'https://facebook.com/jvmarketing',  label: 'Facebook'  },
  { icon: Twitter,   href: 'https://twitter.com/jvmarketing',   label: 'Twitter'   },
  { icon: Linkedin,  href: 'https://linkedin.com/company/jvmarketing', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-jv-card border-t border-jv-border">
      {/* Newsletter */}
      <div className="border-b border-jv-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-black text-2xl text-white mb-1">
                Get free marketing tips every week
              </h3>
              <p className="text-jv-muted text-sm">
                No spam. Just actionable strategies Houston businesses actually use.
              </p>
            </div>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-jv-dark border border-jv-border text-white placeholder-jv-muted text-sm outline-none focus:border-jv-orange transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-jv-orange hover:bg-jv-orange-h text-white rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-jv-orange rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                JV <span className="text-jv-orange">Marketing</span>
              </span>
            </a>

            <p className="text-jv-muted text-sm leading-relaxed mb-6 max-w-xs">
              Houston's premier social media agency. We turn followers into paying customers
              for businesses across Texas and beyond.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6">
              {[
                { icon: Phone, text: '(713) 777-7777', href: 'tel:+17137777777' },
                { icon: Mail, text: 'hello@jvmarketing.co', href: 'mailto:hello@jvmarketing.co' },
                { icon: MapPin, text: 'Houston, Texas 77002', href: '#' },
              ].map(item => {
                const Icon = item.icon
                return (
                  <a
                    key={item.text}
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-jv-muted hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4 text-jv-orange flex-shrink-0" />
                    {item.text}
                  </a>
                )
              })}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(s => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-jv-dark border border-jv-border hover:border-jv-orange hover:text-jv-orange flex items-center justify-center text-jv-muted transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display font-black text-white text-sm uppercase tracking-widest mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-jv-muted hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-jv-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-jv-muted text-xs">
            © {new Date().getFullYear()} JV Marketing LLC. All rights reserved. Houston, TX.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a
                key={item}
                href="#"
                className="text-jv-muted hover:text-white text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
