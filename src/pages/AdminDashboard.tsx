import { Users, TrendingUp, Activity, DollarSign, Eye, BarChart2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAuthStore, loginAdminDemo } from '@/store/authStore';
import { useEffect } from 'react';

const MOCK_USERS = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', plan: 'pro', uploads: 47, joined: '2026-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', plan: 'free', uploads: 3, joined: '2026-02-01' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', plan: 'pro', uploads: 122, joined: '2025-12-10' },
  { id: '4', name: 'David Lee', email: 'david@example.com', plan: 'free', uploads: 5, joined: '2026-02-18' },
  { id: '5', name: 'Eva Martinez', email: 'eva@example.com', plan: 'pro', uploads: 34, joined: '2026-01-28' },
];

const STATS = [
  { label: 'Total Users', value: '5,243', icon: Users, change: '+12%' },
  { label: 'Total Revenue', value: '$47,190', icon: DollarSign, change: '+8%' },
  { label: 'Images Processed', value: '124,891', icon: Activity, change: '+23%' },
  { label: 'Pro Subscribers', value: '1,482', icon: TrendingUp, change: '+15%' },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();

  if (!user?.isAdmin) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Access denied. Admin only.</p>
        <button onClick={loginAdminDemo} className="btn-brand px-5 py-2.5 rounded-xl">Load Admin Demo</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Platform overview and management</p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-purple)))' }}>
              ADMIN
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div className="glass-card mb-6">
            <div className="flex items-center justify-between p-6 border-b border-border/40">
              <h2 className="font-semibold">Recent Users</h2>
              <span className="text-xs text-muted-foreground">5,243 total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">User</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Plan</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Uploads</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Joined</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {MOCK_USERS.map((u) => (
                    <tr key={u.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                            {u.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${u.plan === 'pro' ? 'text-white' : 'bg-muted text-muted-foreground'}`}
                          style={u.plan === 'pro' ? { background: 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-purple)))' } : {}}>
                          {u.plan.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{u.uploads}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{u.joined}</td>
                      <td className="px-6 py-4">
                        <button className="text-xs text-primary hover:underline flex items-center gap-1">
                          <Eye className="h-3 w-3" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Revenue (Last 7 Days)</h2>
            </div>
            <div className="flex items-end gap-3 h-24">
              {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-lg transition-all" style={{ height: `${h}%`, background: `linear-gradient(to top, hsl(var(--brand-blue)), hsl(var(--brand-purple)))`, opacity: 0.7 + i * 0.04 }} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d}>{d}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
