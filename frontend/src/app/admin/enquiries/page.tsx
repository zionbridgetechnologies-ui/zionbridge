'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getEnquiries, updateEnquiryStatus } from '@/lib/api';
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

export default function EnquiriesPage() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', type: '' });

  useEffect(() => {
    if (!localStorage.getItem('zb_admin_token')) { router.push('/admin/login'); return; }
    loadEnquiries();
  }, [filter]);

  const loadEnquiries = () => {
    setLoading(true);
    getEnquiries({ ...filter, limit: 50 })
      .then(data => { setEnquiries(data.enquiries); setTotal(data.total); })
      .catch(() => toast.error('Failed to load enquiries'))
      .finally(() => setLoading(false));
  };

  const updateStatus = async (id: string, status: string) => {
    await updateEnquiryStatus(id, status);
    setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
    toast.success('Status updated');
  };

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    converted: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-600',
  };

  const logout = () => { localStorage.removeItem('zb_admin_token'); router.push('/admin/login'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-primary text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center"><span className="text-primary font-black text-lg">Z</span></div>
            <div><div className="font-black">ZIONBRIDGE</div><div className="text-xs text-blue-300">Admin Panel</div></div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${item.href === '/admin/enquiries' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="text-xs text-red-300 hover:text-red-200">🚪 Logout</button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary">Enquiries</h1>
            <p className="text-gray-500 text-sm">{total} total enquiries</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <select className="input-field w-auto" value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
          <select className="input-field w-auto" value={filter.type} onChange={e => setFilter({ ...filter, type: e.target.value })}>
            <option value="">All Types</option>
            <option value="general">General</option>
            <option value="career-guidance">Career Guidance</option>
            <option value="placement">Placement</option>
            <option value="hr-request">HR Request</option>
          </select>
        </div>

        <div className="admin-card overflow-x-auto">
          {loading ? <div className="text-center py-8 text-gray-400">Loading...</div> : (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100">
                <th className="text-left py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left py-3 text-gray-500 font-medium">Contact</th>
                <th className="text-left py-3 text-gray-500 font-medium">Course Interest</th>
                <th className="text-left py-3 text-gray-500 font-medium">Message</th>
                <th className="text-left py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left py-3 text-gray-500 font-medium">Date</th>
                <th className="text-left py-3 text-gray-500 font-medium">Action</th>
              </tr></thead>
              <tbody>
                {enquiries.map(e => (
                  <tr key={e._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium">{e.name}</td>
                    <td className="py-3 text-gray-500">
                      <div>{e.phone}</div>
                      <div className="text-xs text-gray-400">{e.email}</div>
                    </td>
                    <td className="py-3 text-gray-600">{e.courseInterest || '—'}</td>
                    <td className="py-3 text-gray-400 text-xs max-w-[150px] truncate">{e.message || '—'}</td>
                    <td className="py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[e.status]}`}>{e.status}</span></td>
                    <td className="py-3 text-gray-400 text-xs">{new Date(e.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="py-3">
                      <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white" value={e.status} onChange={ev => updateStatus(e._id, ev.target.value)}>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && enquiries.length === 0 && <div className="text-center py-8 text-gray-400">No enquiries found</div>}
        </div>
      </main>
    </div>
  );
}
