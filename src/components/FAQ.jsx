import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How quickly will I see results?',
    a: "Most clients see measurable engagement improvements within the first 30 days. Significant follower growth and lead generation typically takes 60–90 days as the algorithm rewards consistency. We guarantee you'll see progress in month one — or we refund it.",
  },
  {
    q: 'Do I need to provide content or be involved daily?',
    a: "Not at all. We handle 100% of content creation — strategy, graphics, copywriting, and scheduling. You'll get a monthly content calendar to review and approve, which takes about 15–20 minutes. Beyond that, you can be as hands-off as you want.",
  },
  {
    q: 'What social media platforms do you manage?',
    a: 'We specialize in Instagram, Facebook, TikTok, LinkedIn, Twitter/X, and Pinterest. Most clients start with 1–3 platforms depending on their industry and target audience. We recommend starting where your customers already spend time.',
  },
  {
    q: 'What makes you different from other Houston agencies?',
    a: 'Three things: (1) We\'re Houston-based and understand the local market. (2) We focus on revenue-generating results, not vanity metrics — followers mean nothing if they\'re not buying. (3) We have a 98% retention rate because we don\'t sell and disappear — we\'re real partners in your growth.',
  },
  {
    q: 'Do you work with businesses outside Houston?',
    a: 'Yes. While we\'re proudly Houston-based, we work with clients across Texas and nationally. Our social media management is entirely remote. For photography, we primarily serve the Houston metro area — Austin and DFW available at additional cost.',
  },
  {
    q: 'Can I cancel my contract anytime?',
    a: 'Yes. All plans require just 30 days notice to cancel — no early termination fees, no locked-in contracts. We believe we should earn your business every single month, and our 98% retention rate shows we do.',
  },
  {
    q: 'What if I already have a social media presence?',
    a: 'Great — we\'ll audit your existing accounts, identify what\'s working and what isn\'t, and build from there. You don\'t have to start from scratch. We can take over existing accounts and dramatically improve performance.',
  },
  {
    q: 'How do you measure and report results?',
    a: 'You\'ll receive detailed monthly reports covering follower growth, engagement rate, reach, website traffic from social, lead generation, and any ad performance. Growth and Scale plans include weekly reporting. We connect everything to real business outcomes — not just likes.',
  },
  {
    q: 'What industries do you specialize in?',
    a: 'We\'ve worked across 40+ industries including restaurants, real estate, law firms, medical practices, fitness studios, retail, e-commerce, contractors, and professional services. We tailor every strategy to your specific industry and audience.',
  },
  {
    q: 'Is the free strategy call really free?',
    a: 'Yes, completely free with no obligation. It\'s a 30-minute Zoom call where we analyze your current situation, identify your biggest opportunities, and map out what a results-driven strategy would look like for your business. You walk away with value regardless.',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? 'border-jv-orange/40 bg-white shadow-lg' : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className={`font-display font-bold text-base leading-snug transition-colors ${open ? 'text-jv-orange' : 'text-jv-dark'}`}>
          {faq.q}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-jv-orange text-white rotate-0' : 'bg-gray-100 text-gray-400'
        }`}>
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 bg-jv-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label border-jv-teal/30 bg-jv-teal/10 text-jv-teal mb-6 mx-auto w-fit">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 text-balance">
              Questions we get all the time
            </h2>
            <p className="text-jv-subtle text-lg leading-relaxed">
              Everything you need to know before getting started.
              Don't see your question?{' '}
              <a href="#contact" className="text-jv-orange hover:underline font-semibold">
                Just ask us directly.
              </a>
            </p>
          </motion.div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
