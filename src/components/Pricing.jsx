import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, X, ArrowRight, Zap, Shield, Phone } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    tagline: 'Perfect for getting started',
    price: 997,
    badge: '',
    color: 'border-gray-200',
    accentColor: 'text-jv-orange',
    btnClass: 'bg-gray-900 hover:bg-gray-800 text-white',
    features: [
      { text: '1 social media platform', included: true },
      { text: '12 posts per month', included: true },
      { text: 'Custom graphics & copywriting', included: true },
      { text: 'Monthly analytics report', included: true },
      { text: 'Community management (3x/week)', included: true },
      { text: 'Email support (48hr response)', included: true },
      { text: 'Photography session', included: false },
      { text: 'Email marketing', included: false },
      { text: 'Brand identity work', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'Monthly strategy calls', included: false },
    ],
  },
  {
    name: 'Growth',
    tagline: 'For businesses ready to scale',
    price: 1997,
    badge: 'Most Popular',
    color: 'border-jv-orange shadow-2xl shadow-jv-orange/20 ring-2 ring-jv-orange scale-105',
    accentColor: 'text-jv-orange',
    btnClass: 'bg-jv-orange hover:bg-jv-orange-h text-white',
    features: [
      { text: '3 social media platforms', included: true },
      { text: '30 posts per month', included: true },
      { text: 'Custom graphics & copywriting', included: true },
      { text: 'Weekly analytics reports', included: true },
      { text: 'Daily community management', included: true },
      { text: 'Priority support (24hr response)', included: true },
      { text: '2-hour photography session/month', included: true },
      { text: 'Email marketing (2 campaigns/mo)', included: true },
      { text: 'Brand identity consultation', included: true },
      { text: 'Dedicated account manager', included: false },
      { text: 'Monthly strategy calls', included: false },
    ],
  },
  {
    name: 'Scale',
    tagline: 'Maximum results for ambitious brands',
    price: 3497,
    badge: 'Best ROI',
    color: 'border-jv-purple/40',
    accentColor: 'text-jv-purple',
    btnClass: 'bg-jv-purple hover:bg-violet-600 text-white',
    features: [
      { text: 'All social media platforms', included: true },
      { text: 'Daily posting + Reels & TikTok', included: true },
      { text: 'Premium graphics, video & copy', included: true },
      { text: 'Real-time analytics dashboard', included: true },
      { text: '24/7 community management', included: true },
      { text: 'Dedicated Slack channel', included: true },
      { text: 'Full monthly photography & video', included: true },
      { text: 'Complete email marketing management', included: true },
      { text: 'Full brand identity & design', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Weekly strategy calls', included: true },
    ],
  },
]

function PricingCard({ plan, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`relative flex flex-col rounded-3xl border bg-white p-8 ${plan.color} transition-all duration-300`}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full bg-jv-orange text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-jv-orange/30">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <h3 className="font-display text-2xl font-black text-jv-dark mb-1">{plan.name}</h3>
        <p className="text-gray-400 text-sm">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-gray-400 text-lg font-semibold">$</span>
          <span className="font-display text-5xl font-black text-jv-dark">
            {plan.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-base">/mo</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Billed monthly · Cancel anytime</p>
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm mb-8 transition-all duration-200 hover:scale-[1.02] ${plan.btnClass}`}
      >
        Get Started with {plan.name}
        <ArrowRight className="w-4 h-4" />
      </a>

      {/* Features */}
      <div className="space-y-3 flex-1">
        {plan.features.map(feature => (
          <div key={feature.text} className={`flex items-start gap-3 ${!feature.included ? 'opacity-40' : ''}`}>
            {feature.included ? (
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.accentColor}`} />
            ) : (
              <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-300" />
            )}
            <span className="text-sm text-gray-600">{feature.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-24 md:py-32 bg-jv-light-bg">
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
              Simple Pricing
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-jv-dark mb-6 text-balance">
              Transparent pricing,{' '}
              <span className="gradient-text">zero surprises</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              No long-term contracts. No setup fees. No hidden costs.
              Cancel anytime — though you won't want to.
            </p>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start md:items-center mb-16">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: Shield,
              title: '30-Day Guarantee',
              desc: 'See measurable progress in the first 30 days or we\'ll refund your first month — no questions asked.',
            },
            {
              icon: X,
              title: 'No Long-Term Contracts',
              desc: 'Cancel anytime with 30 days notice. We earn your business every month with results, not contracts.',
            },
            {
              icon: Phone,
              title: 'Free Strategy Call First',
              desc: 'Before you pay anything, we\'ll map out your custom strategy on a free 30-minute call.',
            },
          ].map(item => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-jv-orange-sub border border-jv-orange/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-jv-orange" />
                </div>
                <div>
                  <div className="font-bold text-jv-dark text-sm mb-1">{item.title}</div>
                  <div className="text-gray-400 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            Need something custom?{' '}
            <a href="#contact" className="text-jv-orange font-semibold hover:underline">
              Let's build a package for you →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
