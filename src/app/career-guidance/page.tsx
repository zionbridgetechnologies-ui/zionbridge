import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/ui/EnquiryForm';
import { Icons } from '@/components/ui/Icons';
import CareerPathEstimator from '@/components/ui/CareerPathEstimator';

export const metadata = {
  title: 'Free Career Guidance | Zionbridge Technologies',
};

const features = [
  { iconKey: 'Excellence', title: 'Personalized Counseling', desc: 'One-on-one session with our career experts to understand your goals.' },
  { iconKey: 'CareerGuidance', title: 'Career Roadmap', desc: 'Get a clear roadmap of the skills and courses needed for your dream job.' },
  { iconKey: 'Briefcase', title: 'Industry Insights', desc: 'Understand current market demands and which skills are most valuable.' },
  { iconKey: 'Dashboard', title: 'Salary Benchmarks', desc: 'Know what to expect in terms of salary for your target role and experience.' },
  { iconKey: 'PlacementSupport', title: 'Placement Connect', desc: 'Get connected with our hiring partners for direct placement opportunities.' },
  { iconKey: 'Certifications', title: 'Certification Guidance', desc: 'Know which certifications add the most value to your profile.' },
];

export default function CareerGuidancePage() {
  return (
    <>
      <Navbar />
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">100% Free</div>
          <h1 className="text-4xl font-black text-white mb-4">Free Career Guidance</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Get personalized career counseling from our industry experts. No cost, no obligation — just pure guidance to launch your career.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-subtitle mb-3">What You'll Get</div>
              <h2 className="section-title mb-8">Your Career, Our Priority</h2>
              <div className="grid grid-cols-1 gap-4">
                {features.map((f, i) => {
                  const Icon = Icons[f.iconKey as keyof typeof Icons];
                  return (
                    <div key={i} className="flex gap-4 items-start p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-11 h-11 bg-primary/5 text-primary rounded-xl flex items-center justify-center shrink-0">
                        {Icon && <Icon className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-1">{f.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <EnquiryForm type="career-guidance" title="Book Your Free Session" subtitle="Fill the form and our counselor will call you within 24 hours." />
          </div>
        </div>
      </section>

      {/* Interactive Career Path Estimator Widget */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <CareerPathEstimator />
        </div>
      </section>

      <Footer />
    </>
  );
}
