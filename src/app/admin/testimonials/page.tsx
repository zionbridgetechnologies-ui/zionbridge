'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/api';
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

const empty = { name: '', designation: '', company: '', review: '', rating: 5, course: '', placedSalary: '', isActive: true };

export default function TestimonialsAdmin() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('zb_admin_token')) { router.push('/admin/login'); return; }
    load();
  }, []);

  const load = () => getAllTestimonials().then(setItems).catch(() => toast.error('Failed to load'));

  const openEdit = (t: any) => { setEditing(t); setForm(t); setShowForm(true); };
  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); };

  const save = async () => {
    if (!form.name || !form.review) return toast.error('Name and review required');
    setLoading(true);
    try {
      if (editing) { await updateTestimonial(editing._id, form); toast.success('Updated'); }
      else { await createTestimonial(form); toast.success('Created'); }
      setShowForm(false); load();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await deleteTestimonial(id); toast.success('Deleted'); load();
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${item.href === '/admin/testimonials' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
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
          <h1 className="text-2xl font-bold text-primary">Testimonials ({items.length})</h1>
          <button onClick={openNew} className="btn-primary">+ Add Testimonial</button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between">
                <h2 className="font-bold text-primary">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 text-xl">×</button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Student Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input className="input-field" placeholder="Designation" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                  <input className="input-field" placeholder="Course Taken" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} />
                </div>
                <textarea className="input-field resize-none" rows={3} placeholder="Review *" value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Rating</label>
                    <select className="input-field" value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}>
                      {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                  </div>
                  <input className="input-field" placeholder="Placed Salary (e.g. 6.5 LPA)" value={form.placedSalary} onChange={e => setForm({ ...form, placedSalary: e.target.value })} />
                </div>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(t => (
            <div key={t._id} className="admin-card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold text-primary">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.designation} {t.company ? `@ ${t.company}` : ''}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{t.isActive ? 'Active' : 'Hidden'}</span>
              </div>
              <div className="flex gap-0.5 mb-2">{Array(t.rating).fill('⭐').map((s, i) => <span key={i} className="text-sm">{s}</span>)}</div>
              <p className="text-gray-600 text-xs italic mb-3 line-clamp-3">"{t.review}"</p>
              {t.placedSalary && <div className="text-xs text-green-600 font-medium mb-3">💰 Placed at {t.placedSalary}</div>}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button onClick={() => openEdit(t)} className="text-blue-600 text-xs font-medium hover:underline">Edit</button>
                <button onClick={() => del(t._id)} className="text-red-500 text-xs font-medium hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 && <div className="text-center py-12 text-gray-400">No testimonials yet</div>}
      </main>
    </div>
  );
}
