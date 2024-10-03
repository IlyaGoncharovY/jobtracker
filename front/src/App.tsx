import './App.css';
import {useEffect} from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const tg = window.Telegram.webApp;

function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <>
      <button onClick={onClose}>
         закрыть
      </button>
    </>
  );
}

export default App;
