// State Management for Zustand
export type CardColor = 'default' | 'yellow' | 'blue' | 'pink'; // Эстетика карточек

export interface Card {
  id: string;
  content: string;
  color: CardColor;
  user_id: string;
  created_at: string;
  order: number;
  isFocus?: boolean;      // Опционально, если используете фокус
}

export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}
