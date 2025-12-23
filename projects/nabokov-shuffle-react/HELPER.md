# 📚 Nabokov Shuffle: React Clone — Полное руководство

📋 Содержание плана
Архитектура проекта

Инициализация React-проекта (Vite)

Настройка Supabase и переменных окружения

State Management (Zustand)

Аутентификация (Magic Link)

CRUD операции и Shuffle

Структура компонентов

Полный код всех файлов

Запуск и развёртывание

## 1️⃣ Архитектура проекта

```text
nabokov-shuffle-react/
├── src/
│   ├── config/
│   │   └── supabase.ts           # Инициализация Supabase
│   ├── stores/
│   │   ├── authStore.ts          # Zustand store для auth
│   │   └── cardsStore.ts         # Zustand store для cards
│   ├── hooks/
│   │   ├── useAuth.ts            # Hook для auth
│   │   └── useCards.ts           # Hook для работы с cards
│   ├── types/
│   │   └── index.ts              # TypeScript типы
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LogoutButton.tsx
│   │   ├── Cards/
│   │   │   ├── CardList.tsx
│   │   │   ├── CardItem.tsx
│   │   │   ├── CardForm.tsx
│   │   │   └── ShuffleButton.tsx
│   │   ├── Layout/
│   │   │   └── Header.tsx
│   │   └── Common/
│   │       └── LoadingSpinner.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.local                    # Переменные окружения (не в git)
├── .env.example                  # Пример переменных
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 2️⃣ Инициализация React-проекта (Vite)


```bash
# Создаём проект Vite с React + TypeScript
npm create vite@latest nabokov-shuffle-react -- --template react-ts

cd nabokov-shuffle-react

# Устанавливаем зависимости
npm install

# Устанавливаем Supabase и Zustand
npm install @supabase/supabase-js zustand

# Для разработки (опционально)
npm install -D typescript @types/react @types/react-dom

# Запускаем dev сервер
npm run dev

```

## 3️⃣ Настройка Supabase и переменных окружения


.env.local (в корне проекта, НЕ добавляем в git)


```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

.env.example (для документации)

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Где взять ключи:

Откройте Supabase Dashboard → Your Project

Settings → API

Скопируйте Project URL и anon (public) key
