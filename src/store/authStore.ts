import { create } from 'zustand';

export type Plan = 'free' | 'pro';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: Plan;
  monthlyUsed: number;
  monthlyLimit: number;
  isAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateUsage: (used: number) => void;
}

// Mock user for demo
const DEMO_USER: User = {
  id: 'demo-user-1',
  email: 'demo@snapcut.ai',
  name: 'Demo User',
  plan: 'free',
  monthlyUsed: 2,
  monthlyLimit: 5,
  isAdmin: false,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUsage: (used) =>
    set((state) => ({
      user: state.user ? { ...state.user, monthlyUsed: used } : null,
    })),
}));

// Helper to login with demo account
export const loginDemo = () => {
  useAuthStore.getState().setUser(DEMO_USER);
};

export const loginProDemo = () => {
  useAuthStore.getState().setUser({ ...DEMO_USER, plan: 'pro', monthlyUsed: 47, monthlyLimit: Infinity });
};

export const loginAdminDemo = () => {
  useAuthStore.getState().setUser({ ...DEMO_USER, name: 'Admin User', isAdmin: true });
};
