import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { supabase } from './config/supabase'

// Временный тест подключения
supabase.from('cards').select('count', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('❌ Ошибка подключения к Supabase:', error.message)
    } else {
      console.log('✅ Подключение к Supabase успешно! Доступно карточек:', count)
    }
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
