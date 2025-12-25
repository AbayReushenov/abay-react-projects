import { create } from 'zustand';
import { supabase } from '../config/supabase';
import type {/*  Card, */ CardsState } from '../types';

interface CardsStoreState extends CardsState {
  fetchCards: (userId: string) => Promise<void>;
  createCard: (content: string, color: string, userId: string) => Promise<void>;
  updateCard: (id: string, content: string, color: string) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  shuffleCards: (userId: string) => Promise<void>;
  getWordCount: () => number;
}

export const useCardsStore = create<CardsStoreState>((set, get) => ({
  cards: [],
  loading: false,
  error: null,

  // Загружаем карточки пользователя
  fetchCards: async (userId: string) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', userId)
        .order('order', { ascending: true });

      if (error) throw error;

      set({ cards: data || [], loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Fetch failed',
        loading: false,
      });
    }
  },

  // Создание новой карточки
  createCard: async (content: string, color: string, userId: string) => {
    try {
      set({ error: null });

      const { data: cards } = await supabase
        .from('cards')
        .select('order')
        .eq('user_id', userId)
        .order('order', { ascending: false })
        .limit(1);

      const maxOrder = cards?.[0]?.order || 0;

      const { data, error } = await supabase
        .from('cards')
        .insert([
          {
            content,
            color,
            user_id: userId,
            order: maxOrder + 1,
          },
        ])
        .select();

      if (error) throw error;

      if (data) {
        set({ cards: [...get().cards, ...data] });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Create failed',
      });
      throw error;
    }
  },

  // Обновление карточки
  updateCard: async (id: string, content: string, color: string) => {
    try {
      set({ error: null });

      const { error } = await supabase
        .from('cards')
        .update({ content, color })
        .eq('id', id);

      if (error) throw error;

      set({
        cards: get().cards.map((card) =>
          card.id === id ? { ...card, content, color } : card
        ),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Update failed',
      });
      throw error;
    }
  },

  // Удаление карточки
  deleteCard: async (id: string) => {
    try {
      set({ error: null });

      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set({
        cards: get().cards.filter((card) => card.id !== id),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Delete failed',
      });
      throw error;
    }
  },

  // Перемешивание карточек (Fisher-Yates shuffle)
  shuffleCards: async (userId: string) => {
    try {
      set({ error: null });

      const currentCards = [...get().cards];

      // Fisher-Yates алгоритм
      for (let i = currentCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentCards[i], currentCards[j]] = [currentCards[j], currentCards[i]];
      }

      // Обновляем порядок в БД (для каждой карточки)
      const updates = currentCards.map((card, index) => ({
        id: card.id,
        order: index,
      }));

      // Отправляем обновления (можно оптимизировать batch-операцией)
      for (const update of updates) {
        const { error } = await supabase
          .from('cards')
          .update({ order: update.order })
          .eq('id', update.id);

        if (error) throw error;
      }

      // Обновляем локальное состояние
      set({
        cards: currentCards.map((card, index) => ({
          ...card,
          order: index,
        })),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Shuffle failed',
      });
      throw error;
    }
  },

  // Подсчёт общего количества слов
  getWordCount: () => {
    return get().cards.reduce((count, card) => {
      return count + card.content.trim().split(/\s+/).length;
    }, 0);
  },
}));
