'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import styles from './VictoryBanner.module.css';

interface VictoryBannerProps {
  winner: string | null;
  onClose: () => void;
  playerName: string;
  playerSymbol: 'X' | 'O' | null; 
}


export default function VictoryBanner({ winner, onClose, playerName, playerSymbol }: VictoryBannerProps) {
  useEffect(() => {
    if (winner) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999,
      });
    }
  }, [winner]);

  if (!winner) return null;

  const isPlayerWinner = winner === playerSymbol;
  const winnerText = isPlayerWinner ? `¡${playerName} ha ganado la partida!` : '¡La IA ha ganado la partida!';

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
        <div className={`${styles.modal} ${winner === 'O' ? styles.O : ''}`}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar banner">
            ×
          </button>
        <div className={styles.content}>{winnerText}</div>
      </div>
    </>
  );
}
