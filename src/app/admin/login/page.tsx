'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api';
import toast from 'react-hot-toast';
import { Icons } from '@/components/ui/Icons';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await adminLogin(form);
      localStorage.setItem('zb_admin_token', data.token);
      localStorage.setItem('zb_admin', JSON.stringify(data.admin));
      toast.success('Welcome back, ' + data.admin.name);
      router.push('/admin');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-primary p-8 text-center">
          <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-black text-3xl">Z</span>
          </div>
          <h1 className="text-white font-bold text-2xl">Admin Portal</h1>
          <p className="text-blue-300 text-sm mt-1">Zionbridge Technologies</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input className="input-field" type="email" placeholder="admin@zionbridgetechnologies.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input className="input-field" type="password" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base flex items-center gap-2">
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <Icons.Lock className="w-5 h-5 text-primary shrink-0" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
