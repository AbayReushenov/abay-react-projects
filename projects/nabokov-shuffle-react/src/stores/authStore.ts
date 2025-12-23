import { create } from 'zustand';
import { supabase } from '../config/supabase';
import type { User, AuthState } from '../types';

interface AuthStoreState extends AuthState {
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  loading: true,
  error: null,

  // Проверяем, есть ли активная сессия при загрузке
  checkAuth: async () => {
    try {
      set({ loading: true, error: null });

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata,
          },
          loading: false,
        });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Auth check failed',
        loading: false,
      });
    }
  },

  // Magic Link (email) вход
  signInWithMagicLink: async (email: string) => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      // Показываем сообщение после отправки ссылки
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Sign in failed',
        loading: false,
      });
      throw error;
    }
  },

  // Выход
  signOut: async () => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      set({ user: null, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Sign out failed',
        loading: false,
      });
      throw error;
    }
  },
}));
