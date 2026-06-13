'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMe, getEnquiries, getAllCourses, getAllJobs, getApplications } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Icons } from '@/components/ui/Icons';

const colorCls: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  gold: 'bg-amber-50 text-gold',
  purple: 'bg-purple-50 text-purple-600',
  green: 'bg-green-50 text-green-600',
};

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

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-primary font-bold text-xl">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

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
              { label: 'Total Enquiries', value: stats.enquiries, icon: 'Enquiries', color: 'blue' },
              { label: 'Active Courses', value: stats.courses, icon: 'ExpertTrainers', color: 'gold' },
              { label: 'Active Jobs', value: stats.jobs, icon: 'Briefcase', color: 'purple' },
              { label: 'Applications', value: stats.applications, icon: 'Applications', color: 'green' },
            ].map(s => {
              const IconComponent = Icons[s.icon as keyof typeof Icons];
              return (
                <div key={s.label} className="admin-card flex items-center justify-between p-6">
                  <div>
                    <div className="text-2xl font-black text-primary">{s.value}</div>
                    <div className="text-gray-500 text-sm mt-0.5">{s.label}</div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorCls[s.color] || 'bg-gray-100 text-gray-600'}`}>
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>
                </div>
              );
            })}
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
              { href: '/admin/courses', label: 'Manage Courses', icon: 'ExpertTrainers' },
              { href: '/admin/jobs', label: 'Manage Jobs', icon: 'Briefcase' },
              { href: '/admin/testimonials', label: 'Testimonials', icon: 'Star' },
              { href: '/admin/settings', label: 'Site Settings', icon: 'Settings' },
            ].map(l => {
              const IconComponent = Icons[l.icon as keyof typeof Icons];
              return (
                <Link key={l.href} href={l.href} className="admin-card hover:shadow-md transition-all text-center group flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-gold/10 flex items-center justify-center text-primary group-hover:text-gold mb-3 transition-colors duration-200">
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>
                  <div className="font-semibold text-primary text-sm group-hover:text-gold transition-colors duration-200">{l.label}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
