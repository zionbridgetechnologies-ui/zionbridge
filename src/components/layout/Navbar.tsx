'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Training Programs', href: '/courses',
    sub: [
      { label: 'Software Development', href: '/courses?category=software' },
      { label: 'Networking (CCNA/CCNP)', href: '/courses?category=networking' },
      { label: 'HR Training', href: '/courses?category=hr' },
      { label: 'Banking & Finance', href: '/courses?category=banking' },
    ]
  },
  { label: 'Placements', href: '/placements' },
  {
    label: 'Services', href: '/services',
    sub: [
      { label: 'HR Recruitment', href: '/services#hr-recruitment' },
      { label: 'IT Services', href: '/services#it-services' },
      { label: 'Digital Marketing', href: '/services#digital-marketing' },
      { label: 'Creative Services', href: '/services#creative' },
      { label: 'Photography', href: '/services#photography' },
    ]
  },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span>📧 info@zionbridgetechnologies.com</span>
            <span>📞 +91 98765 43210</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>Follow Us:</span>
            {['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map(s => (
              <a key={s} href="#" className="hover:text-gold transition-colors">{s[0]}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
              <span className="text-gold group-hover:text-primary font-black text-lg transition-colors duration-300">Z</span>
            </div>
            <div>
              <div className="font-black text-primary text-lg leading-tight">ZIONBRIDGE</div>
              <div className="text-xs text-gray-500 font-medium tracking-widest">TECHNOLOGIES</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative" onMouseEnter={() => link.sub && setActiveDropdown(link.label)} onMouseLeave={() => setActiveDropdown(null)}>
                <Link href={link.href} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200">
                  {link.label}
                  {link.sub && <ChevronDownIcon className="w-3 h-3" />}
                </Link>
                {link.sub && activeDropdown === link.label && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 bg-white shadow-xl rounded-xl border border-gray-100 py-2 min-w-[200px] z-50">
                    {link.sub.map(s => (
                      <Link key={s.label} href={s.href} className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-blue-50 transition-colors">{s.label}</Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/career-guidance" className="btn-outline-gold text-sm">Free Guidance</Link>
            <Link href="/contact#enquiry" className="btn-primary text-sm">Apply Now</Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <div key={link.label}>
                    <Link href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg">{link.label}</Link>
                    {link.sub && link.sub.map(s => (
                      <Link key={s.label} href={s.href} onClick={() => setOpen(false)} className="block px-6 py-2 text-sm text-gray-500 hover:text-primary">{s.label}</Link>
                    ))}
                  </div>
                ))}
                <div className="pt-4 flex flex-col gap-2">
                  <Link href="/career-guidance" onClick={() => setOpen(false)} className="btn-outline-gold justify-center">Free Career Guidance</Link>
                  <Link href="/contact#enquiry" onClick={() => setOpen(false)} className="btn-primary justify-center">Apply Now</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
