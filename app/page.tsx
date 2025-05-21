'use client';

import { useState } from 'react';
import Board from './components/Board';
import RankingTable from './components/RankingTable';
import styles from './page.module.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const [nameEntered, setNameEntered] = useState(false);

  const handleStart = () => {
    if (playerName.trim()) {
      setNameEntered(true);
    }
  };

  return (
      <Provider store={store}>
        <main className={styles.main}>
          {!nameEntered ? (
            <div className={styles.welcome}>
              <h1>¡Bienvenido a 3 en Raya!</h1>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className={styles.input}
                />
              <button onClick={handleStart} className={styles.button}>
                Empezar
              </button>
            </div>
          ) : (
            <>
              <Board playerName={playerName} />
              <RankingTable />
            </>
          )}
        </main>
      </Provider>
  );
}
