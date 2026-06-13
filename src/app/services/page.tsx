import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/ui/EnquiryForm';
import { Icons } from '@/components/ui/Icons';

export const metadata = {
  title: 'Services | Zionbridge Technologies',
};

const services = [
  {
    id: 'hr-recruitment',
    iconKey: 'HRRecruitment',
    title: 'HR Recruitment & Staffing',
    desc: 'End-to-end recruitment solutions for companies of all sizes.',
    features: ['IT Hiring', 'Non-IT Hiring', 'Bulk Hiring', 'Campus Hiring', 'Staffing Solutions', 'Manpower Services'],
  },
  {
    id: 'internship',
    iconKey: 'Internship',
    title: 'Internship Programs',
    desc: 'Real-time internships with certification and placement support.',
    features: ['Live Projects', 'Industry Mentorship', 'Certification', 'Placement Support', 'Flexible Duration'],
  },
  {
    id: 'it-services',
    iconKey: 'ITServices',
    title: 'IT Services & Consultancy',
    desc: 'Custom IT solutions and technical consulting for your business.',
    features: ['Networking Solutions', 'Technical Support', 'IT Consultancy', 'System Administration', 'Cloud Solutions'],
  },
  {
    id: 'digital-marketing',
    iconKey: 'DigitalMarketing',
    title: 'Digital Marketing',
    desc: 'Full-spectrum digital marketing to grow your brand online.',
    features: ['SEO Optimization', 'Social Media Marketing', 'Branding', 'Content Marketing', 'Google Ads', 'Email Marketing'],
  },
  {
    id: 'creative',
    iconKey: 'CreativeServices',
    title: 'Creative Services',
    desc: 'Professional design services for your brand identity.',
    features: ['Logo Design', 'Thumbnail Design', 'Graphic Design', 'Brand Identity', 'Social Media Creatives', 'Brochures'],
  },
  {
    id: 'photography',
    iconKey: 'Photography',
    title: 'Photography Services',
    desc: 'Professional photography for all occasions and events.',
    features: ['Wedding Photography', 'Birthday Photography', 'Model Shoots', 'Corporate Photography', 'Event Coverage', 'Product Photography'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">What We Offer</div>
          <h1 className="text-4xl font-black text-white mb-4">Our Services</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Beyond training and placement, we offer a comprehensive range of services to help individuals and businesses grow.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(s => {
              const Icon = Icons[s.iconKey as keyof typeof Icons];
              return (
                <div key={s.id} id={s.id} className="card p-8 group flex flex-col justify-between h-full">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-gold/10 flex items-center justify-center text-primary group-hover:text-gold mb-5 transition-colors">
                      {Icon && <Icon className="w-7 h-7" />}
                    </div>
                    <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-gold transition-colors">{s.title}</h2>
                    <p className="text-gray-500 text-sm mb-5 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="#enquiry" className="btn-outline-gold mt-6 text-sm inline-flex justify-center w-full">Get Started →</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="enquiry" className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary">Request a Service</h2>
            <p className="text-gray-500 mt-2">Tell us your requirements and we'll get back to you with a quote.</p>
          </div>
          <EnquiryForm type="general" title="" subtitle="" />
        </div>
      </section>
      <Footer />
    </>
  );
}
