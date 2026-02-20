import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="SnapCut AI" className="h-8 w-8 rounded-lg" />
              <span className="font-bold text-lg">SnapCut <span className="glow-text">AI</span></span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              AI-powered background removal platform. Remove backgrounds from images instantly with professional-grade results.
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Product</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/upload" className="hover:text-foreground transition-colors">Try for Free</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SnapCut AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
