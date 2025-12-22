import { useEffect, useState, type FC, type ChangeEvent } from 'react';
import { loadItems } from './fetch';
import type { DataItem } from './data';
import './App.css'

interface AppProps {
  // Можно добавить пропсы при необходимости
}

const App: FC<AppProps> = () => {
  const [items, setItems] = useState<DataItem[] | []>([])
  const [filteredItems, setFilteredItems] = useState<DataItem[] | []>(items)
  const [sortedItems, setSortedItems] = useState<DataItem[] | []>(filteredItems);
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
      const filteredItems = items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      setFilteredItems(filteredItems)

  }, [items, search])

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setSearch(value)
  }

  function sortWithLocale(direction: 'asc' | 'desc') {
    const sorted = [...filteredItems].sort((a, b) => {
      // Используем localeCompare с указанием языка
      const comparison = a.title.localeCompare(
        b.title,
        'ru', // язык сортировки
        {
          sensitivity: 'base', // игнорирует регистр и акценты
          numeric: true // для чисел в строках
        }
      );

      return direction === 'asc' ? comparison : -comparison;
    });

    setSortedItems(sorted);
  };

  return (
    <div className="App">
      <h1>Список </h1>
      <h3>Сортировка</h3>
      <button onClick={() => sortWithLocale('asc')}>↑ A-Я/A-Z</button>
      <button onClick={() => sortWithLocale('desc')}>↓ Я-А/Z-A</button>
      <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={handleSearch}
      />
      <ul>
        {
          sortedItems.map((item) => {
            return (<li key={item.id}>{item.title}</li>)
          })
        }
      </ul>
    </div>
  );
};

export default App;
