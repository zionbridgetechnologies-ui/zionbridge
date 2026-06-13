'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import EnquiryForm from './EnquiryForm';
import { Icons } from './Icons';

interface Props {
  course: any;
  onClose: () => void;
}

export default function CourseDetailsModal({ course, onClose }: Props) {
  if (!course) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col z-10"
        >
          {/* Header */}
          <div className="bg-hero-gradient p-6 text-white flex justify-between items-start shrink-0 relative">
            <div>
              <span className="bg-gold/20 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                {course.category} Training
              </span>
              <h2 className="text-2xl md:text-3xl font-black mt-2 text-white">{course.title}</h2>
              <p className="text-blue-200 text-sm mt-1 max-w-2xl">{course.description}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 grid md:grid-cols-5 gap-8">
            {/* Syllabus and details */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Course Curriculum</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.syllabus && course.syllabus.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                    <Icons.Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Duration</div>
                    <div className="text-sm font-semibold text-primary">{course.duration || 'Flexible'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                    <Icons.Currency className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Fees</div>
                    <div className="text-sm font-semibold text-primary">{course.fees || 'Contact Us'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Registration Form */}
            <div className="md:col-span-2">
              <div className="sticky top-0 bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                <EnquiryForm
                  type="general"
                  title="Quick Registration"
                  subtitle={`Enroll in ${course.title} today.`}
                  dark={false}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
