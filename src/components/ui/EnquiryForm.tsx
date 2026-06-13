'use client';
import { useState } from 'react';
import { submitEnquiry } from '@/lib/api';
import toast from 'react-hot-toast';

const courses = ['Full Stack Development', 'Python Programming', 'CCNA Networking', 'HR Generalist', 'Java Full Stack', 'Banking Jobs Prep', 'DevOps & Cloud', 'AI/ML Tools', 'Digital Marketing', 'Other'];

interface Props { type?: string; title?: string; subtitle?: string; dark?: boolean; }

export default function EnquiryForm({ type = 'general', title = 'Get Free Career Guidance', subtitle = 'Fill the form and our team will reach out within 24 hours', dark = false }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', courseInterest: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error('Name and phone are required');
    setLoading(true);
    try {
      await submitEnquiry({ ...form, type });
      toast.success('✅ Thank you! We will contact you within 24 hours.');
      setForm({ name: '', email: '', phone: '', courseInterest: '', message: '' });
    } catch { toast.error('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const inputCls = dark ? 'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-gold outline-none' : 'input-field';

  return (
    <div className={`rounded-2xl p-8 ${dark ? 'bg-primary-light/50 border border-white/10' : 'bg-white shadow-xl'}`}>
      {title && <h3 className={`text-xl font-bold mb-1 ${dark ? 'text-white' : 'text-primary'}`}>{title}</h3>}
      {subtitle && <p className={`text-sm mb-6 ${dark ? 'text-blue-200' : 'text-gray-500'}`}>{subtitle}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input className={inputCls} placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input className={inputCls} placeholder="Phone *" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        </div>
        <input className={inputCls} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <select className={inputCls} value={form.courseInterest} onChange={e => setForm({ ...form, courseInterest: e.target.value })}>
          <option value="">Select Course Interest</option>
          {courses.map(c => <option key={c}>{c}</option>)}
        </select>
        <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Your message or questions..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
          {loading ? '⏳ Submitting...' : '🚀 Submit Enquiry'}
        </button>
      </form>
    </div>
  );
}
