import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoStrip from './components/LogoStrip'
import PainPoints from './components/PainPoints'
import Services from './components/Services'
import Results from './components/Results'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-jv-dark">
      <Navbar />

      <main>
        {/* 1. Hero — above the fold value prop + stats */}
        <Hero />

        {/* 2. Social proof — trusted by Houston businesses */}
        <LogoStrip />

        {/* 3. Pain points — problem identification */}
        <PainPoints />

        {/* 4. Services — solution presentation */}
        <Services />

        {/* 5. Results — hard numbers build credibility */}
        <Results />

        {/* 6. Process — reduces anxiety about getting started */}
        <Process />

        {/* 7. Testimonials — social proof before pricing */}
        <Testimonials />

        {/* 8. Pricing — clear packages after trust is built */}
        <Pricing />

        {/* 9. FAQ — handle objections before final CTA */}
        <FAQ />

        {/* 10. CTA + Contact — final conversion point */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
