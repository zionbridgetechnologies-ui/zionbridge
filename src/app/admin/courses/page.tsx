'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/layout/AdminSidebar';

const empty = { title: '', category: 'software', description: '', duration: '', fees: '', badge: '', syllabus: '', isActive: true };

export default function CoursesAdmin() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('zb_admin_token')) { router.push('/admin/login'); return; }
    load();
  }, []);

  const load = () => getAllCourses().then(setCourses).catch(() => toast.error('Failed to load'));

  const openEdit = (c: any) => {
    setEditing(c);
    setForm({ ...c, syllabus: (c.syllabus || []).join(', ') });
    setShowForm(true);
  };

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); };

  const save = async () => {
    if (!form.title) return toast.error('Title is required');
    setLoading(true);
    try {
      const payload = { ...form, syllabus: form.syllabus.split(',').map((s: string) => s.trim()).filter(Boolean) };
      if (editing) { await updateCourse(editing._id, payload); toast.success('Course updated'); }
      else { await createCourse(payload); toast.success('Course created'); }
      setShowForm(false); load();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    await deleteCourse(id); toast.success('Deleted'); load();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Courses ({courses.length})</h1>
          <button onClick={openNew} className="btn-primary">+ Add Course</button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between">
                <h2 className="font-bold text-primary">{editing ? 'Edit Course' : 'Add Course'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
              </div>
              <div className="p-6 space-y-4">
                <input className="input-field" placeholder="Course Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="software">Software Development</option>
                  <option value="networking">Networking</option>
                  <option value="hr">HR Training</option>
                  <option value="banking">Banking & Finance</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="other">Other</option>
                </select>
                <textarea className="input-field resize-none" rows={3} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                <input className="input-field" placeholder="Syllabus (comma separated)" value={form.syllabus} onChange={e => setForm({ ...form, syllabus: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Duration (e.g. 3 Months)" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                  <input className="input-field" placeholder="Fees (e.g. ₹15,000)" value={form.fees} onChange={e => setForm({ ...form, fees: e.target.value })} />
                </div>
                <input className="input-field" placeholder="Badge (e.g. Most Popular)" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-primary" />
                  <span className="text-sm font-medium text-gray-700">Active (visible on website)</span>
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
              <th className="text-left py-3 text-gray-500">Category</th>
              <th className="text-left py-3 text-gray-500">Duration</th>
              <th className="text-left py-3 text-gray-500">Fees</th>
              <th className="text-left py-3 text-gray-500">Status</th>
              <th className="text-left py-3 text-gray-500">Actions</th>
            </tr></thead>
            <tbody>
              {courses.map(c => (
                <tr key={c._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 font-medium">{c.title}</td>
                  <td className="py-3 text-gray-500 capitalize">{c.category}</td>
                  <td className="py-3 text-gray-500">{c.duration || '—'}</td>
                  <td className="py-3 text-gray-500">{c.fees || '—'}</td>
                  <td className="py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{c.isActive ? 'Active' : 'Hidden'}</span></td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                      <button onClick={() => del(c._id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {courses.length === 0 && <div className="text-center py-8 text-gray-400">No courses yet</div>}
        </div>
      </main>
    </div>
  );
}
