import { create } from 'zustand';

export interface MockUser {
  id: string;
  email: string;
  display_name: string;
}

interface AuthState {
  session: { user: MockUser } | null;
  user: MockUser | null;
  isLoading: boolean;
  setSession: (session: { user: MockUser } | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: false,
  setSession: (session) =>
    set({ session, user: session?.user ?? null }),
  setLoading: (isLoading) => set({ isLoading }),
}));
