import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CoursesSection from '@/components/sections/CoursesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import LeadCaptureModal from '@/components/ui/LeadCaptureModal';
import EnquiryForm from '@/components/ui/EnquiryForm';
import Link from 'next/link';
import { motion } from 'framer-motion';

const whyChoose = [
  { icon: '🎓', title: 'Expert Trainers', desc: 'Learn from industry professionals with 10+ years real-world experience.' },
  { icon: '💼', title: 'Real-Time Experience', desc: 'Work on live projects and real-time scenarios from day one.' },
  { icon: '🎤', title: 'Mock Interviews', desc: 'Technical & HR interview preparation with industry experts.' },
  { icon: '🤝', title: 'Placement Support', desc: '100% placement assistance with dedicated placement cell.' },
  { icon: '🧭', title: 'Career Guidance', desc: 'Personalized career counseling to align your goals.' },
  { icon: '📜', title: 'Certifications', desc: 'Industry-recognized certifications upon course completion.' },
];

const services = [
  { icon: '👥', title: 'HR Recruitment', desc: 'End-to-end recruitment solutions for companies of all sizes.', href: '/services#hr-recruitment' },
  { icon: '🏢', title: 'Internship Programs', desc: 'Real-time internships with certification and placement support.', href: '/services#internship' },
  { icon: '💻', title: 'IT Services & Consultancy', desc: 'Custom IT solutions for your business growth.', href: '/services#it-services' },
  { icon: '📱', title: 'Digital Marketing', desc: 'SEO, SMM, branding & digital growth strategies.', href: '/services#digital-marketing' },
  { icon: '🎨', title: 'Creative Services', desc: 'Logo design, thumbnails, graphics & branding.', href: '/services#creative' },
  { icon: '📸', title: 'Photography Services', desc: 'Weddings, events, birthdays, model & corporate shoots.', href: '/services#photography' },
];

const placementSteps = [
  { step: '01', icon: '📚', title: 'Training', desc: 'Industry expert training' },
  { step: '02', icon: '🖥️', title: 'Real-Time Experience', desc: 'Hands-on live projects' },
  { step: '03', icon: '📄', title: 'Resume Building', desc: 'Professional resume preparation' },
  { step: '04', icon: '🎤', title: 'Mock Interviews', desc: 'Technical & HR interviews' },
  { step: '05', icon: '🤝', title: 'Placement Support', desc: '100% placement assistance' },
];

const partners = ['Tata', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'Accenture', 'Cognizant', 'Capgemini'];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <LeadCaptureModal />

      <HeroSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="section-subtitle mb-2">Why Choose Us</div>
            <h2 className="section-title">Why Zionbridge Technologies?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="card p-6 flex gap-4 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-gold/10 flex items-center justify-center text-2xl shrink-0 transition-colors">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoursesSection limit={8} />

      {/* Placement Process */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-2">Our Placement Process</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">We Guide You At Every Step</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {placementSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gold/50 bg-white/10 flex items-center justify-center text-2xl mb-2 mx-auto">{step.icon}</div>
                  <div className="text-gold font-bold text-sm">{step.title}</div>
                  <div className="text-blue-200 text-xs mt-0.5">{step.desc}</div>
                </div>
                {i < placementSteps.length - 1 && <div className="hidden md:block text-gold text-2xl font-light rotate-0">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Training — Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="section-subtitle mb-2">Our Services</div>
            <h2 className="section-title">Beyond Training — We Provide More</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card p-6 group">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-primary mb-2 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
                <Link href={s.href} className="text-gold text-sm font-semibold hover:underline">Read More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Partners */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="section-subtitle mb-2">Our Recruitment Partners</div>
            <h2 className="text-2xl font-bold text-primary">Top Companies Hiring Our Talent</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map(p => (
              <div key={p} className="bg-gray-50 hover:bg-primary hover:text-white rounded-xl px-8 py-4 font-bold text-gray-700 transition-all duration-300 cursor-default text-sm">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA Section */}
      <section id="enquiry" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-subtitle mb-3">Start Today</div>
              <h2 className="section-title mb-4">Ready to Launch Your Dream Career?</h2>
              <p className="text-gray-600 mb-6">Get personalized career counseling and find the right training program for your goals. Our experts will guide you every step of the way.</p>
              <div className="space-y-3">
                {['100% Placement Assistance', 'Industry Expert Trainers', 'Real-Time Project Experience', 'Mock Interviews & Resume Building', 'Flexible Batch Timings'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <a href="https://wa.me/919876543210" target="_blank" className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                  💬 WhatsApp
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors">
                  📞 Call Now
                </a>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
