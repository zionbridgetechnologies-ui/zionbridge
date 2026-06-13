import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/ui/EnquiryForm';

export const metadata = {
  title: 'Contact Us | Zionbridge Technologies',
};

const contactInfo = [
  { icon: '📞', label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: '📧', label: 'Email', value: 'info@zionbridgetechnologies.com', href: 'mailto:info@zionbridgetechnologies.com' },
  { icon: '📍', label: 'Address', value: '123, Business Street, Corporate Park, India', href: '#' },
  { icon: '💬', label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210' },
];

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
                {contactInfo.map(c => (
                  <a key={c.label} href={c.href} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 bg-primary/5 group-hover:bg-gold/10 rounded-xl flex items-center justify-center text-2xl transition-colors">{c.icon}</div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">{c.label}</div>
                      <div className="text-primary font-semibold">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🗺️</div>
                  <div className="font-medium">Google Maps</div>
                  <div className="text-sm">123 Business Street, Corporate Park</div>
                </div>
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
