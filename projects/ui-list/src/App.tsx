import { useEffect, useState, type FC, type ChangeEvent } from 'react';
import { loadItems } from './fetch';
import type { DataItem } from './data';
import './App.css'

interface AppProps {
  // Можно добавить пропсы при необходимости
}

type DirectionType = "NOT" | "ASC" | "DESK";

const App: FC<AppProps> = () => {
  const [items, setItems] = useState<DataItem[] | []>([])
  const [filteredItems, setFilteredItems] = useState<DataItem[] | []>(items)
  const [direction, setDirection] = useState<DirectionType>("NOT");
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await loadItems() || []

        setItems(response)
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    }

    fetchItems()
  }, [items])

  useEffect(() => {
      const filtered = items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      const sorted = sortWithLocale(filtered)
      setFilteredItems(sorted)

  }, [items, search, direction])

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setSearch(value)
  }

  function sortWithLocale(filtered: DataItem[]) {
    if (direction === "NOT") {
      return filtered
    }

    const sorted = [...filtered].sort((a, b) => {
      // Используем localeCompare с указанием языка
      const comparison = a.title.localeCompare(
        b.title,
        'ru', // язык сортировки
        {
          sensitivity: 'base', // игнорирует регистр и акценты
          numeric: true // для чисел в строках
        }
      );

      return direction === "ASC" ? comparison : -comparison;
    });

    return sorted;
  };

  return (
    <div className="App">
      <h1>Список </h1>
      <h3>Сортировка</h3>
      <button onClick={() => setDirection("ASC")} className={direction === "ASC" ? "active" : ''}> ↑ A-Я/A-Z</button>
      <button onClick={() => setDirection("DESK")} className={direction === "DESK" ? "active" : ''}> ↓ Я-А/Z-A</button>
      <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={handleSearch}
      />
      <ul>
        {
          filteredItems.map((item) => {
            return (<li key={item.id}>{item.title}</li>)
          })
        }
      </ul>
    </div>
  );
};

export default App;
