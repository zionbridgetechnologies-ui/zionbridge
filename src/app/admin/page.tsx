'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMe, getEnquiries, getAllCourses, getAllJobs, getApplications } from '@/lib/api';
import toast from 'react-hot-toast';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: '📩' },
  { href: '/admin/courses', label: 'Courses', icon: '🎓' },
  { href: '/admin/jobs', label: 'Jobs', icon: '💼' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
  { href: '/admin/applications', label: 'Applications', icon: '📋' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState({ enquiries: 0, courses: 0, jobs: 0, applications: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('zb_admin_token');
    if (!token) { router.push('/admin/login'); return; }

    Promise.all([getMe(), getEnquiries({ limit: 5 }), getAllCourses(), getAllJobs(), getApplications()])
      .then(([me, enqData, courses, jobs, apps]) => {
        setAdmin(me.admin);
        setRecentEnquiries(enqData.enquiries);
        setStats({ enquiries: enqData.total, courses: courses.length, jobs: jobs.length, applications: apps.length });
      })
      .catch(() => { router.push('/admin/login'); })
      .finally(() => setLoading(false));
  }, [router]);

  const logout = () => {
    localStorage.removeItem('zb_admin_token');
    localStorage.removeItem('zb_admin');
    router.push('/admin/login');
    toast.success('Logged out');
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-primary font-bold text-xl">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex-shrink-0 flex flex-col min-h-screen">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center"><span className="text-primary font-black text-lg">Z</span></div>
            <div><div className="font-black">ZIONBRIDGE</div><div className="text-xs text-blue-300">Admin Panel</div></div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="text-sm text-blue-200 mb-2">👤 {admin?.name}</div>
          <button onClick={logout} className="w-full text-left text-xs text-red-300 hover:text-red-200 transition-colors">🚪 Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, {admin?.name}! Here's your overview.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Enquiries', value: stats.enquiries, icon: '📩', color: 'blue' },
              { label: 'Active Courses', value: stats.courses, icon: '🎓', color: 'gold' },
              { label: 'Active Jobs', value: stats.jobs, icon: '💼', color: 'purple' },
              { label: 'Applications', value: stats.applications, icon: '📋', color: 'green' },
            ].map(s => (
              <div key={s.label} className="admin-card">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-primary">{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Enquiries */}
          <div className="admin-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-primary">Recent Enquiries</h2>
              <Link href="/admin/enquiries" className="text-gold text-sm hover:underline">View All →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">Name</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Phone</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Course</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Date</th>
                </tr></thead>
                <tbody>
                  {recentEnquiries.map(e => (
                    <tr key={e._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 font-medium">{e.name}</td>
                      <td className="py-3 text-gray-500">{e.phone}</td>
                      <td className="py-3 text-gray-500">{e.courseInterest || '—'}</td>
                      <td className="py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${e.status === 'new' ? 'bg-blue-100 text-blue-700' : e.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{e.status}</span></td>
                      <td className="py-3 text-gray-400 text-xs">{new Date(e.createdAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recentEnquiries.length === 0 && <div className="text-center py-8 text-gray-400">No enquiries yet</div>}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { href: '/admin/courses', label: 'Manage Courses', icon: '🎓' },
              { href: '/admin/jobs', label: 'Manage Jobs', icon: '💼' },
              { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
              { href: '/admin/settings', label: 'Site Settings', icon: '⚙️' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="admin-card hover:shadow-md transition-shadow text-center group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform inline-block">{l.icon}</div>
                <div className="font-medium text-primary text-sm">{l.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
