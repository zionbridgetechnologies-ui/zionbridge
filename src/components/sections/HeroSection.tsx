'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Icons } from '@/components/ui/Icons';

const stats = [
  { value: 10, suffix: '+', label: 'Years of Excellence' },
  { value: 25, suffix: 'K+', label: 'Students Trained' },
  { value: 15, suffix: 'K+', label: 'Successful Placements' },
  { value: 250, suffix: '+', label: 'Hiring Partners' },
];

const badges = ['Expert Trainers', 'Real-Time Experience', 'Mock Interviews', 'Placement Assistance', 'Certifications'];

export default function HeroSection() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="bg-hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-sm font-medium">TRAINING | PLACEMENT | CAREER GROWTH</span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-4">
              Launch Your <span className="text-gold">Dream Career</span>
            </h1>

            <p className="text-blue-200 text-lg mb-8 leading-relaxed max-w-lg">
              Industry-focused training with real-time experience, 100% placement assistance, mock interviews & career guidance to build your future.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map(b => (
                <span key={b} className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs text-white/90">
                  <span className="text-gold">✓</span> {b}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/courses" className="btn-primary px-8 py-4 text-base flex items-center gap-2">
                <Icons.ExpertTrainers className="w-5 h-5 text-gold shrink-0" /> Explore Programs
              </Link>
              <Link href="/contact#enquiry" className="btn-outline px-8 py-4 text-base">
                Apply for Placement
              </Link>
              <Link href="/career-guidance" className="text-gold border-b border-gold/50 hover:border-gold font-medium transition-colors inline-flex items-center gap-1 self-center">
                Free Career Guidance →
              </Link>
            </div>
          </motion.div>

          {/* Right - Hero visual */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
            <div className="relative">
              {/* Floating badge */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -left-6 bg-gold text-primary font-black text-center p-5 rounded-2xl shadow-2xl z-10 w-28 h-28 flex flex-col items-center justify-center">
                <div className="text-2xl font-black">100%</div>
                <div className="text-xs font-bold leading-tight">PLACEMENT ASSISTANCE</div>
              </motion.div>

              {/* Main premium visual */}
              <div className="w-full h-[480px] bg-gradient-to-br from-blue-950 to-primary-dark rounded-3xl flex flex-col justify-between p-8 border border-white/10 relative overflow-hidden shadow-2xl">
                {/* Visual grid background */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Dashboard Header Mockup */}
                <div className="flex justify-between items-center relative z-10 border-b border-white/10 pb-4">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <div className="text-xxs text-blue-200/50 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    Live Placement Analytics
                  </div>
                </div>

                {/* Main Dashboard Chart/Graphic Mockup */}
                <div className="flex-1 flex items-center justify-center relative z-10 my-4">
                  {/* Career Growth Graph */}
                  <svg className="w-full h-40 text-gold" viewBox="0 0 300 100" fill="none">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10,80 Q50,40 90,65 T170,25 T250,15 L290,10"
                      stroke="#D4AF37"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10,80 Q50,40 90,65 T170,25 T250,15 L290,10 L290,100 L10,100 Z"
                      fill="url(#chart-grad)"
                    />
                    {/* Glowing dots */}
                    <circle cx="90" cy="65" r="4" fill="#fff" stroke="#D4AF37" strokeWidth="2" />
                    <circle cx="170" cy="25" r="4" fill="#fff" stroke="#D4AF37" strokeWidth="2" />
                    <circle cx="290" cy="10" r="5" fill="#D4AF37" />
                  </svg>
                  
                  {/* Floating visual items */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md translate-x-2 translate-y-2">
                        <div className="text-xxs text-blue-200">Interview prep</div>
                        <div className="text-xs font-bold text-white">Active session</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md -translate-x-2 translate-y-4">
                        <div className="text-xxs text-blue-200">HR referrals</div>
                        <div className="text-xs font-bold text-green-400">95% Match</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer status bar */}
                <div className="flex justify-between items-center text-xs text-blue-200/60 relative z-10 border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Platform Connected</span>
                  <span>100+ Jobs Active Today</span>
                </div>

                {/* Floating cards */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 right-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 text-white">
                  <div className="text-gold font-bold text-lg">15K+</div>
                  <div className="text-xs text-white/80">Successful Placements</div>
                </motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-8 right-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 text-white">
                  <div className="text-gold font-bold flex items-center gap-1 text-sm">
                    <Icons.Star className="w-4 h-4 text-gold fill-gold shrink-0" />
                    <span>4.9/5</span>
                  </div>
                  <div className="text-xs text-white/80">Student Rating</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 bg-white rounded-2xl p-6 shadow-2xl">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-primary">
                {inView ? <CountUp end={s.value} duration={2.5} suffix={s.suffix} /> : `0${s.suffix}`}
              </div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
