'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { submitEnquiry } from '@/lib/api';
import toast from 'react-hot-toast';

import { Icons } from '@/components/ui/Icons';

const courses = ['Full Stack Development', 'Python Programming', 'CCNA Networking', 'HR Generalist', 'Java Full Stack', 'Banking Jobs Prep', 'DevOps & Cloud', 'AI/ML Tools', 'Digital Marketing', 'Other'];

export default function LeadCaptureModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', courseInterest: '', message: '' });

  useEffect(() => {
    const shown = sessionStorage.getItem('zb_lead_shown');
    if (!shown) {
      const timer = setTimeout(() => { setOpen(true); }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => { setOpen(false); sessionStorage.setItem('zb_lead_shown', '1'); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error('Name and phone are required');
    setLoading(true);
    try {
      await submitEnquiry({ ...form, type: 'general' });
      toast.success('Thank you! We will contact you soon.');
      close();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-md z-10">
            {/* Header */}
            <div className="bg-hero-gradient p-6 text-white relative">
              <button onClick={close} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-2 text-gold font-semibold text-sm uppercase tracking-widest">
                <Icons.ExpertTrainers className="w-5 h-5 text-gold shrink-0" />
                <span>Free Career Guidance</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Start Your Career Journey</h2>
              <p className="text-blue-200 text-sm">Get a free counseling session with our experts. 100% Placement Assistance Guaranteed!</p>
              <div className="flex gap-4 mt-4 text-xs">
                {['Expert Trainers', '100% Placement', 'Real Projects'].map(b => (
                  <span key={b} className="bg-white/20 rounded-full px-3 py-1">✓ {b}</span>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <input className="input-field" placeholder="Your Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <input className="input-field" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required type="tel" />
                <input className="input-field" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" />
              </div>
              <select className="input-field" value={form.courseInterest} onChange={e => setForm({ ...form, courseInterest: e.target.value })}>
                <option value="">Select Course Interest</option>
                {courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea className="input-field resize-none" rows={2} placeholder="Any specific questions? (optional)" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-3.5">
                {loading ? 'Submitting...' : 'Get Free Career Guidance'}
              </button>
              <p className="text-center text-xs text-gray-400">By submitting, you agree to be contacted by our team. No spam ever.</p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
