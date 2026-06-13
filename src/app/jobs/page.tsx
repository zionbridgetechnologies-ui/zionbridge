'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fetchJobs, submitApplication } from '@/lib/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Icons } from '@/components/ui/Icons';

const categories = [
  { key: 'all', label: 'All Jobs' },
  { key: 'it', label: 'IT Jobs' },
  { key: 'networking', label: 'Networking' },
  { key: 'banking', label: 'Banking' },
  { key: 'hr', label: 'HR Jobs' },
  { key: 'freshers', label: 'Freshers' },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [applyJob, setApplyJob] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchJobs(activeCategory !== 'all' ? activeCategory : undefined)
      .then(setJobs).finally(() => setLoading(false));
  }, [activeCategory]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error('Name and phone required');
    setSubmitting(true);
    try {
      await submitApplication({ ...form, jobId: applyJob._id });
      toast.success('Application submitted! We will contact you soon.');
      setApplyJob(null);
      setForm({ name: '', email: '', phone: '', coverLetter: '' });
    } catch { toast.error('Failed to submit. Please try again.'); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="section-subtitle text-gold mb-3">Jobs Portal</div>
          <h1 className="text-4xl font-black text-white mb-4">Find Your Dream Job</h1>
          <p className="text-blue-200 text-lg">IT, Networking, Banking, HR & Freshers opportunities with top companies</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map(c => (
              <button key={c.key} onClick={() => setActiveCategory(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === c.key ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-4">{Array(4).fill(0).map((_, i) => <div key={i} className="skeleton h-36 rounded-2xl" />)}</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {jobs.map((job, i) => (
                <motion.div key={job._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="card p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-primary text-lg">{job.title}</h3>
                      {job.company && <div className="text-gray-500 text-sm">{job.company}</div>}
                    </div>
                    <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full capitalize">{job.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 items-center">
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <Icons.Location className="w-4 h-4 text-gray-400 shrink-0" />
                        {job.location}
                      </span>
                    )}
                    {job.experience && (
                      <span className="flex items-center gap-1">
                        <Icons.Clock className="w-4 h-4 text-gray-400 shrink-0" />
                        {job.experience}
                      </span>
                    )}
                    {job.salary && (
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <Icons.Currency className="w-4 h-4 text-green-600 shrink-0" />
                        {job.salary}
                      </span>
                    )}
                    <span className="flex items-center gap-1 capitalize">
                      <Icons.Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                      {job.type}
                    </span>
                  </div>
                  {job.description && <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>}
                  <button onClick={() => setApplyJob(job)} className="btn-primary text-sm py-2.5">Apply Now →</button>
                </motion.div>
              ))}
            </div>
          )}
          {!loading && jobs.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Icons.Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <div className="font-medium">No jobs found in this category.</div>
              <div className="text-sm mt-1">Check back soon or contact us directly.</div>
            </div>
          )}
        </div>
      </section>

      {/* Apply Modal */}
      {applyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 bg-primary rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-white font-bold text-lg">Apply for Position</h2>
                  <p className="text-blue-200 text-sm mt-1">{applyJob.title} {applyJob.company ? `@ ${applyJob.company}` : ''}</p>
                </div>
                <button onClick={() => setApplyJob(null)} className="text-white/60 hover:text-white text-2xl">×</button>
              </div>
            </div>
            <form onSubmit={handleApply} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field" placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="input-field" placeholder="Phone *" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <input className="input-field" placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <textarea className="input-field resize-none" rows={3} placeholder="Why are you a good fit? (optional)" value={form.coverLetter} onChange={e => setForm({ ...form, coverLetter: e.target.value })} />
              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3">
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
