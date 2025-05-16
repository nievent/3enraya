'use client';

import React, { useState, useEffect } from 'react';
import styles from './Board.module.css';
import VictoryBanner from './VictoryBanner';

type Player = 'X' | 'O' | null;

export default function Board() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [showBanner, setShowBanner] = useState(false);

  const handleClick = (index: number) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
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
    if (winner) {
      setShowBanner(true);
    }
  }, [winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setShowBanner(false);
  };

  return (
    <div>
    <VictoryBanner winner={showBanner && winner ? winner : null} onClose={() => setShowBanner(false)} />


      <h2>{winner ? `Ganador: ${winner}` : `Turno de: ${currentPlayer}`}</h2>

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
