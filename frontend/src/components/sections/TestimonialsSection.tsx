'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTestimonials } from '@/lib/api';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch(() => {});
    const interval = setInterval(() => setCurrent(p => (p + 1) % Math.max(1, testimonials.length)), 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="section-subtitle mb-2">Success Stories</div>
          <h2 className="section-title">Our Students, Their Success</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              viewport={{ once: true }} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm text-primary">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.designation}</div>
                  {t.company && <div className="text-xs text-gold font-medium">{t.company}</div>}
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array(t.rating).fill('⭐').map((s, j) => <span key={j} className="text-sm">{s}</span>)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic mb-3">"{t.review}"</p>
              {t.placedSalary && (
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 text-xs">
                  <span className="text-gray-500">Placed at </span>
                  <span className="text-green-700 font-bold">{t.placedSalary}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
