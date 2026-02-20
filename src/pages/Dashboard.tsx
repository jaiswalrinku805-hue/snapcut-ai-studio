import { Link } from 'react-router-dom';
import { LayoutDashboard, Upload, ImageIcon, CreditCard, ChevronRight, Zap, TrendingUp, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';

const MOCK_UPLOADS = [
  { id: '1', filename: 'product-photo.jpg', status: 'completed', date: '2026-02-19', size: '2.1 MB' },
  { id: '2', filename: 'portrait.png', status: 'completed', date: '2026-02-18', size: '1.8 MB' },
  { id: '3', filename: 'logo-design.png', status: 'completed', date: '2026-02-17', size: '0.5 MB' },
  { id: '4', filename: 'team-photo.jpg', status: 'processing', date: '2026-02-16', size: '3.2 MB' },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  if (!user) return null;

  const usagePercent = user.plan === 'pro' ? 0 : Math.min((user.monthlyUsed / user.monthlyLimit) * 100, 100);
  const remaining = user.plan === 'pro' ? '∞' : user.monthlyLimit - user.monthlyUsed;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Welcome back, {user.name.split(' ')[0]}!</p>
            </div>
            <Link to="/upload">
              <button className="btn-brand px-5 py-2.5 rounded-xl text-sm">
                <Upload className="h-4 w-4" /> New Upload
              </button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Usage Card */}
            <div className="glass-card p-5 col-span-1 sm:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Usage</p>
                  <p className="text-2xl font-bold mt-1">
                    {user.plan === 'pro' ? user.monthlyUsed : user.monthlyUsed}
                    <span className="text-muted-foreground text-base font-normal">
                      {user.plan === 'pro' ? ' removals' : ` / ${user.monthlyLimit}`}
                    </span>
                  </p>
                </div>
                {user.plan === 'pro' ? (
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-purple)))' }}>PRO</span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">FREE</span>
                )}
              </div>
              {user.plan === 'free' && (
                <>
                  <div className="usage-bar h-2 mb-2">
                    <div className="usage-bar-fill h-2" style={{ width: `${usagePercent}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{remaining} removals remaining</span>
                    <Link to="/billing" className="text-primary hover:underline">Upgrade</Link>
                  </div>
                </>
              )}
            </div>

            <div className="glass-card p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Total Uploads</p>
              <p className="text-3xl font-bold mb-1">24</p>
              <p className="text-xs text-muted-foreground">All time</p>
            </div>

            <div className="glass-card p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Plan</p>
              <p className="text-xl font-bold mb-1 capitalize">{user.plan}</p>
              {user.plan === 'free' ? (
                <Link to="/billing" className="text-xs text-primary hover:underline">Upgrade to Pro →</Link>
              ) : (
                <p className="text-xs text-muted-foreground">Next billing: Mar 1</p>
              )}
            </div>
          </div>

          {/* Upgrade CTA for free users */}
          {user.plan === 'free' && user.monthlyUsed >= 3 && (
            <div className="glass-card p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: 'hsl(var(--brand-blue) / 0.3)', background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.06), hsl(var(--brand-purple) / 0.06))' }}>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.2), hsl(var(--brand-purple) / 0.2))' }}>
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Running low on removals</p>
                  <p className="text-sm text-muted-foreground">Upgrade to Pro for unlimited background removals.</p>
                </div>
              </div>
              <Link to="/billing">
                <button className="btn-brand px-5 py-2.5 rounded-xl text-sm whitespace-nowrap">
                  Upgrade to Pro
                </button>
              </Link>
            </div>
          )}

          {/* Recent Uploads */}
          <div className="glass-card">
            <div className="flex items-center justify-between p-6 border-b border-border/40">
              <h2 className="font-semibold">Recent Uploads</h2>
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>
            <div className="divide-y divide-border/40">
              {MOCK_UPLOADS.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{upload.filename}</p>
                      <p className="text-xs text-muted-foreground">{upload.date} · {upload.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      upload.status === 'completed'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {upload.status}
                    </span>
                    {upload.status === 'completed' && (
                      <button className="text-xs text-primary hover:underline">Download</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border/40 text-center">
              <Link to="/upload" className="text-sm text-primary hover:underline">+ New background removal</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
