import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, FileText, Rocket, BarChart2, ArrowRight } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Phone,
    title: 'Free Discovery Call',
    subtitle: '30 minutes · No commitment · No sales pressure',
    desc: "We start with a free 30-minute call to learn about your business, your goals, your ideal customer, and what's not working right now. You'll walk away with actionable insights regardless of whether we work together.",
    tag: 'Start here',
    color: 'text-jv-orange',
    bg: 'bg-jv-orange-sub border-jv-orange/30',
    line: 'bg-jv-orange',
  },
  {
    num: '02',
    icon: FileText,
    title: 'Custom Strategy',
    subtitle: 'Delivered within 5 business days',
    desc: 'We build a tailored marketing roadmap specific to your industry, competitors, and growth goals — complete with platform recommendations, content pillars, posting schedule, and clear KPIs to hit.',
    tag: 'Your blueprint',
    color: 'text-jv-teal',
    bg: 'bg-jv-teal/10 border-jv-teal/30',
    line: 'bg-jv-teal',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Launch & Execute',
    subtitle: 'We handle everything end-to-end',
    desc: 'Our team creates, schedules, publishes, and manages all of your content while you focus on your business. No micromanaging needed — you approve the monthly plan and we run with it.',
    tag: 'We do the work',
    color: 'text-jv-purple',
    bg: 'bg-jv-purple/10 border-jv-purple/30',
    line: 'bg-jv-purple',
  },
  {
    num: '04',
    icon: BarChart2,
    title: 'Optimize & Scale',
    subtitle: 'Monthly reviews · Continuous improvement',
    desc: "Every month we review what's working, what isn't, and double down on what drives results. As your business grows, we scale our strategy to match — keeping you ahead of the competition.",
    tag: 'Grow month over month',
    color: 'text-jv-gold',
    bg: 'bg-jv-gold/10 border-jv-gold/30',
    line: 'bg-jv-gold',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="py-24 md:py-32 bg-jv-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label border-jv-purple/30 bg-jv-purple/10 text-jv-purple mb-6 mx-auto w-fit">
              <Rocket className="w-4 h-4" />
              How It Works
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-jv-dark mb-6 text-balance">
              From zero to results in{' '}
              <span className="gradient-text">30 days</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We've refined our onboarding process so you start seeing results fast.
              Here's exactly what happens when you partner with JV Marketing.
            </p>
          </motion.div>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-jv-orange via-jv-teal to-jv-gold"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Circle */}
                    <div className={`relative z-10 w-16 h-16 rounded-2xl border-2 ${step.bg} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className={`w-7 h-7 ${step.color}`} />
                    </div>

                    <div className={`text-xs font-bold uppercase tracking-widest ${step.color} mb-2`}>
                      {step.tag}
                    </div>
                    <div className="text-4xl font-black text-gray-100 font-display absolute -top-2 right-4 select-none">
                      {step.num}
                    </div>
                    <h3 className="font-display font-black text-jv-dark text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className={`text-xs font-semibold ${step.color} mb-3`}>{step.subtitle}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile steps */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl border ${step.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${step.color} mb-1`}>
                    Step {step.num}
                  </div>
                  <h3 className="font-display font-black text-jv-dark text-base mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-6 text-lg">
            Ready to get started? Step 1 is free and takes 30 minutes.
          </p>
          <a href="#contact" className="btn-primary inline-flex text-lg">
            Book My Free Discovery Call
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
