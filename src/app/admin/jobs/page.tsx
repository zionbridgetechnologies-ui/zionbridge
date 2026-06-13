'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllJobs, createJob, updateJob, deleteJob } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/layout/AdminSidebar';

const emptyJob = { title: '', company: '', location: '', category: 'it', type: 'full-time', experience: '', salary: '', description: '', requirements: '', isActive: true };

export default function JobsAdmin() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyJob);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('zb_admin_token')) { router.push('/admin/login'); return; }
    load();
  }, []);

  const load = () => getAllJobs().then(setJobs).catch(() => toast.error('Failed to load'));

  const openEdit = (j: any) => { setEditing(j); setForm({ ...j, requirements: (j.requirements || []).join(', ') }); setShowForm(true); };
  const openNew = () => { setEditing(null); setForm(emptyJob); setShowForm(true); };

  const save = async () => {
    if (!form.title) return toast.error('Job title required');
    setLoading(true);
    try {
      const payload = { ...form, requirements: form.requirements.split(',').map((s: string) => s.trim()).filter(Boolean) };
      if (editing) { await updateJob(editing._id, payload); toast.success('Job updated'); }
      else { await createJob(payload); toast.success('Job created'); }
      setShowForm(false); load();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this job?')) return;
    await deleteJob(id); toast.success('Deleted'); load();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Jobs Portal ({jobs.length})</h1>
          <button onClick={openNew} className="btn-primary">+ Add Job</button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between">
                <h2 className="font-bold text-primary">{editing ? 'Edit Job' : 'Add Job'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
              </div>
              <div className="p-6 space-y-4">
                <input className="input-field" placeholder="Job Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Company Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                  <input className="input-field" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="it">IT Jobs</option>
                    <option value="networking">Networking Jobs</option>
                    <option value="banking">Banking Jobs</option>
                    <option value="hr">HR Jobs</option>
                    <option value="freshers">Freshers Jobs</option>
                    <option value="other">Other</option>
                  </select>
                  <select className="input-field" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Experience (e.g. 0-2 years)" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
                  <input className="input-field" placeholder="Salary (e.g. 3-5 LPA)" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
                </div>
                <textarea className="input-field resize-none" rows={3} placeholder="Job Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                <input className="input-field" placeholder="Requirements (comma separated)" value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-primary" />
                  <span className="text-sm font-medium text-gray-700">Active (visible on jobs portal)</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button onClick={save} disabled={loading} className="btn-primary flex-1 justify-center">{loading ? 'Saving...' : editing ? 'Update' : 'Create'}</button>
                  <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 rounded-xl py-2.5 font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="admin-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100">
              <th className="text-left py-3 text-gray-500">Title</th>
              <th className="text-left py-3 text-gray-500">Company</th>
              <th className="text-left py-3 text-gray-500">Category</th>
              <th className="text-left py-3 text-gray-500">Type</th>
              <th className="text-left py-3 text-gray-500">Salary</th>
              <th className="text-left py-3 text-gray-500">Status</th>
              <th className="text-left py-3 text-gray-500">Actions</th>
            </tr></thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 font-medium">{j.title}</td>
                  <td className="py-3 text-gray-500">{j.company || '—'}</td>
                  <td className="py-3 text-gray-500 capitalize">{j.category}</td>
                  <td className="py-3 text-gray-500 capitalize">{j.type}</td>
                  <td className="py-3 text-gray-500">{j.salary || '—'}</td>
                  <td className="py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${j.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{j.isActive ? 'Active' : 'Hidden'}</span></td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(j)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                      <button onClick={() => del(j._id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {jobs.length === 0 && <div className="text-center py-8 text-gray-400">No jobs posted yet</div>}
        </div>
      </main>
    </div>
  );
}
