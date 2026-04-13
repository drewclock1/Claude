import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BarChart3, Camera, Palette, Mail,
  CheckCircle2, ArrowRight, TrendingUp, Users, Zap, Target,
} from 'lucide-react'

const services = [
  {
    icon: BarChart3,
    color: 'orange',
    badge: 'Most Popular',
    title: 'Social Media Management',
    subtitle: 'From strategy to results — fully handled for you',
    desc: 'Stop guessing what to post and when. We build a custom content strategy, create everything, publish consistently, and engage your audience — so you can focus on running your business.',
    outcomes: [
      'Avg 340% follower growth in 6 months',
      '5x more engagement than industry average',
      'Leads & DMs from organic reach',
      'Weekly analytics reports with clear ROI',
    ],
    features: [
      'Custom content strategy & calendar',
      'Professional graphics & copywriting',
      'Daily/weekly posting on all platforms',
      'Community management & replies',
      'Hashtag research & optimization',
      'Competitor analysis & reporting',
    ],
    cta: 'Get Social Media Management',
    gradient: 'from-jv-orange/20 to-transparent',
    borderHover: 'hover:border-jv-orange/50',
    iconBg: 'bg-jv-orange-sub',
    iconColor: 'text-jv-orange',
    badgeBg: 'bg-jv-orange text-white',
  },
  {
    icon: Camera,
    color: 'teal',
    badge: '',
    title: 'Photography & Content',
    subtitle: 'Visuals that stop the scroll every time',
    desc: "Phone photos aren't cutting it anymore. Our professional photography and video content makes your business look as premium as it is — and gives your social media the visual punch it needs.",
    outcomes: [
      '3x more engagement on visual content',
      'Professional brand images in 48 hours',
      'Content library for 3+ months of posting',
      'Reels & short video that drive reach',
    ],
    features: [
      'Brand & lifestyle photography',
      'Product & menu photography',
      'Instagram Reels & TikTok videos',
      'Drone aerial footage (add-on)',
      'Same-week editing & delivery',
      'Content organized by platform',
    ],
    cta: 'Upgrade Your Visuals',
    gradient: 'from-jv-teal/20 to-transparent',
    borderHover: 'hover:border-jv-teal/50',
    iconBg: 'bg-jv-teal/15',
    iconColor: 'text-jv-teal',
    badgeBg: 'bg-jv-teal text-white',
  },
  {
    icon: Palette,
    color: 'purple',
    badge: '',
    title: 'Brand Identity & Design',
    subtitle: 'A brand that commands attention and premium prices',
    desc: 'Your brand is your first impression. We create complete visual identities that instantly communicate trust, quality, and professionalism — making your business the obvious choice.',
    outcomes: [
      'Consistent brand across every touchpoint',
      'Look premium without premium overhead',
      'Attract higher-value clients',
      'Stand out from every competitor',
    ],
    features: [
      'Logo design & brand mark',
      'Color palette & typography system',
      'Full brand guidelines document',
      'Business card & stationery design',
      'Social media profile graphics',
      'Website & ad creative templates',
    ],
    cta: 'Build My Brand',
    gradient: 'from-jv-purple/20 to-transparent',
    borderHover: 'hover:border-jv-purple/50',
    iconBg: 'bg-jv-purple/15',
    iconColor: 'text-jv-purple',
    badgeBg: 'bg-jv-purple text-white',
  },
  {
    icon: Mail,
    color: 'gold',
    badge: 'Highest ROI',
    title: 'Email Marketing',
    subtitle: 'Your most valuable marketing asset — fully automated',
    desc: 'Email has a 42:1 ROI — the highest of any marketing channel. We turn your email list into a predictable revenue machine with campaigns, automations, and sequences that convert.',
    outcomes: [
      '$42 return for every $1 spent (industry avg)',
      'Automated sequences that sell while you sleep',
      'Re-engage cold leads with win-back campaigns',
      '35-50% open rates (vs 18% industry avg)',
    ],
    features: [
      'Email strategy & audience segmentation',
      'Newsletter template design & branding',
      'Automated welcome & nurture sequences',
      'Promotional & launch campaigns',
      'A/B testing for subject lines & CTAs',
      'Monthly performance analytics',
    ],
    cta: 'Start Email Marketing',
    gradient: 'from-jv-gold/20 to-transparent',
    borderHover: 'hover:border-jv-gold/50',
    iconBg: 'bg-jv-gold/15',
    iconColor: 'text-jv-gold',
    badgeBg: 'bg-jv-gold text-jv-dark',
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group bg-jv-light-card rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 overflow-hidden ${service.borderHover}`}
    >
      {/* Top gradient */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        service.color === 'orange' ? 'from-jv-orange to-orange-400' :
        service.color === 'teal'   ? 'from-jv-teal to-cyan-400' :
        service.color === 'purple' ? 'from-jv-purple to-violet-400' :
                                     'from-jv-gold to-amber-400'
      }`} />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
            <Icon className={`w-7 h-7 ${service.iconColor}`} />
          </div>
          {service.badge && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${service.badgeBg}`}>
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl font-black text-jv-dark mb-1">{service.title}</h3>
        <p className={`text-sm font-semibold mb-4 ${service.iconColor}`}>{service.subtitle}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.desc}</p>

        {/* Outcomes */}
        <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Typical Results</p>
          <div className="space-y-2">
            {service.outcomes.map(o => (
              <div key={o} className="flex items-start gap-2">
                <TrendingUp className={`w-4 h-4 flex-shrink-0 mt-0.5 ${service.iconColor}`} />
                <span className="text-sm text-gray-600">{o}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What's Included</p>
          <div className="grid grid-cols-1 gap-2">
            {service.features.map(f => (
              <div key={f} className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${service.iconColor}`} />
                <span className="text-sm text-gray-600">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 group-hover:gap-3 ${
            service.color === 'orange' ? 'bg-jv-orange hover:bg-jv-orange-h text-white' :
            service.color === 'teal'   ? 'bg-jv-teal hover:bg-cyan-500 text-white' :
            service.color === 'purple' ? 'bg-jv-purple hover:bg-violet-600 text-white' :
                                         'bg-jv-gold hover:bg-amber-400 text-jv-dark'
          }`}
        >
          {service.cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-24 md:py-32 bg-jv-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label border-jv-orange/30 bg-jv-orange-sub text-jv-orange mb-6 mx-auto w-fit">
              <Zap className="w-4 h-4 fill-jv-orange" />
              Our Services
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-jv-dark mb-6 text-balance">
              Everything you need to{' '}
              <span className="gradient-text">dominate online</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              From content creation to full brand strategy — we handle all of it so you can focus
              on what you do best: running your business.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-4">
            Need a custom solution?{' '}
            <a href="#contact" className="text-jv-orange font-semibold hover:underline">
              Let's talk →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
