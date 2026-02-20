import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <img src={logo} alt="SnapCut AI" className="h-20 w-20 rounded-3xl mx-auto mb-8" />
          <h1 className="text-5xl font-bold mb-6">About SnapCut AI</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            SnapCut AI is a cutting-edge background removal platform built for designers, creators, and businesses. We use state-of-the-art AI to deliver professional-grade results in seconds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Our Mission', desc: 'Make professional image editing accessible to everyone through AI.' },
              { title: 'Privacy First', desc: 'Your images are never stored permanently. Auto-deleted after 24 hours.' },
              { title: 'Built to Scale', desc: 'Powered by cloud infrastructure capable of millions of requests.' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6 text-left">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function Contact() {
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="text-muted-foreground text-center mb-12">We'd love to hear from you.</p>
          <div className="glass-card p-8">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1.5 block">First Name</label><Input className="bg-muted/50 border-border/50" placeholder="John" /></div>
                <div><label className="text-sm font-medium mb-1.5 block">Last Name</label><Input className="bg-muted/50 border-border/50" placeholder="Doe" /></div>
              </div>
              <div><label className="text-sm font-medium mb-1.5 block">Email</label><Input type="email" className="bg-muted/50 border-border/50" placeholder="you@example.com" /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Message</label><textarea className="w-full rounded-xl bg-muted/50 border border-border/50 p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary" rows={4} placeholder="How can we help?" /></div>
              <button className="btn-brand w-full py-3 rounded-xl" onClick={() => toast({ title: 'Message sent!', description: "We'll get back to you within 24 hours." })}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-muted-foreground">
            {[
              { title: 'Data Collection', body: 'We collect your email address and basic account information when you register. We do not sell your personal data to third parties.' },
              { title: 'Image Processing', body: 'Images uploaded for background removal are processed in real-time and automatically deleted after 24 hours. We do not permanently store your images.' },
              { title: 'Cookies', body: 'We use essential cookies for authentication and session management. We do not use tracking cookies or third-party advertising cookies.' },
              { title: 'Security', body: 'All data is transmitted over HTTPS. We use industry-standard encryption to protect your personal information.' },
              { title: 'Contact', body: 'For privacy-related inquiries, contact us at privacy@snapcut.ai' },
            ].map((section) => (
              <div key={section.title} className="glass-card p-6">
                <h2 className="text-foreground font-semibold mb-2">{section.title}</h2>
                <p className="text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="space-y-6 text-muted-foreground">
            {[
              { title: 'Acceptance', body: 'By using SnapCut AI, you agree to these terms. If you do not agree, please do not use our service.' },
              { title: 'Account Responsibilities', body: 'You are responsible for maintaining the security of your account and for all activities that occur under your account.' },
              { title: 'Free Plan Limitations', body: 'Free plan users are entitled to 5 background removals per calendar month. This quota resets on the 1st of each month.' },
              { title: 'Prohibited Uses', body: 'You may not use SnapCut AI to process illegal content, infringe on copyrights, or attempt to circumvent usage limits.' },
              { title: 'Cancellation', body: 'You may cancel your subscription at any time. Access continues until the end of the current billing period.' },
            ].map((section) => (
              <div key={section.title} className="glass-card p-6">
                <h2 className="text-foreground font-semibold mb-2">{section.title}</h2>
                <p className="text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function ForgotPassword() {
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img src={logo} alt="SnapCut AI" className="h-8 w-8 rounded-xl" />
            <span className="font-bold text-lg">SnapCut <span className="glow-text">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter your email to receive a reset link</p>
        </div>
        <div className="glass-card p-8">
          <div className="space-y-4">
            <div><label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input type="email" placeholder="you@example.com" className="bg-muted/50 border-border/50" /></div>
            <button className="btn-brand w-full py-3 rounded-xl" onClick={() => toast({ title: 'Reset link sent!', description: 'Check your email for instructions.' })}>
              Send Reset Link
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Remember your password? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
