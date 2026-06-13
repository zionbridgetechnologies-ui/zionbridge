import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/ui/EnquiryForm';
import { Icons } from '@/components/ui/Icons';

export const metadata = {
  title: 'About Us | Zionbridge Technologies',
};

const values = [
  { iconKey: 'Excellence', title: 'Excellence', desc: 'We deliver world-class training and career support with highest quality standards.' },
  { iconKey: 'Integrity', title: 'Integrity', desc: 'We build trust through honest guidance and transparent processes.' },
  { iconKey: 'Innovation', title: 'Innovation', desc: 'We continuously update our curriculum to stay ahead of industry trends.' },
  { iconKey: 'StudentFirst', title: 'Student First', desc: 'Every decision we make is focused on student success and career growth.' },
];

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & CEO', exp: '15+ years in IT & Education' },
  { name: 'Priya Sharma', role: 'Head of Placements', exp: '10+ years in HR & Recruitment' },
  { name: 'Arun Patel', role: 'Lead Trainer – Networking', exp: 'CCNP, CCIE Certified' },
  { name: 'Sneha Nair', role: 'Career Counselor', exp: 'Placed 5000+ students' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">Our Story</div>
          <h1 className="text-4xl font-black text-white mb-4">About Zionbridge Technologies</h1>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">A premium training and placement company committed to transforming careers through industry-expert education and real-world opportunities.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-subtitle mb-3">Our Mission</div>
              <h2 className="section-title mb-4">Bridging the Gap Between Education & Employment</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">Zionbridge Technologies was founded with a single mission: to bridge the gap between education and employment. We believe every student deserves access to quality training and real placement opportunities.</p>
              <p className="text-gray-600 mb-6 leading-relaxed">With 10+ years of experience, we've trained 25,000+ students and placed 15,000+ candidates in top companies across India. Our industry-expert trainers, hands-on curriculum, and dedicated placement cell make us the most trusted training & placement company.</p>
              <div className="grid grid-cols-3 gap-4">
                {[['25K+', 'Students Trained'], ['15K+', 'Placed'], ['250+', 'Hiring Partners']].map(([v, l]) => (
                  <div key={l} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-black text-primary">{v}</div>
                    <div className="text-xs text-gray-500 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-hero-gradient rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-6 text-gold">Why We're Different</h3>
              <ul className="space-y-4">
                {['Industry-expert trainers with real working experience', '100% placement assistance with dedicated placement cell', 'Real-time projects from day one of training', 'Mock interviews with top HR professionals', 'Flexible batch timings for working professionals', 'Industry-recognized certifications upon completion'].map(p => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="text-gold font-bold mt-0.5">✓</span>
                    <span className="text-blue-100 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-subtitle mb-2">Our Core Values</div>
            <h2 className="section-title">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = Icons[v.iconKey as keyof typeof Icons];
              return (
                <div key={i} className="card p-6 text-center group flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 group-hover:bg-gold/10 flex items-center justify-center text-primary group-hover:text-gold mb-4 transition-transform shrink-0 duration-300 group-hover:scale-105">
                    {Icon && <Icon className="w-8 h-8" />}
                  </div>
                  <h3 className="font-bold text-primary mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-subtitle mb-2">Meet the Team</div>
            <h2 className="section-title">Expert Team Behind Your Success</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">{m.name[0]}</div>
                <h3 className="font-bold text-primary">{m.name}</h3>
                <div className="text-gold text-sm font-medium mt-1">{m.role}</div>
                <div className="text-gray-500 text-xs mt-2">{m.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary">Get in Touch</h2>
            <p className="text-gray-500 mt-2">Have questions? We're here to help you get started.</p>
          </div>
          <EnquiryForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
