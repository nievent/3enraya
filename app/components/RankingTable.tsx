'use client';

import React from 'react';
import styles from './RankingTable.module.css';

interface PlayerStats {
    nombre: string;
    victorias: number;
    empates: number;
    derrotas: number;
    }

const data: PlayerStats[] = [
    { nombre: 'Jugador 1', victorias: 5, empates: 2, derrotas: 3 },
    { nombre: 'IA', victorias: 3, empates: 2, derrotas: 5 },
    { nombre: 'Invitado', victorias: 1, empates: 1, derrotas: 8 },
];

export default function RankingTable() {
    return (
        <div className={styles.wrapper}>
        <h2>🏆 Ranking</h2>
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Jugador</th>
                <th>Victorias</th>
                <th>Empates</th>
                <th>Derrotas</th>
            </tr>
            </thead>
            <tbody>
            {data.map((jugador, idx) => (
                <tr key={idx}>
                <td>{jugador.nombre}</td>
                <td>{jugador.victorias}</td>
                <td>{jugador.empates}</td>
                <td>{jugador.derrotas}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
