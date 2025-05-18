'use client';

import React, { useState, useEffect } from 'react';
import styles from './Board.module.css';
import VictoryBanner from './VictoryBanner';

type Player = 'X' | 'O' | null;
interface BoardProps {
  playerName: string;
}
const playerSymbol: string = 'X';
export default function Board({ playerName }: BoardProps) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [showBanner, setShowBanner] = useState(false);
  
useEffect(() => {
  const makeIaMove = async () => {
    const res = await fetch('/api/ia-move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board }),
    });

    const data = await res.json();
    const iaMove = data.move;

    if (iaMove !== null) {
      const newBoard = [...board];
      newBoard[iaMove] = 'O';
      setBoard(newBoard);
      setCurrentPlayer('X');
    }
  };

  if (currentPlayer === 'O' && !checkWinner(board)) {
    const timeout = setTimeout(() => makeIaMove(), 500); // 0.5s "piensa"
    return () => clearTimeout(timeout);
  }
}, [currentPlayer, board]);




const handleClick = (index: number) => {
  if (board[index] || checkWinner(board) || currentPlayer !== 'X') return;

  const newBoard = [...board];
  newBoard[index] = 'X';
  setBoard(newBoard);
  setCurrentPlayer('O');
};


  const checkWinner = (b: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, bIdx, c] of lines) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return b[a];
      }
    }

    return null;
  };

  const winner = checkWinner(board);

useEffect(() => {
  if (winner && !showBanner) {
    setShowBanner(true);

    const resultado =
      winner === null
        ? 'empate'
        : winner === playerSymbol
        ? 'victoria'
        : 'derrota';

fetch('/api/save-result', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ganador: winner, jugador: playerName, resultado }),
})
  .then(res => res.json())
  .then(data => {
    console.log('✔️ Partida registrada en MongoDB:', data);
  })
  .catch(err => {
    console.error('❌ Error al guardar la partida:', err);
  });

  }
}, [winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setShowBanner(false);
  };

  return (
    <div className={styles.board}>
    <VictoryBanner
      winner={showBanner && winner ? winner : null}
      onClose={() => setShowBanner(false)}
      playerName={playerName}
      playerSymbol={playerSymbol}
    />


      <h2>{winner ? `Ganador: ${winner}` : `Turno de: ${currentPlayer}`}</h2>
      <p>Jugador: {playerName}</p>
      <div className={styles.grid}>
        {board.map((cell, idx) => (
          <button key={idx} className={styles.cell} onClick={() => handleClick(idx)}>
            {cell}
          </button>
        ))}
      </div>

      <button className={styles.resetButton} onClick={resetGame}>
        Reiniciar juego
      </button>
    </div>
  );
}
