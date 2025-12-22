import { api } from './api'; // Предположим, код выше сохранен в './api.ts'

export async function loadItems() {
  console.log('Загрузка данных...');
  try {
    const items = await api(); // Ждем, пока Promise разрешится
    // Здесь можно что-то сделать с данными, например, отобразить их
    console.log('Данные успешно загружены:', items);

    return items
  } catch (error) {
    console.error('Произошла ошибка при загрузке данных:', error);
  }
}
