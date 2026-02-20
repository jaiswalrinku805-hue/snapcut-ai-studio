import { useState } from 'react';
import { User, Mail, Lock, Bell, Trash2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

export default function AccountSettings() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    toast({ title: 'Settings saved', description: 'Your account has been updated.' });
    setSaving(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-2xl font-bold mb-8">Account Settings</h1>

          {/* Profile */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Full Name</label>
                <Input defaultValue={user.name} className="bg-muted/50 border-border/50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Email</label>
                <Input defaultValue={user.email} type="email" className="bg-muted/50 border-border/50" />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Current Password</label>
                <Input type="password" placeholder="••••••••" className="bg-muted/50 border-border/50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">New Password</label>
                <Input type="password" placeholder="••••••••" className="bg-muted/50 border-border/50" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Notifications</h2>
            </div>
            <div className="space-y-3">
              {['Email on processing complete', 'Monthly usage summary', 'Product updates'].map((item) => (
                <div key={item} className="flex items-center justify-between py-2">
                  <span className="text-sm">{item}</span>
                  <div className="relative">
                    <input type="checkbox" defaultChecked className="sr-only peer" id={item} />
                    <label htmlFor={item} className="relative inline-flex h-5 w-9 items-center rounded-full bg-muted cursor-pointer peer-checked:bg-primary transition-colors">
                      <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform translate-x-0.5 peer-checked:translate-x-4" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-card p-6 mb-8" style={{ borderColor: 'hsl(var(--destructive) / 0.25)' }}>
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="h-5 w-5 text-destructive" />
              <h2 className="font-semibold text-destructive">Danger Zone</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data.</p>
            <button className="text-sm text-destructive border border-destructive/30 rounded-xl px-4 py-2 hover:bg-destructive/10 transition-colors">
              Delete Account
            </button>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-brand px-8 py-3 rounded-xl">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
