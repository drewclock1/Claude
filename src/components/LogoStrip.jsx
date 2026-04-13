import { motion } from 'framer-motion'

const clients = [
  'Bella Vista Restaurant',
  'Houston Roofing Pros',
  'CloudFit Studio',
  'Rosewood Realty',
  'Peak Performance Gym',
  'Luxe Med Spa',
  'Anchor Brewing Co.',
  'Bloom Floral Design',
  'TechStart Houston',
  'Gulf Coast Dental',
  'Prestige Auto Group',
  'Urban Eats Kitchen',
]

export default function LogoStrip() {
  const repeated = [...clients, ...clients]

  return (
    <section className="bg-jv-card border-y border-jv-border py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-jv-muted">
          Trusted by 200+ Houston businesses
        </p>
      </div>

      <div className="marquee-wrapper relative flex overflow-hidden gap-0">
        {/* First set */}
        <div className="flex animate-marquee whitespace-nowrap gap-0 shrink-0">
          {repeated.map((name, i) => (
            <div
              key={`a-${i}`}
              className="flex items-center shrink-0 px-8 border-r border-jv-border"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-jv-orange/20 border border-jv-orange/30 flex items-center justify-center">
                  <span className="text-jv-orange text-xs font-black">
                    {name.charAt(0)}
                  </span>
                </div>
                <span className="text-jv-subtle text-sm font-semibold whitespace-nowrap">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="flex animate-marquee whitespace-nowrap gap-0 shrink-0" aria-hidden="true">
          {repeated.map((name, i) => (
            <div
              key={`b-${i}`}
              className="flex items-center shrink-0 px-8 border-r border-jv-border"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-jv-orange/20 border border-jv-orange/30 flex items-center justify-center">
                  <span className="text-jv-orange text-xs font-black">
                    {name.charAt(0)}
                  </span>
                </div>
                <span className="text-jv-subtle text-sm font-semibold whitespace-nowrap">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
