'use client';

import React, { useState, useEffect } from 'react';
import styles from './Board.module.css';
import VictoryBanner from './VictoryBanner';
import { useDispatch } from 'react-redux';
import { incrementRefreshKey } from '@/store/rankingSlice';

type Player = 'X' | 'O' | null;
interface BoardProps {
  playerName: string;
}
const playerSymbol: string = 'X';
export default function Board({ playerName }: BoardProps) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [showBanner, setShowBanner] = useState(false);
  const dispatch = useDispatch();
  

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
    const timeout = setTimeout(() => makeIaMove(), 500);
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


const checkWinner = (board: Player[]): Player => {
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
//al principio elegi la b para board y luego abc para este for pero me resultó un lio mental y lo he cambiado. Hace lo mismo y creo que es mas claro asi
  for (const [i, j, k] of lines) {
    if (board[i] && board[i] === board[j] && board[i] === board[k]) {
      return board[i];
    }
  }

  return null;
};


  const winner = checkWinner(board);
  const playerSymbol: Player = 'X';
  const iaSymbol: Player = 'O';
  const nombreDelJugador = playerName;
  const nombreTurno = currentPlayer === playerSymbol ? nombreDelJugador : 'IA';
  const ganadorNombre =
    winner === playerSymbol ? nombreDelJugador
    : winner === iaSymbol ? 'IA'
    : winner === null ? 'Empate'
    : '';

  const isDraw = !winner && board.every(cell => cell !== null);
  useEffect(() => {
    const gameOver = winner || isDraw;
    if (gameOver && !showBanner) {
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
        .then((res) => res.json())
        .then((data) => {
          console.log('✔️ Partida registrada en MongoDB:', data);
        })
        .then(() => {
          dispatch(incrementRefreshKey());
        })
        .catch((err) => {
          console.error('❌ Error al guardar la partida:', err);
        });
    }
  }, [winner, isDraw]);

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


      <h2>
        {winner === null && board.every(cell => cell !== null)
          ? '🤝 ¡Empate!'
          : winner
          ? `Ganador: ${ganadorNombre}`
          : `Turno de: ${nombreTurno}`}
      </h2>
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
