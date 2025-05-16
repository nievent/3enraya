'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import styles from './VictoryBanner.module.css';

interface VictoryBannerProps {
  winner: string | null;
  onClose: () => void;
}

export default function VictoryBanner({ winner, onClose }: VictoryBannerProps) {
  useEffect(() => {
    if (winner) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999
      });
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar banner">
          ×
        </button>
        <div className={styles.content}>
          ¡{winner} ha ganado la partida! 
        </div>
      </div>
    </>
  );
}
