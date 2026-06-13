'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icons } from './Icons';

const tracks = [
  {
    id: 'software',
    title: 'Software Development',
    icon: 'ITServices',
    startingSalary: '₹4.5 - ₹8.0 LPA',
    timeline: '3-4 Months',
    multiplier: '2.5x',
    skills: ['React / Next.js', 'Node.js & Express', 'PostgreSQL / MongoDB', 'Git & CI/CD', 'Data Structures & Algos'],
    path: [
      { year: 'Fresher', salary: 4.5 },
      { year: 'Yr 2', salary: 7.5 },
      { year: 'Yr 4', salary: 12.0 },
      { year: 'Yr 6+', salary: 20.0 }
    ]
  },
  {
    id: 'networking',
    title: 'CCNA & CCNP Networking',
    icon: 'Globe',
    startingSalary: '₹3.6 - ₹6.5 LPA',
    timeline: '3 Months',
    multiplier: '2.0x',
    skills: ['Cisco Routing & Switching', 'Network Security', 'IP Addressing & Subnetting', 'Firewall Configurations', 'Wireshark Diagnostics'],
    path: [
      { year: 'Fresher', salary: 3.8 },
      { year: 'Yr 2', salary: 5.5 },
      { year: 'Yr 4', salary: 9.0 },
      { year: 'Yr 6+', salary: 15.0 }
    ]
  },
  {
    id: 'hr',
    title: 'HR Generalist Operations',
    icon: 'HRRecruitment',
    startingSalary: '₹3.0 - ₹5.5 LPA',
    timeline: '2.5 Months',
    multiplier: '1.8x',
    skills: ['Payroll & Statutory Compliance', 'Talent Acquisition', 'Employee Engagement', 'Labor Laws', 'HRMS Tools'],
    path: [
      { year: 'Fresher', salary: 3.2 },
      { year: 'Yr 2', salary: 4.8 },
      { year: 'Yr 4', salary: 7.5 },
      { year: 'Yr 6+', salary: 12.0 }
    ]
  },
  {
    id: 'banking',
    title: 'Banking & Finance prep',
    icon: 'Bank',
    startingSalary: '₹3.5 - ₹6.0 LPA',
    timeline: '3 Months',
    multiplier: '1.9x',
    skills: ['Retail Banking Ops', 'KYC & AML Compliance', 'Core Banking Systems', 'Financial Products', 'Quantitative Aptitude'],
    path: [
      { year: 'Fresher', salary: 3.5 },
      { year: 'Yr 2', salary: 5.0 },
      { year: 'Yr 4', salary: 8.0 },
      { year: 'Yr 6+', salary: 13.5 }
    ]
  }
];

export default function CareerPathEstimator() {
  const [activeTrack, setActiveTrack] = useState(tracks[0]);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
      <div className="text-center mb-8">
        <span className="text-gold font-bold text-xs uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
          Salary & Career ROI Estimator
        </span>
        <h3 className="text-2xl font-bold text-primary mt-3">Plan Your Career Growth</h3>
        <p className="text-gray-500 text-sm mt-1">Select a training track to estimate average packages and career paths in India.</p>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {tracks.map(t => {
          const IconComponent = Icons[t.icon as keyof typeof Icons] || Icons.Training;
          const isSelected = activeTrack.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTrack(t)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
                isSelected
                  ? 'border-primary bg-primary text-white shadow-md'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <IconComponent className={`w-6 h-6 ${isSelected ? 'text-gold' : 'text-gray-500'}`} />
              <span className="text-xs font-semibold text-center leading-tight">{t.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Analysis Display */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Stats Card */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100/60">
            <div className="text-xs text-gray-400">Starting Salary (Fresher)</div>
            <div className="text-xl font-bold text-primary flex items-center gap-1.5 mt-1">
              <Icons.Currency className="w-5 h-5 text-gold" />
              <span>{activeTrack.startingSalary}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100/60">
              <div className="text-xs text-gray-400">Timeline</div>
              <div className="text-lg font-bold text-primary flex items-center gap-1.5 mt-1">
                <Icons.Clock className="w-4.5 h-4.5 text-primary" />
                <span>{activeTrack.timeline}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100/60">
              <div className="text-xs text-gray-400">Salary Jump</div>
              <div className="text-lg font-bold text-green-600 flex items-center gap-1.5 mt-1">
                <span className="text-green-500">↑</span>
                <span>{activeTrack.multiplier} avg</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Core Skills Acquired</div>
            <div className="flex flex-wrap gap-2">
              {activeTrack.skills.map((s, idx) => (
                <span key={idx} className="bg-primary/5 text-primary text-xs font-medium px-3 py-1.5 rounded-lg border border-primary/5">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Salary Growth Graph Card */}
        <div className="bg-hero-gradient rounded-3xl p-6 text-white relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[300px]">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="text-xs text-blue-200">Career Progression</div>
              <h4 className="font-bold text-gold text-lg mt-0.5">Average Salary Path</h4>
            </div>
            <span className="bg-white/10 text-white/90 border border-white/20 text-xxs px-2 py-0.5 rounded-full">Lakhs Per Annum (LPA)</span>
          </div>

          {/* Chart Display */}
          <div className="relative z-10 h-32 flex items-end justify-between gap-4 mt-6">
            {activeTrack.path.map((point, idx) => {
              const maxVal = 20; // Maximum reference scale LPA
              const heightPct = (point.salary / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group">
                  <div className="text-gold font-bold text-xs mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{point.salary}L
                  </div>
                  {/* Visual Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full bg-gradient-to-t from-gold/50 to-gold rounded-t-lg relative"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t-lg" />
                  </motion.div>
                  <div className="text-xxs text-blue-200/80 mt-2 text-center truncate w-full font-medium">
                    {point.year}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 border-t border-white/10 pt-4 mt-4 flex justify-between items-center text-xs text-blue-200/60">
            <span>Source: Industry Surveys 2026</span>
            <a href="/contact#enquiry" className="text-gold hover:underline font-semibold flex items-center gap-0.5">
              Talk to Career Expert →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
