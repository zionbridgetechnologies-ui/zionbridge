'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fetchCourses } from '@/lib/api';

const categories = [
  { key: 'all', label: 'All Courses' },
  { key: 'software', label: 'Software' },
  { key: 'networking', label: 'Networking' },
  { key: 'hr', label: 'HR Training' },
  { key: 'banking', label: 'Banking' },
];

const categoryColors: Record<string, string> = {
  software: 'bg-blue-100 text-blue-700',
  networking: 'bg-orange-100 text-orange-700',
  hr: 'bg-purple-100 text-purple-700',
  banking: 'bg-green-100 text-green-700',
  other: 'bg-gray-100 text-gray-700',
};

const categoryIcons: Record<string, string> = {
  software: '💻', networking: '🌐', hr: '👥', banking: '🏦', other: '📚'
};

export default function CoursesSection({ limit }: { limit?: number }) {
  const [courses, setCourses] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses(activeCategory !== 'all' ? activeCategory : undefined)
      .then(data => setCourses(limit ? data.slice(0, limit) : data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [activeCategory, limit]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="section-subtitle mb-2">Our Courses</div>
            <h2 className="section-title">Popular Training Programs</h2>
          </div>
          <Link href="/courses" className="btn-outline-gold text-sm">View All Courses →</Link>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map(c => (
            <button key={c.key} onClick={() => setActiveCategory(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === c.key ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => <div key={i} className="skeleton h-64 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="card overflow-hidden group">
                {/* Image */}
                <div className="h-44 bg-gradient-to-br from-primary to-primary-light relative overflow-hidden flex items-center justify-center">
                  <span className="text-6xl opacity-30">{categoryIcons[course.category] || '📚'}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  {course.badge && (
                    <span className="absolute top-3 right-3 bg-gold text-primary text-xs font-bold px-2 py-1 rounded-full">{course.badge}</span>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[course.category] || 'bg-white text-gray-700'}`}>
                      {course.category?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-primary mb-2 group-hover:text-gold transition-colors">{course.title}</h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">{course.description}</p>

                  {course.syllabus?.length > 0 && (
                    <ul className="text-xs text-gray-600 space-y-1 mb-4">
                      {course.syllabus.slice(0, 4).map((s: string) => (
                        <li key={s} className="flex items-center gap-1.5"><span className="text-gold">•</span>{s}</li>
                      ))}
                    </ul>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div>
                      {course.duration && <div className="text-xs text-gray-500">⏱ {course.duration}</div>}
                      {course.fees && <div className="text-sm font-bold text-primary">{course.fees}</div>}
                    </div>
                    <Link href={`/contact#enquiry?course=${encodeURIComponent(course.title)}`}
                      className="text-gold text-xs font-semibold hover:underline">Learn More →</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {courses.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400">No courses found in this category.</div>
        )}
      </div>
    </section>
  );
}
