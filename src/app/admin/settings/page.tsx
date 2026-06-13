'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchSettings, updateSettings, changePassword } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Icons } from '@/components/ui/Icons';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('zb_admin_token')) { router.push('/admin/login'); return; }
    fetchSettings().then(setSettings).catch(() => toast.error('Failed to load settings'));
  }, []);

  const save = async () => {
    setLoading(true);
    try { await updateSettings(settings); toast.success('Settings saved!'); }
    catch { toast.error('Failed to save settings'); }
    finally { setLoading(false); }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setPasswordLoading(true);
    try {
      await changePassword({ currentPassword, newPassword });
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const set = (key: string, val: string) => setSettings((p: any) => ({ ...p, [key]: val }));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Website Settings</h1>
          <button onClick={save} disabled={loading} className="btn-primary flex items-center gap-1.5 px-4 py-2.5">
            <Icons.Save className="w-4 h-4 text-primary shrink-0" />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="admin-card">
            <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
              <Icons.Phone className="w-5 h-5 text-primary shrink-0" />
              <span>Contact Information</span>
            </h2>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Phone Number</label>
                <input className="input-field" value={settings.company_phone || ''} onChange={e => set('company_phone', e.target.value)} /></div>
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Email Address</label>
                <input className="input-field" value={settings.company_email || ''} onChange={e => set('company_email', e.target.value)} /></div>
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Office Address</label>
                <textarea className="input-field resize-none" rows={2} value={settings.company_address || ''} onChange={e => set('company_address', e.target.value)} /></div>
              <div><label className="text-sm font-medium text-gray-600 block mb-1">WhatsApp Number (with country code)</label>
                <input className="input-field" placeholder="919876543210" value={settings.whatsapp_number || ''} onChange={e => set('whatsapp_number', e.target.value)} /></div>
            </div>
          </div>

          {/* Stats */}
          <div className="admin-card">
            <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
              <Icons.Chart className="w-5 h-5 text-primary shrink-0" />
              <span>Homepage Stats</span>
            </h2>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Students Trained</label>
                <input className="input-field" value={settings.students_trained || ''} onChange={e => set('students_trained', e.target.value)} /></div>
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Successful Placements</label>
                <input className="input-field" value={settings.placements || ''} onChange={e => set('placements', e.target.value)} /></div>
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Hiring Companies</label>
                <input className="input-field" value={settings.hiring_companies || ''} onChange={e => set('hiring_companies', e.target.value)} /></div>
              <div><label className="text-sm font-medium text-gray-600 block mb-1">Years of Excellence</label>
                <input className="input-field" value={settings.years_excellence || ''} onChange={e => set('years_excellence', e.target.value)} /></div>
            </div>
          </div>

          {/* Social Links */}
          <div className="admin-card">
            <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
              <Icons.Globe className="w-5 h-5 text-primary shrink-0" />
              <span>Social Media Links</span>
            </h2>
            <div className="space-y-4">
              {[['facebook_url', 'Facebook URL'], ['linkedin_url', 'LinkedIn URL'], ['instagram_url', 'Instagram URL'], ['youtube_url', 'YouTube URL'], ['twitter_url', 'Twitter/X URL']].map(([key, label]) => (
                <div key={key}><label className="text-sm font-medium text-gray-600 block mb-1">{label}</label>
                  <input className="input-field" value={settings[key] || ''} onChange={e => set(key, e.target.value)} placeholder="https://..." /></div>
              ))}
            </div>
          </div>

          {/* Site Preview / Quick Actions */}
          <div className="admin-card">
            <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
              <Icons.QuickActions className="w-5 h-5 text-primary shrink-0" />
              <span>Quick Actions</span>
            </h2>
            <div className="space-y-3">
              <a href="/" target="_blank" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Icons.Globe className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-sm font-medium">View Website</span>
              </a>
              <Link href="/admin/courses" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Icons.ExpertTrainers className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-sm font-medium">Manage Courses</span>
              </Link>
              <Link href="/admin/jobs" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Icons.Briefcase className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-sm font-medium">Manage Jobs</span>
              </Link>
              <Link href="/admin/enquiries" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Icons.Enquiries className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-sm font-medium">View All Enquiries</span>
              </Link>
            </div>
          </div>

          {/* Change Password */}
          <div className="admin-card">
            <h2 className="font-bold text-primary mb-4 text-primary flex items-center gap-2">
              <Icons.Lock className="w-5 h-5 text-primary shrink-0" />
              <span>Change Admin Password</span>
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Current Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">New Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={passwordLoading}
                className="btn-primary w-full flex justify-center items-center gap-2 mt-4"
              >
                {passwordLoading ? (
                  <span>Updating...</span>
                ) : (
                  <>
                    <Icons.Key className="w-4 h-4 text-primary shrink-0" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
