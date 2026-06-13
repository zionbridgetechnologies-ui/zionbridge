import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/ui/EnquiryForm';
import { Icons } from '@/components/ui/Icons';

export const metadata = {
  title: 'Contact Us | Zionbridge Technologies',
};

const contactInfo = [
  { icon: 'Phone', label: 'Phone', value: '+91 78930 45803', href: 'tel:+917893045803' },
  { icon: 'Enquiries', label: 'Email', value: 'zionbridgetechnologies@gmail.com', href: 'mailto:zionbridgetechnologies@gmail.com' },
  { icon: 'Location', label: 'Address', value: '123, Business Street, Corporate Park, India', href: '#' },
  { icon: 'WhatsApp', label: 'WhatsApp', value: '+91 78930 45803', href: 'https://wa.me/917893045803' },
] as const;

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">Get In Touch</div>
          <h1 className="text-4xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-blue-200 text-lg">We'd love to hear from you. Reach out for course details, placement queries or career guidance.</p>
        </div>
      </section>

      <section id="enquiry" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Let's Connect</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map(c => {
                  const IconComponent = Icons[c.icon];
                  return (
                    <a key={c.label} href={c.href} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                      <div className="w-12 h-12 bg-primary/5 group-hover:bg-gold/10 rounded-xl flex items-center justify-center text-primary group-hover:text-gold transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">{c.label}</div>
                        <div className="text-primary font-semibold">{c.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Real Google Maps Embed */}
              <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm h-64 relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8924040942475!2d80.20786967597148!3d12.97871638733671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d8000000001%3A0x82c6422b91c890ab!2sTidel%20Park%20Chennai!5e0!3m2!1sen!2sin!4v1718310000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <EnquiryForm title="Send Us a Message" subtitle="Our team responds within 24 hours on business days." />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
