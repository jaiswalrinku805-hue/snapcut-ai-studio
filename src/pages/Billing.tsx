import { useState } from 'react';
import { CreditCard, Zap, Check, Shield, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAuthStore, loginProDemo } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

export default function Billing() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    loginProDemo();
    toast({ title: '🎉 Upgraded to Pro!', description: 'You now have unlimited background removals.' });
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-2xl font-bold mb-2">Billing</h1>
          <p className="text-muted-foreground text-sm mb-8">Manage your subscription and billing details.</p>

          {/* Current Plan */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Current Plan</h2>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${user.plan === 'pro' ? 'text-white' : 'bg-muted text-muted-foreground'}`}
                style={user.plan === 'pro' ? { background: 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-purple)))' } : {}}>
                {user.plan.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{user.plan === 'pro' ? '$9' : '$0'}<span className="text-muted-foreground text-base font-normal">/month</span></p>
                {user.plan === 'free' && <p className="text-sm text-muted-foreground mt-1">{user.monthlyUsed} / {user.monthlyLimit} removals used this month</p>}
                {user.plan === 'pro' && <p className="text-sm text-muted-foreground mt-1">Unlimited removals · Next billing: Mar 1, 2026</p>}
              </div>
            </div>
          </div>

          {/* Upgrade Card */}
          {user.plan === 'free' && (
            <div className="glass-card p-8 mb-6" style={{ borderColor: 'hsl(var(--brand-blue) / 0.35)', background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.06), hsl(var(--brand-purple) / 0.06))' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.2), hsl(var(--brand-purple) / 0.2))' }}>
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Upgrade to Pro</h2>
                  <p className="text-muted-foreground text-sm">Get unlimited background removals for just $9/month.</p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {['Unlimited background removals', 'High-resolution output', 'Priority processing', 'Premium support'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.25), hsl(var(--brand-purple) / 0.25))' }}>
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="btn-brand w-full py-3.5 rounded-xl"
              >
                {loading ? (
                  <>Processing payment...</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Upgrade with Razorpay — $9/month</>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Secured by Razorpay · Cancel anytime</span>
              </div>
            </div>
          )}

          {user.plan === 'pro' && (
            <div className="glass-card p-6">
              <h2 className="font-semibold mb-4">Subscription Management</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Billing cycle</span>
                  <span className="text-sm font-medium">Monthly</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Next payment</span>
                  <span className="text-sm font-medium">Mar 1, 2026 — $9.00</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">Payment method</span>
                  <span className="text-sm font-medium">•••• 4242</span>
                </div>
              </div>
              <button className="mt-4 text-sm text-destructive hover:underline">Cancel subscription</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
