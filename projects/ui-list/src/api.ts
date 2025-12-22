import { data, type DataItem } from './data';

export async function api(): Promise<DataItem[]> {
  // Создаем Promise, который просто ждет 1 секунду, и ждем его
  await new Promise(resolve => setTimeout(resolve, 1000));

  // После ожидания просто возвращаем данные.
  // Ключевое слово 'async' автоматически обернет 'data' в Promise.
  return data;
}


// import { data, type DataItem } from './data'

// export function api(): Promise<Array<DataItem>> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data)
//     }, 0)
//   })
// }
