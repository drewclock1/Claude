import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Star, RefreshCw, Award } from 'lucide-react'

const metrics = [
  {
    icon: Users,
    value: 200,
    suffix: '+',
    label: 'Houston Businesses Served',
    desc: 'From restaurants to law firms to e-commerce brands',
    color: 'text-jv-orange',
    bg: 'bg-jv-orange-sub border-jv-orange/20',
  },
  {
    icon: TrendingUp,
    value: 340,
    suffix: '%',
    label: 'Average Follower Growth',
    desc: 'In the first 6 months of working with us',
    color: 'text-jv-teal',
    bg: 'bg-jv-teal/10 border-jv-teal/20',
  },
  {
    icon: DollarSign,
    value: 5,
    suffix: 'M+',
    label: 'Revenue Generated for Clients',
    desc: 'Tracked and attributed to our marketing efforts',
    color: 'text-jv-gold',
    bg: 'bg-jv-gold/10 border-jv-gold/20',
  },
  {
    icon: RefreshCw,
    value: 98,
    suffix: '%',
    label: 'Client Retention Rate',
    desc: 'Because results keep clients coming back month after month',
    color: 'text-jv-success',
    bg: 'bg-jv-success/10 border-jv-success/20',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '★',
    label: 'Average Google Rating',
    desc: 'Across 87 verified Google reviews',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
  },
  {
    icon: Award,
    value: 6,
    suffix: '+',
    label: 'Years in Business',
      desc: "Houston's trusted digital marketing partner since 2018",
    color: 'text-jv-purple',
    bg: 'bg-jv-purple/10 border-jv-purple/20',
  },
]

function AnimatedNumber({ value, suffix, inView }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const isDecimal = !Number.isInteger(value)
    const duration = 1800
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = isDecimal
        ? parseFloat((eased * value).toFixed(1))
        : Math.round(eased * value)
      setDisplay(current)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

function MetricCard({ metric, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = metric.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative p-6 rounded-2xl border ${metric.bg} hover:-translate-y-1 transition-transform duration-300`}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${metric.bg} mb-4`}>
        <Icon className={`w-6 h-6 ${metric.color}`} />
      </div>
      <div className={`font-display text-4xl md:text-5xl font-black mb-2 ${metric.color}`}>
        <AnimatedNumber value={metric.value} suffix={metric.suffix} inView={inView} />
      </div>
      <div className="font-display text-white font-bold text-lg mb-1">{metric.label}</div>
      <div className="text-jv-muted text-sm leading-relaxed">{metric.desc}</div>
    </motion.div>
  )
}

export default function Results() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="results" className="py-24 md:py-32 bg-jv-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label border-jv-teal/30 bg-jv-teal/10 text-jv-teal mb-6 mx-auto w-fit">
              <TrendingUp className="w-4 h-4" />
              Proven Results
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 text-balance">
              Numbers don't lie
            </h2>
            <p className="text-jv-subtle text-lg leading-relaxed">
              We measure everything and optimize constantly. Here's what we've delivered
              for Houston businesses just like yours.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Case study highlight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              industry: 'Restaurant',
              result: '200 → 8,400 followers',
              metric: '+4,100%',
              detail: 'Online bookings up 340%',
              color: 'border-jv-orange/30 bg-jv-orange-sub',
              accent: 'text-jv-orange',
            },
            {
              industry: 'E-Commerce',
              result: '1.2% → 4.8% conversion',
              metric: '+300%',
              detail: 'Avg order value increased by $47',
              color: 'border-jv-teal/30 bg-jv-teal/10',
              accent: 'text-jv-teal',
            },
            {
              industry: 'Law Firm',
              result: '0 → 14 inbound leads/mo',
              metric: 'From $0',
              detail: '3 new clients in first 60 days',
              color: 'border-jv-purple/30 bg-jv-purple/10',
              accent: 'text-jv-purple',
            },
          ].map((cs, i) => (
            <div key={cs.industry} className={`p-5 rounded-2xl border ${cs.color}`}>
              <div className={`text-xs font-bold uppercase tracking-widest ${cs.accent} mb-3`}>
                {cs.industry} Client
              </div>
              <div className="font-display text-white font-black text-xl mb-1">{cs.result}</div>
              <div className={`font-display text-3xl font-black ${cs.accent} mb-2`}>{cs.metric}</div>
              <div className="text-jv-muted text-sm">{cs.detail}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
