import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import EnquiryForm from '@/components/ui/EnquiryForm';

export const metadata = {
  title: 'Placements | Zionbridge Technologies',
};

const process = [
  { step: '01', icon: '📚', title: 'Industry Training', desc: 'Get trained by experts with real-world curriculum tailored to industry needs.' },
  { step: '02', icon: '🖥️', title: 'Live Projects', desc: 'Work on actual client projects to build a strong portfolio and hands-on experience.' },
  { step: '03', icon: '📄', title: 'Resume Building', desc: 'Professional resume crafted by our HR experts to highlight your strengths.' },
  { step: '04', icon: '🎤', title: 'Mock Interviews', desc: 'Face technical and HR mock interviews with detailed feedback sessions.' },
  { step: '05', icon: '🤝', title: 'Placement Drive', desc: 'Get referred to our 250+ hiring partner companies for direct placement.' },
];

const stats = [
  { value: '15K+', label: 'Students Placed' },
  { value: '250+', label: 'Hiring Partners' },
  { value: '95%', label: 'Placement Rate' },
  { value: '6-15 LPA', label: 'Average Package' },
];

const partners = ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'Accenture', 'Cognizant', 'Capgemini', 'IBM', 'L&T', 'Hexaware', 'Mphasis'];

export default function PlacementsPage() {
  return (
    <>
      <Navbar />
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">100% Placement Assistance</div>
          <h1 className="text-4xl font-black text-white mb-4">Our Placement Program</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">From training to job offer — we support you at every step of your placement journey.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black text-primary">{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-subtitle mb-2">Step by Step</div>
            <h2 className="section-title">Our Placement Process</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {process.map((p, i) => (
              <div key={i} className="card p-6 text-center relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary font-black text-xs">{p.step}</div>
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-primary mb-2 text-sm">{p.title}</h3>
                <p className="text-gray-500 text-xs">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Partners */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="section-subtitle mb-2">Hiring Partners</div>
            <h2 className="text-2xl font-bold text-primary">Companies Hiring Our Talent</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map(p => (
              <div key={p} className="bg-gray-50 hover:bg-primary hover:text-white rounded-xl px-6 py-3 font-bold text-gray-700 transition-all duration-300 text-sm cursor-default">{p}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary">Apply for Placement</h2>
            <p className="text-gray-500 mt-2">Get enrolled in our placement program and land your dream job.</p>
          </div>
          <EnquiryForm type="placement" />
        </div>
      </section>
      <Footer />
    </>
  );
}
