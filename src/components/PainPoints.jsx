import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { XCircle, ArrowRight } from 'lucide-react'

const pains = [
  {
    title: 'Posting constantly but getting zero engagement',
    desc: "You spend hours creating content and barely get a handful of likes. Nobody's buying.",
  },
  {
    title: 'Watching competitors blow up while you stay stuck',
    desc: "Similar businesses are growing fast online. You can't figure out what they're doing differently.",
  },
  {
    title: 'No time to manage social media AND run your business',
    desc: 'Between operations, customers, and employees, social media always falls to the bottom of the list.',
  },
  {
    title: 'Your brand looks inconsistent and unprofessional',
    desc: 'Mismatched logos, random fonts, and DIY graphics are costing you credibility and customers.',
  },
  {
    title: 'Running ads that drain your budget with no results',
    desc: "You've tried boosting posts and running campaigns. The money disappears and nothing shows for it.",
  },
  {
    title: "Can't convert followers into actual paying clients",
    desc: "You have an audience but they're not buying. Your DMs aren't turning into dollars.",
  },
]

function PainCard({ pain, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-6 rounded-2xl bg-jv-card border border-jv-border hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
    >
      <div className="flex gap-4">
        <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
        <div>
          <h3 className="font-display font-bold text-white mb-2 text-base leading-tight">
            "{pain.title}"
          </h3>
          <p className="text-jv-muted text-sm leading-relaxed">{pain.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function PainPoints() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 bg-jv-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label border-red-500/30 bg-red-500/10 text-red-400 mb-6 mx-auto w-fit">
              <XCircle className="w-4 h-4" />
              Sound familiar?
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 text-balance">
              Most businesses are stuck in the same trap
            </h2>
            <p className="text-jv-subtle text-lg leading-relaxed">
              You're working harder than ever on your marketing, but results are nowhere to be found.
              You're not alone — and it's not your fault.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {pains.map((pain, i) => (
            <PainCard key={pain.title} pain={pain} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-jv-subtle text-lg">
              We've solved these exact problems for{' '}
              <strong className="text-white">200+ Houston businesses.</strong>
            </p>
            <a href="#services" className="btn-primary">
              See How We Do It
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
