import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Send, AlertCircle } from 'lucide-react'

const benefits = [
  'Free 30-minute strategy session',
  'Custom growth roadmap for your business',
  'No commitment required',
  'Results-focused, not vanity-metrics',
]

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({
    name: '', email: '', business: '', service: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1400))
    setStatus('success')
  }

  return (
    <>
      {/* Final CTA Banner */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-jv-orange">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-8">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-sm font-bold">Limited Spots Available This Month</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 text-balance">
              Ready to finally grow your business online?
            </h2>
            <p className="text-white/80 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              Join 200+ Houston businesses that trust JV Marketing to turn their social media into
              a real revenue channel. Your free strategy call is 30 minutes and 100% obligation-free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="#contact" className="btn-white text-lg px-10 py-5 group">
                Book My Free Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+17137777777"
                className="flex items-center gap-2 px-8 py-5 border-2 border-white/40 hover:border-white text-white font-bold text-lg rounded-xl transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                (713) 777-7777
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {benefits.map(b => (
                <div key={b} className="flex items-center gap-2 text-white/80 text-sm">
                  <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 md:py-32 bg-jv-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left col */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="section-label border-jv-orange/30 bg-jv-orange-sub text-jv-orange mb-6 w-fit">
                <Phone className="w-4 h-4" />
                Get In Touch
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
                Let's talk about your{' '}
                <span className="gradient-text">growth goals</span>
              </h2>

              <p className="text-jv-subtle text-lg leading-relaxed mb-10">
                Fill out the form and we'll reach out within 24 hours to schedule your
                free strategy call. No sales pitch — just honest advice about what will
                work for your specific business.
              </p>

              {/* Contact info */}
              <div className="space-y-5 mb-10">
                {[
                  { icon: Phone, label: 'Call or Text', value: '(713) 777-7777', href: 'tel:+17137777777' },
                  { icon: Mail, label: 'Email Us', value: 'hello@jvmarketing.co', href: 'mailto:hello@jvmarketing.co' },
                  { icon: MapPin, label: 'Based In', value: 'Houston, Texas', href: '#' },
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-jv-card border border-jv-border flex items-center justify-center group-hover:border-jv-orange/40 transition-colors">
                        <Icon className="w-5 h-5 text-jv-orange" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-jv-muted">
                          {item.label}
                        </div>
                        <div className="text-white font-semibold group-hover:text-jv-orange transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Operating hours */}
              <div className="p-5 rounded-2xl bg-jv-card border border-jv-border">
                <div className="text-xs font-bold uppercase tracking-widest text-jv-muted mb-3">
                  Office Hours
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-jv-subtle">
                    <span>Monday – Friday</span>
                    <span className="text-white font-medium">9am – 6pm CST</span>
                  </div>
                  <div className="flex justify-between text-jv-subtle">
                    <span>Saturday</span>
                    <span className="text-white font-medium">10am – 3pm CST</span>
                  </div>
                  <div className="flex justify-between text-jv-subtle">
                    <span>Sunday</span>
                    <span className="text-jv-muted">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right col — form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center p-12 rounded-3xl bg-jv-card border border-jv-success/30 min-h-[400px]">
                  <div className="w-20 h-20 rounded-full bg-jv-success/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-jv-success" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-white mb-3">
                    We'll be in touch soon!
                  </h3>
                  <p className="text-jv-subtle leading-relaxed">
                    Thanks for reaching out. A member of our team will contact you within
                    24 hours to schedule your free strategy call.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-3xl bg-jv-card border border-jv-border space-y-5"
                >
                  <div>
                    <h3 className="font-display text-2xl font-black text-white mb-1">
                      Book Your Free Strategy Call
                    </h3>
                    <p className="text-jv-muted text-sm">We respond within 24 hours on business days.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-jv-muted mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-jv-dark border border-jv-border text-white placeholder-jv-muted text-sm outline-none focus:border-jv-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-jv-muted mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@business.com"
                        className="w-full px-4 py-3 rounded-xl bg-jv-dark border border-jv-border text-white placeholder-jv-muted text-sm outline-none focus:border-jv-orange transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-jv-muted mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="business"
                      required
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Your Business Name"
                      className="w-full px-4 py-3 rounded-xl bg-jv-dark border border-jv-border text-white placeholder-jv-muted text-sm outline-none focus:border-jv-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-jv-muted mb-2">
                      I'm Interested In
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-jv-dark border border-jv-border text-white text-sm outline-none focus:border-jv-orange transition-colors"
                    >
                      <option value="">Select a service...</option>
                      <option>Social Media Management</option>
                      <option>Photography & Content</option>
                      <option>Brand Identity & Design</option>
                      <option>Email Marketing</option>
                      <option>Full Package (Multiple Services)</option>
                      <option>Not Sure Yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-jv-muted mb-2">
                      Tell Us About Your Goals
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What are you trying to achieve? What's not working right now? Any additional context..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-jv-dark border border-jv-border text-white placeholder-jv-muted text-sm outline-none focus:border-jv-orange transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-jv-orange hover:bg-jv-orange-h text-white font-bold text-base transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-jv-orange/25"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send My Request
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-jv-muted text-xs">
                    By submitting, you agree to be contacted about your inquiry. We never spam.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
