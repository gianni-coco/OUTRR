import { useAuthStore } from '../stores/authStore';

// Local mock auth — no Supabase needed
// Stores users in memory (resets on reload)

type MockUser = {
  id: string;
  email: string;
  display_name: string;
};

const users: Map<string, { user: MockUser; password: string }> = new Map();

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function signUp(email: string, password: string, displayName: string) {
  if (users.has(email)) {
    throw new Error('An account with this email already exists.');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const user: MockUser = {
    id: generateId(),
    email,
    display_name: displayName,
  };
  users.set(email, { user, password });

  useAuthStore.getState().setSession({ user });
  return user;
}

export async function signIn(email: string, password: string) {
  const entry = users.get(email);
  if (!entry || entry.password !== password) {
    throw new Error('Invalid email or password.');
  }

  useAuthStore.getState().setSession({ user: entry.user });
  return entry.user;
}

export async function signOut() {
  useAuthStore.getState().setSession(null);
}
