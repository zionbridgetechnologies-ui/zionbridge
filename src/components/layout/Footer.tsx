'use client';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                <span className="text-primary font-black text-lg">Z</span>
              </div>
              <div>
                <div className="font-black text-xl">ZIONBRIDGE</div>
                <div className="text-xs text-gray-400 tracking-widest">TECHNOLOGIES</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Zionbridge Technologies is a leading training & placement company providing industry-focused training, placement assistance, HR recruitment, consultancy, IT services and more.</p>
            <div className="flex gap-3">
              {['f', 't', 'in', 'ig', 'yt'].map(s => (
                <a key={s} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center text-xs font-bold transition-all duration-300 uppercase">{s}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Home', 'About Us', 'Training Programs', 'Placements', 'Jobs Portal', 'Contact Us'].map(l => (
                <li key={l}><Link href={`/${l.toLowerCase().replace(/ /g, '-')}`} className="hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['HR Recruitment', 'IT Services', 'Digital Marketing', 'Creative Services', 'Photography Services', 'Career Guidance'].map(l => (
                <li key={l}><Link href="/services" className="hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <Icons.Location className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>123, Business Street, Corporate Park, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icons.Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a href="tel:+917893045803" className="hover:text-gold">+91 78930 45803</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icons.Enquiries className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a href="mailto:zionbridgetechnologies@gmail.com" className="hover:text-gold">zionbridgetechnologies@gmail.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icons.Globe className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>www.zionbridgetechnologies.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <span>© 2024 Zionbridge Technologies. All Rights Reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* Sticky WhatsApp */}
      <a href="https://wa.me/917893045803?text=Hi%2C%20I'm%20interested%20in%20Zionbridge%20Technologies%20programs" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300">
        <Icons.WhatsApp className="w-7 h-7 text-white" />
      </a>

      {/* Back to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-gold hover:bg-gold-dark text-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
        <Icons.ArrowUp className="w-5 h-5 text-primary" />
      </button>
    </footer>
  );
}
