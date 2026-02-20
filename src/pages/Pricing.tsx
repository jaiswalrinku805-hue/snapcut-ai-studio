import { Link } from 'react-router-dom';
import { Check, Zap, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuthStore } from '@/store/authStore';

const FREE_FEATURES = [
  '5 background removals per month',
  'Standard resolution output',
  'JPG, PNG, WEBP support',
  '10MB file size limit',
  'Auto-delete after 24 hours',
];

const PRO_FEATURES = [
  'Unlimited background removals',
  'High-resolution output',
  'Priority processing queue',
  'Batch upload support',
  'API access (coming soon)',
  'Premium support',
  'Advanced edge detection',
];

export default function Pricing() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 rounded-full" style={{ background: 'radial-gradient(ellipse, hsl(var(--brand-blue)), hsl(var(--brand-purple)), transparent)' }} />
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Simple, transparent pricing</h1>
            <p className="text-muted-foreground text-lg">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">Free</h2>
                <p className="text-muted-foreground text-sm">Perfect for trying SnapCut AI</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-muted-foreground" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={isAuthenticated ? '/upload' : '/register'}>
                <button className="w-full py-3 rounded-xl border border-border/60 text-sm font-medium hover:border-primary/40 hover:bg-muted/30 transition-all">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="glass-card p-8 pricing-card-popular" style={{ borderColor: 'hsl(var(--brand-blue) / 0.4)' }}>
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-xs font-semibold px-4 py-1.5 rounded-full text-white" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-purple)))' }}>
                  Most Popular
                </span>
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: '0 0 40px hsl(var(--brand-blue) / 0.15), 0 0 80px hsl(var(--brand-purple) / 0.08)' }} />

              <div className="mb-6 relative">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                  Pro <Zap className="h-4 w-4 text-primary" />
                </h2>
                <p className="text-muted-foreground text-sm">For professionals and teams</p>
              </div>
              <div className="mb-8 relative">
                <span className="text-5xl font-bold glow-text">$9</span>
                <span className="text-muted-foreground ml-2">/month</span>
                <p className="text-xs text-muted-foreground mt-1">Billed monthly via Razorpay</p>
              </div>
              <ul className="space-y-3 mb-8 relative">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.3), hsl(var(--brand-purple) / 0.3))' }}>
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={isAuthenticated ? '/billing' : '/register'} className="relative block">
                <button className="btn-brand w-full py-3 rounded-xl">
                  Upgrade to Pro <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Are images stored permanently?', a: 'No. All uploaded and processed images are automatically deleted after 24 hours. We do not permanently store your images.' },
                { q: 'What image formats are supported?', a: 'We support JPG, PNG, and WEBP formats with a maximum file size of 10MB per image.' },
                { q: 'How does the free plan work?', a: 'You get 5 background removals every month, completely free. The quota resets on the 1st of each month.' },
                { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel anytime. Your Pro access continues until the end of the current billing period.' },
              ].map((faq) => (
                <div key={faq.q} className="glass-card p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
