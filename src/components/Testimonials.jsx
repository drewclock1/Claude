import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'

const testimonials = [
  {
    name: 'Maria Gonzalez',
    role: 'Owner, Bella Vista Restaurant',
    industry: 'Restaurant',
    avatar: 'MG',
    rating: 5,
    color: 'bg-jv-orange',
    quote: "JV Marketing completely transformed our Instagram. We went from 200 followers to over 8,400 in 6 months — and more importantly, our online reservations increased by 340%. The ROI has been insane. I wish I'd hired them years ago.",
    result: '+340% online bookings',
    platform: 'Instagram & Facebook',
  },
  {
    name: 'James Thompson',
    role: 'Founder, CloudFit Studio',
    industry: 'Fitness',
    avatar: 'JT',
    rating: 5,
    color: 'bg-jv-teal',
    quote: 'The photography and content creation alone was worth every penny. Our products finally look as good as they are. Our website conversion rate went from 1.2% to 4.8%, and our Instagram brings in 3-5 new members per week organically.',
    result: '1.2% → 4.8% conversion rate',
    platform: 'Instagram & Website',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Managing Partner, Mitchell Legal Group',
    industry: 'Law Firm',
    avatar: 'SM',
    rating: 5,
    color: 'bg-jv-purple',
    quote: 'We were completely skeptical about social media for a law firm. JV Marketing proved us wrong. Within 4 months, we had 14 inbound leads per month from LinkedIn and Instagram — including 3 major corporate clients we closed.',
    result: '0 → 14 inbound leads/month',
    platform: 'LinkedIn & Instagram',
  },
  {
    name: 'Carlos Rivera',
    role: 'Owner, Houston Roofing Pros',
    industry: 'Home Services',
    avatar: 'CR',
    rating: 5,
    color: 'bg-jv-gold',
    quote: "Before JV Marketing, I was paying $3,000/month on Google Ads with mixed results. Now our social media brings in more leads for half the cost. The email campaigns alone generated $47,000 in a single promotion. Best investment I've made.",
    result: '$47K from one email campaign',
    platform: 'Facebook & Email',
  },
  {
    name: 'Ashley Park',
    role: 'CEO, Luxe Med Spa',
    industry: 'Med Spa',
    avatar: 'AP',
    rating: 5,
    color: 'bg-pink-500',
    quote: 'The branding work JV Marketing did completely elevated how people perceive us. We increased our prices by 30% and actually got MORE bookings because we look so premium now. Our social has 12,000 followers and grows every month.',
    result: '+30% price increase, more bookings',
    platform: 'Instagram & TikTok',
  },
  {
    name: 'David Chen',
    role: 'Owner, Anchor Brewing Co.',
    industry: 'Food & Beverage',
    avatar: 'DC',
    rating: 5,
    color: 'bg-amber-600',
    quote: "We opened 6 months ago and were struggling with awareness. JV Marketing built our entire brand, social presence, and email list from scratch. We're now consistently at 85% capacity on weekends. Couldn't have done this without them.",
    result: '85% capacity from day 60',
    platform: 'Instagram, Facebook & Email',
  },
]

function TestimonialCard({ t, active }) {
  return (
    <div
      className={`relative p-8 rounded-3xl bg-white border border-gray-100 shadow-xl transition-all duration-500 ${
        active ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}
    >
      <Quote className="w-10 h-10 text-gray-100 absolute top-6 right-6" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-jv-gold fill-jv-gold" />
        ))}
      </div>

      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
        "{t.quote}"
      </blockquote>

      {/* Result badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 mb-6">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-green-700 text-sm font-bold">{t.result}</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center`}>
          <span className="text-white font-black text-sm">{t.avatar}</span>
        </div>
        <div>
          <div className="font-display font-black text-jv-dark">{t.name}</div>
          <div className="text-gray-400 text-sm">{t.role}</div>
        </div>
        <div className="ml-auto">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
            <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">{t.platform}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(c => (c + 1) % testimonials.length)

  return (
    <section className="py-24 md:py-32 bg-jv-light-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label border-jv-gold/30 bg-jv-gold/10 text-jv-gold mb-6 mx-auto w-fit">
              <Star className="w-4 h-4 fill-jv-gold" />
              Client Stories
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-jv-dark mb-6 text-balance">
              Don't take our word for it
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Real results from real Houston businesses. These are specific outcomes
              from clients who trusted us to grow their brands.
            </p>
          </motion.div>
        </div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="relative min-h-[320px]">
            {testimonials.map((t, i) => (
              <div key={i} className={`absolute inset-0 transition-all duration-500 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <TestimonialCard t={t} active={i === current} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-jv-orange hover:text-jv-orange flex items-center justify-center transition-all duration-200 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 h-2.5 bg-jv-orange'
                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-jv-orange hover:text-jv-orange flex items-center justify-center transition-all duration-200 shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mini testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setCurrent(i)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                current === i
                  ? 'border-jv-orange/40 bg-jv-orange-sub'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center`}>
                  <span className="text-white font-black text-xs">{t.avatar}</span>
                </div>
                <div>
                  <div className="font-bold text-jv-dark text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.industry}</div>
                </div>
              </div>
              <div className="text-xs text-green-600 font-bold">{t.result}</div>
            </motion.button>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-jv-gold fill-jv-gold" />
              ))}
            </div>
            <span>4.9/5 average across <strong className="text-gray-600">87 Google Reviews</strong></span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
