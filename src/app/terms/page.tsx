import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Zionbridge Technologies',
  description: 'Terms and Conditions for using Zionbridge Technologies website and services.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing and using the Zionbridge Technologies website and services, you accept and agree to be bound by these Terms and Conditions.',
      'If you do not agree to these terms, please do not use our website or services.',
      'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes your acceptance of the new terms.',
    ],
  },
  {
    title: '2. Services Description',
    content: [
      'Zionbridge Technologies provides professional IT training, placement assistance, HR recruitment, IT consultancy, digital marketing, creative services, and photography services.',
      'We reserve the right to modify, suspend, or discontinue any service at any time without notice.',
      'Course content, fees, and batch timings are subject to change. Please confirm with our team before enrollment.',
    ],
  },
  {
    title: '3. Enrollment and Payment',
    content: [
      'Enrollment in any training program is subject to availability and confirmation from Zionbridge Technologies.',
      'Course fees must be paid as per the schedule communicated at the time of enrollment.',
      'Fees once paid are non-refundable unless stated otherwise in writing by Zionbridge Technologies.',
      'We reserve the right to cancel batches due to insufficient enrollment, in which case a full refund will be provided.',
    ],
  },
  {
    title: '4. Placement Assistance',
    content: [
      '100% placement assistance means we will provide referrals and support throughout your job search — it does not guarantee placement.',
      'Placement outcomes depend on individual performance, market conditions, and eligibility criteria of hiring partners.',
      'Students must maintain a satisfactory academic record and complete all required modules to be eligible for placement support.',
    ],
  },
  {
    title: '5. Intellectual Property',
    content: [
      'All content on this website including text, graphics, logos, images, and training materials is the property of Zionbridge Technologies.',
      'You may not reproduce, distribute, or create derivative works from our content without explicit written permission.',
      'Training materials provided to enrolled students are for personal use only and may not be shared or resold.',
    ],
  },
  {
    title: '6. User Conduct',
    content: [
      'You agree to use our website and services only for lawful purposes.',
      'You may not use our services to transmit any harmful, offensive, or illegal content.',
      'You agree not to interfere with or disrupt the integrity or performance of our website.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    content: [
      'Zionbridge Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.',
      'Our total liability to you shall not exceed the amount paid by you for the specific service giving rise to the claim.',
      'We are not responsible for any third-party content or services linked from our website.',
    ],
  },
  {
    title: '8. Privacy',
    content: [
      'Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference.',
      'Please review our Privacy Policy to understand our practices.',
    ],
  },
  {
    title: '9. Governing Law',
    content: [
      'These Terms and Conditions shall be governed by and construed in accordance with the laws of India.',
      'Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.',
    ],
  },
  {
    title: '10. Contact Information',
    content: [
      'For any questions about these Terms and Conditions, please contact us at zionbridgetechnologies@gmail.com or call +91 78930 45803.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">Legal</div>
          <h1 className="text-4xl font-black text-white mb-4">Terms &amp; Conditions</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Please read these Terms and Conditions carefully before using Zionbridge Technologies services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Effective Date:</strong> January 1, 2024 &nbsp;|&nbsp;
              <strong>Last Updated:</strong> {new Date().getFullYear()}
            </p>
            <p className="text-amber-700 text-sm mt-2 leading-relaxed">
              These Terms and Conditions (&quot;Terms&quot;) govern your use of the Zionbridge Technologies website and services. By using our services, you agree to these Terms in full. If you disagree with any part, please discontinue use of our services.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-primary mb-4">{section.title}</h2>
                <ul className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-gray-100 pt-10 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary mb-3">Questions?</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                If you have questions about these Terms, please reach out:
              </p>
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p>Email: <a href="mailto:zionbridgetechnologies@gmail.com" className="text-gold hover:underline">zionbridgetechnologies@gmail.com</a></p>
                <p>Phone: <a href="tel:+917893045803" className="text-gold hover:underline">+91 78930 45803</a></p>
              </div>
            </div>
            <div className="flex items-end">
              <Link href="/privacy" className="btn-outline-gold text-sm">
                View Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
