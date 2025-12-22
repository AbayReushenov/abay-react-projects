import type { FC } from 'react';

interface AppProps {
  // Можно добавить пропсы при необходимости
}

const App: FC<AppProps> = () => {
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
};

export default App;
