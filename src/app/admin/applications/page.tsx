'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getApplications, updateApplicationStatus } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default function ApplicationsPage() {
  const router = useRouter();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('zb_admin_token')) { router.push('/admin/login'); return; }
    getApplications().then(setApps).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateApplicationStatus(id, status);
    setApps(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    toast.success('Status updated');
  };

  const statusColors: Record<string, string> = {
    applied: 'bg-blue-100 text-blue-700',
    reviewing: 'bg-yellow-100 text-yellow-700',
    shortlisted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Job Applications ({apps.length})</h1>

        <div className="admin-card overflow-x-auto">
          {loading ? <div className="text-center py-8 text-gray-400">Loading...</div> : (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100">
                <th className="text-left py-3 text-gray-500">Applicant</th>
                <th className="text-left py-3 text-gray-500">Contact</th>
                <th className="text-left py-3 text-gray-500">Job Applied</th>
                <th className="text-left py-3 text-gray-500">Cover Letter</th>
                <th className="text-left py-3 text-gray-500">Status</th>
                <th className="text-left py-3 text-gray-500">Date</th>
                <th className="text-left py-3 text-gray-500">Action</th>
              </tr></thead>
              <tbody>
                {apps.map(a => (
                  <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium">{a.name}</td>
                    <td className="py-3 text-gray-500">
                      <div>{a.phone}</div>
                      <div className="text-xs text-gray-400">{a.email}</div>
                    </td>
                    <td className="py-3 text-gray-600">{a.jobId?.title || 'General Application'}</td>
                    <td className="py-3 text-gray-400 text-xs max-w-[120px] truncate">{a.coverLetter || '—'}</td>
                    <td className="py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[a.status]}`}>{a.status}</span></td>
                    <td className="py-3 text-gray-400 text-xs">{new Date(a.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="py-3">
                      <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white" value={a.status} onChange={e => updateStatus(a._id, e.target.value)}>
                        <option value="applied">Applied</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && apps.length === 0 && <div className="text-center py-8 text-gray-400">No applications yet</div>}
        </div>
      </main>
    </div>
  );
}
