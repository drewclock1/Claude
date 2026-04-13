import { motion } from 'framer-motion'
import { ArrowRight, Star, TrendingUp, Users, DollarSign, CheckCircle } from 'lucide-react'

const stats = [
  { icon: Users,      value: '200+',  label: 'Clients Served'       },
  { icon: DollarSign, value: '$5M+',  label: 'Revenue Generated'    },
  { icon: TrendingUp, value: '340%',  label: 'Avg Follower Growth'  },
  { icon: Star,       value: '5.0★',  label: 'Google Rating'        },
]

const trust = [
  'No long-term contracts',
  'Results in 30 days or less',
  '100% Houston-based team',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-jv-dark flex items-center overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-jv-orange/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-jv-purple/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-jv-teal/5 blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jv-orange-sub border border-jv-orange/30 mb-8">
            <span className="w-2 h-2 bg-jv-orange rounded-full animate-pulse-slow" />
            <span className="text-jv-orange text-sm font-bold tracking-wide">
              Houston's #1 Social Media Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6 text-balance"
          >
            Turn Followers Into{' '}
            <span className="gradient-text">Paying Customers</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-lg md:text-xl text-jv-subtle max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            We help Houston businesses dominate social media, build unforgettable brand identities,
            and run email campaigns that actually convert — not just collect likes.
          </motion.p>

          {/* Trust bullets */}
          <motion.div
            {...fadeUp(0.25)}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10"
          >
            {trust.map(item => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-jv-subtle">
                <CheckCircle className="w-4 h-4 text-jv-success flex-shrink-0" />
                {item}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a href="#contact" className="btn-primary text-lg px-10 py-5 group">
              Get My Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#results" className="btn-ghost text-lg px-10 py-5">
              See Our Results
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.4)}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="relative group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-jv-orange/40 hover:bg-jv-orange/5 transition-all duration-300"
              >
                <Icon className="w-5 h-5 text-jv-orange mb-2 mx-auto" />
                <div className="font-display text-3xl md:text-4xl font-black text-white mb-1">
                  {value}
                </div>
                <div className="text-xs text-jv-muted font-medium tracking-wide uppercase">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Google Reviews badge */}
          <motion.div {...fadeUp(0.5)} className="mt-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-jv-gold fill-jv-gold" />
              ))}
            </div>
            <span className="text-sm text-jv-subtle">
              <strong className="text-white">4.9/5</strong> from 87 Google Reviews
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
