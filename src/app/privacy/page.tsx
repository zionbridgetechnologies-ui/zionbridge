import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | Zionbridge Technologies',
  description: 'Privacy Policy for Zionbridge Technologies — how we collect, use, and protect your personal information.',
};

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      'Personal identification information: name, email address, phone number, and other contact details you provide when filling out our enquiry forms, enrollment forms, or contacting us.',
      'Usage data: information on how you use our website, including pages visited, time spent, and links clicked.',
      'Device and browser information for analytics and security purposes.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To respond to your enquiries and provide the services you have requested.',
      'To send you relevant course information, training schedules, and career guidance updates.',
      'To process enrollment applications and placement assistance requests.',
      'To improve our website experience and tailor content to your interests.',
      'To send periodic communications such as newsletters, promotional offers, or important updates (you may opt out at any time).',
    ],
  },
  {
    title: '3. Data Security',
    content: [
      'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.',
      'All data is stored on secure servers and access is restricted to authorized personnel only.',
      'We use SSL encryption for all data transmissions on our website.',
    ],
  },
  {
    title: '4. Sharing Your Information',
    content: [
      'We do not sell, trade, or rent your personal information to third parties.',
      'We may share your information with our hiring partner companies for placement assistance purposes, only with your explicit consent.',
      'We may disclose information if required by law or to protect the rights and safety of Zionbridge Technologies and its users.',
    ],
  },
  {
    title: '5. Cookies',
    content: [
      'Our website uses cookies to enhance user experience and analyze site traffic.',
      'You can choose to disable cookies through your browser settings; however, some features of our website may not function properly without them.',
    ],
  },
  {
    title: '6. Third-Party Links',
    content: [
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.',
      'We encourage you to review the privacy policies of any third-party sites you visit.',
    ],
  },
  {
    title: '7. Your Rights',
    content: [
      'You have the right to access, correct, or delete your personal data held by us.',
      'You may request to opt out of marketing communications at any time by contacting us.',
      'To exercise any of these rights, please contact us at zionbridgetechnologies@gmail.com.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.',
      'We encourage you to review this policy periodically to stay informed about how we protect your information.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">Legal</div>
          <h1 className="text-4xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Your privacy matters to us. Learn how Zionbridge Technologies collects, uses, and protects your information.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>Effective Date:</strong> January 1, 2024 &nbsp;|&nbsp;
              <strong>Last Updated:</strong> {new Date().getFullYear()}
            </p>
            <p className="text-blue-700 text-sm mt-2 leading-relaxed">
              This Privacy Policy describes how Zionbridge Technologies (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and shares information about you when you use our website and services. By using our services, you agree to the terms of this Privacy Policy.
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

          <div className="mt-14 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-bold text-primary mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong>Zionbridge Technologies</strong></p>
              <p>Email: <a href="mailto:zionbridgetechnologies@gmail.com" className="text-gold hover:underline">zionbridgetechnologies@gmail.com</a></p>
              <p>Phone: <a href="tel:+917893045803" className="text-gold hover:underline">+91 78930 45803</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
