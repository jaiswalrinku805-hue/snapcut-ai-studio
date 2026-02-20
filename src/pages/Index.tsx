import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Download, Clock, Star, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuthStore } from '@/store/authStore';
import logo from '@/assets/logo.png';

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant AI Processing',
    desc: 'Remove backgrounds in seconds using state-of-the-art AI models with 99% accuracy.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'Images are automatically deleted after 24 hours. Your data stays private.',
  },
  {
    icon: Download,
    title: 'High-Res Downloads',
    desc: 'Get crisp, transparent PNGs in full resolution — ready for any use.',
  },
  {
    icon: Clock,
    title: 'Batch Processing',
    desc: 'Upload multiple images and process them all at once. Save hours of manual work.',
  },
];

const STATS = [
  { value: '10M+', label: 'Images Processed' },
  { value: '500K+', label: 'Happy Customers' },
  { value: '99.9%', label: 'Accuracy Rate' },
  { value: '<3s', label: 'Avg Processing' },
];

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(ellipse, hsl(var(--brand-blue) / 0.4) 0%, hsl(var(--brand-purple) / 0.2) 50%, transparent 70%)' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground mb-8 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Powered by Advanced AI — Remove Backgrounds Instantly
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Remove Backgrounds
            <br />
            <span className="glow-text">with AI Precision</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload any image and let our AI instantly remove the background. Get professional transparent PNGs in seconds, not hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={isAuthenticated ? '/upload' : '/register'}>
              <button className="btn-brand px-8 py-4 text-base rounded-2xl">
                Remove Background Free <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link to="/pricing">
              <button className="px-8 py-4 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/60 rounded-2xl transition-colors hover:border-border bg-card/40">
                View Pricing
              </button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-4">5 free removals per month · No credit card required</p>

          {/* Hero Preview Image */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="glass-card p-2 rounded-3xl">
              <div className="rounded-2xl overflow-hidden bg-muted/30 h-72 md:h-96 flex items-center justify-center">
                <div className="text-center">
                  <img src={logo} alt="SnapCut AI Demo" className="h-24 w-24 mx-auto mb-4 rounded-2xl animate-float" />
                  <p className="text-muted-foreground text-sm">Before / After Preview</p>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="h-20 w-20 rounded-xl bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground">Original</div>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <div className="h-20 w-20 rounded-xl border border-border flex items-center justify-center text-xs text-muted-foreground" style={{ background: 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--card)) 0% 50%) 0 0 / 12px 12px' }}>
                      Transparent
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow under card */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 blur-3xl rounded-full opacity-30" style={{ background: 'linear-gradient(90deg, hsl(var(--brand-blue)), hsl(var(--brand-purple)))' }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold glow-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Professional background removal powered by AI, built for creators and businesses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="glass-card-hover p-6">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.2), hsl(var(--brand-purple) / 0.2))', border: '1px solid hsl(var(--brand-blue) / 0.2)' }}>
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-card max-w-2xl mx-auto p-12" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.08), hsl(var(--brand-purple) / 0.08))', borderColor: 'hsl(var(--brand-blue) / 0.2)' }}>
            <h2 className="text-4xl font-bold mb-4">Start removing backgrounds today</h2>
            <p className="text-muted-foreground mb-8">5 free removals every month. No credit card required.</p>
            <Link to={isAuthenticated ? '/upload' : '/register'}>
              <button className="btn-brand px-10 py-4 text-base rounded-2xl">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
