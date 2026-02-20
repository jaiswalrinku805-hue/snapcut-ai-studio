import { useState, useRef, useCallback } from 'react';
import { Upload, X, ImageIcon, Download, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function UploadWorkspace() {
  const { user, updateUsage } = useAuthStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const canProcess = user && (user.plan === 'pro' || user.monthlyUsed < user.monthlyLimit);

  const handleFile = (f: File) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      toast({ title: 'Invalid file type', description: 'Only JPG, PNG, and WEBP are supported.', variant: 'destructive' });
      return;
    }
    if (f.size > MAX_SIZE) {
      toast({ title: 'File too large', description: 'Maximum file size is 10MB.', variant: 'destructive' });
      return;
    }
    setFile(f);
    setResultUrl(null);
    setStatus('idle');
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const simulateProcessing = async () => {
    if (!file || !canProcess) return;
    setStatus('uploading');
    setProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 30; i += 5) {
      await new Promise((r) => setTimeout(r, 80));
      setProgress(i);
    }
    setStatus('processing');
    for (let i = 30; i <= 90; i += 5) {
      await new Promise((r) => setTimeout(r, 120));
      setProgress(i);
    }
    setProgress(100);
    // Use a checkerboard pattern as the "result" (transparent PNG placeholder)
     import { useState, useRef, useCallback } from 'react';
import { Upload, X, ImageIcon, Download, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function UploadWorkspace() {
  const { user, updateUsage } = useAuthStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const canProcess = user && (user.plan === 'pro' || user.monthlyUsed < user.monthlyLimit);

  const handleFile = (f: File) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      toast({ title: 'Invalid file type', description: 'Only JPG, PNG, and WEBP are supported.', variant: 'destructive' });
      return;
    }
    if (f.size > MAX_SIZE) {
      toast({ title: 'File too large', description: 'Maximum file size is 10MB.', variant: 'destructive' });
      return;
    }
    setFile(f);
    setResultUrl(null);
    setStatus('idle');
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const simulateProcessing = async () => {
    if (!file || !canProcess) return;
    setStatus('uploading');
    setProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 30; i += 5) {
      await new Promise((r) => setTimeout(r, 80));
      setProgress(i);
    }
    setStatus('processing');
    for (let i = 30; i <= 90; i += 5) {
      await new Promise((r) => setTimeout(r, 120));
      setProgress(i);
    }
    setProgress(100);
    // Use a checkerboard pattern as the "result" (transparent PNG placeholder)
     setResultUrl('data:image/png;base64, 
     iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
    setStatus('done');
    if (user) updateUsage(user.monthlyUsed + 1);
    toast({ title: 'Background removed!', description: 'Your image is ready to download.' });
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResultUrl(null);
    setStatus('idle');
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Remove Background</h1>
            <p className="text-muted-foreground text-sm mt-1">Upload an image to remove its background instantly with AI.</p>
          </div>

          {/* Credits Warning */}
          {user && user.plan === 'free' && (
            <div className={`glass-card p-4 mb-6 flex items-center justify-between gap-4 ${user.monthlyUsed >= user.monthlyLimit ? 'border-destructive/40' : 'border-border/40'}`}>
              <div className="flex items-center gap-3">
                <div className="usage-bar h-2 w-32">
                  <div className="usage-bar-fill h-2" style={{ width: `${Math.min((user.monthlyUsed / user.monthlyLimit) * 100, 100)}%` }} />
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.monthlyUsed} / {user.monthlyLimit} used this month
                </span>
              </div>
              {user.monthlyUsed >= user.monthlyLimit ? (
                <Link to="/billing">
                  <button className="btn-brand text-xs px-4 py-2 rounded-lg">Upgrade to Pro</button>
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground">{user.monthlyLimit - user.monthlyUsed} remaining</span>
              )}
            </div>
          )}

          {!file ? (
            /* Upload Zone */
            <div
              className={`upload-zone p-16 text-center cursor-pointer ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.15), hsl(var(--brand-purple) / 0.15))', border: '1px solid hsl(var(--brand-blue) / 0.2)' }}>
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drop your image here</h3>
              <p className="text-muted-foreground text-sm mb-6">or click to browse your files</p>
              <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP · Max 10MB</p>
            </div>
          ) : (
            /* Processing Area */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original */}
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original</span>
                    <button onClick={reset} className="text-muted-foreground hover:text-foreground transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden bg-muted/30 aspect-square flex items-center justify-center">
                    <img src={preview!} alt="Original" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 truncate">{file.name} · {(file.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>

                {/* Result */}
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Background Removed</span>
                    {resultUrl && (
                      <a href={resultUrl} download="snapcut-result.png" className="text-xs text-primary hover:underline flex items-center gap-1">
                        <Download className="h-3 w-3" /> Download
                      </a>
                    )}
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square flex items-center justify-center" style={{ background: 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--card)) 0% 50%) 0 0 / 20px 20px' }}>
                    {status === 'idle' && (
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Result will appear here</p>
                      </div>
                    )}
                    {(status === 'uploading' || status === 'processing') && (
                      <div className="text-center p-6">
                        <RefreshCw className="h-8 w-8 text-primary mx-auto mb-3 animate-spin" />
                        <p className="text-sm font-medium mb-3">
                          {status === 'uploading' ? 'Uploading...' : 'Removing background...'}
                        </p>
                        <div className="usage-bar h-2 w-full max-w-xs mx-auto">
                          <div className="usage-bar-fill h-2 transition-all duration-200" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
                      </div>
                    )}
                    {status === 'done' && resultUrl && (
                      <img src={resultUrl} alt="Result" className="w-full h-full object-contain" />
                    )}
                    {status === 'error' && (
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Processing failed. Try again.</p>
                      </div>
                    )}
                  </div>
                  {status === 'done' && (
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle2 className="h-3 w-3 text-green-400" />
                      <p className="text-xs text-green-400">Background removed successfully</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {status === 'idle' && (
                  <button
                    onClick={simulateProcessing}
                    disabled={!canProcess}
                    className="btn-brand flex-1 py-3 rounded-xl"
                  >
                    {!canProcess ? 'No Credits Remaining' : 'Remove Background'}
                  </button>
                )}
                {status === 'done' && (
                  <>
                    <a href={resultUrl!} download="snapcut-result.png" className="flex-1">
                      <button className="btn-brand w-full py-3 rounded-xl">
                        <Download className="h-4 w-4" /> Download PNG
                      </button>
                    </a>
                    <button onClick={reset} className="flex-1 py-3 rounded-xl border border-border/60 text-sm font-medium hover:bg-muted/30 transition-colors">
                      Upload Another
                    </button>
                  </>
                )}
                {(status === 'uploading' || status === 'processing') && (
                  <button disabled className="btn-brand flex-1 py-3 rounded-xl opacity-70 cursor-not-allowed">
                    <RefreshCw className="h-4 w-4 animate-spin" /> Processing...
                  </button>
                )}
              </div>

              {!canProcess && user?.plan === 'free' && (
                <div className="glass-card p-4 text-center" style={{ borderColor: 'hsl(var(--destructive) / 0.3)', background: 'hsl(var(--destructive) / 0.05)' }}>
                  <p className="text-sm text-muted-foreground mb-3">You've used all your free removals this month.</p>
                  <Link to="/billing">
                    <button className="btn-brand px-6 py-2 rounded-xl text-sm">Upgrade to Pro — $9/month</button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
    setStatus('done');
    if (user) updateUsage(user.monthlyUsed + 1);
    toast({ title: 'Background removed!', description: 'Your image is ready to download.' });
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResultUrl(null);
    setStatus('idle');
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Remove Background</h1>
            <p className="text-muted-foreground text-sm mt-1">Upload an image to remove its background instantly with AI.</p>
          </div>

          {/* Credits Warning */}
          {user && user.plan === 'free' && (
            <div className={`glass-card p-4 mb-6 flex items-center justify-between gap-4 ${user.monthlyUsed >= user.monthlyLimit ? 'border-destructive/40' : 'border-border/40'}`}>
              <div className="flex items-center gap-3">
                <div className="usage-bar h-2 w-32">
                  <div className="usage-bar-fill h-2" style={{ width: `${Math.min((user.monthlyUsed / user.monthlyLimit) * 100, 100)}%` }} />
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.monthlyUsed} / {user.monthlyLimit} used this month
                </span>
              </div>
              {user.monthlyUsed >= user.monthlyLimit ? (
                <Link to="/billing">
                  <button className="btn-brand text-xs px-4 py-2 rounded-lg">Upgrade to Pro</button>
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground">{user.monthlyLimit - user.monthlyUsed} remaining</span>
              )}
            </div>
          )}

          {!file ? (
            /* Upload Zone */
            <div
              className={`upload-zone p-16 text-center cursor-pointer ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'linear-gradient(135deg, hsl(var(--brand-blue) / 0.15), hsl(var(--brand-purple) / 0.15))', border: '1px solid hsl(var(--brand-blue) / 0.2)' }}>
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drop your image here</h3>
              <p className="text-muted-foreground text-sm mb-6">or click to browse your files</p>
              <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP · Max 10MB</p>
            </div>
          ) : (
            /* Processing Area */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original */}
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original</span>
                    <button onClick={reset} className="text-muted-foreground hover:text-foreground transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden bg-muted/30 aspect-square flex items-center justify-center">
                    <img src={preview!} alt="Original" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 truncate">{file.name} · {(file.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>

                {/* Result */}
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Background Removed</span>
                    {resultUrl && (
                      <a href={resultUrl} download="snapcut-result.png" className="text-xs text-primary hover:underline flex items-center gap-1">
                        <Download className="h-3 w-3" /> Download
                      </a>
                    )}
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square flex items-center justify-center" style={{ background: 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--card)) 0% 50%) 0 0 / 20px 20px' }}>
                    {status === 'idle' && (
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Result will appear here</p>
                      </div>
                    )}
                    {(status === 'uploading' || status === 'processing') && (
                      <div className="text-center p-6">
                        <RefreshCw className="h-8 w-8 text-primary mx-auto mb-3 animate-spin" />
                        <p className="text-sm font-medium mb-3">
                          {status === 'uploading' ? 'Uploading...' : 'Removing background...'}
                        </p>
                        <div className="usage-bar h-2 w-full max-w-xs mx-auto">
                          <div className="usage-bar-fill h-2 transition-all duration-200" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
                      </div>
                    )}
                    {status === 'done' && resultUrl && (
                      <img src={resultUrl} alt="Result" className="w-full h-full object-contain" />
                    )}
                    {status === 'error' && (
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Processing failed. Try again.</p>
                      </div>
                    )}
                  </div>
                  {status === 'done' && (
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle2 className="h-3 w-3 text-green-400" />
                      <p className="text-xs text-green-400">Background removed successfully</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {status === 'idle' && (
                  <button
                    onClick={simulateProcessing}
                    disabled={!canProcess}
                    className="btn-brand flex-1 py-3 rounded-xl"
                  >
                    {!canProcess ? 'No Credits Remaining' : 'Remove Background'}
                  </button>
                )}
                {status === 'done' && (
                  <>
                    <a href={resultUrl!} download="snapcut-result.png" className="flex-1">
                      <button className="btn-brand w-full py-3 rounded-xl">
                        <Download className="h-4 w-4" /> Download PNG
                      </button>
                    </a>
                    <button onClick={reset} className="flex-1 py-3 rounded-xl border border-border/60 text-sm font-medium hover:bg-muted/30 transition-colors">
                      Upload Another
                    </button>
                  </>
                )}
                {(status === 'uploading' || status === 'processing') && (
                  <button disabled className="btn-brand flex-1 py-3 rounded-xl opacity-70 cursor-not-allowed">
                    <RefreshCw className="h-4 w-4 animate-spin" /> Processing...
                  </button>
                )}
              </div>

              {!canProcess && user?.plan === 'free' && (
                <div className="glass-card p-4 text-center" style={{ borderColor: 'hsl(var(--destructive) / 0.3)', background: 'hsl(var(--destructive) / 0.05)' }}>
                  <p className="text-sm text-muted-foreground mb-3">You've used all your free removals this month.</p>
                  <Link to="/billing">
                    <button className="btn-brand px-6 py-2 rounded-xl text-sm">Upgrade to Pro — $9/month</button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
