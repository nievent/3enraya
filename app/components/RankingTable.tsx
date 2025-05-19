'use client';

import React, { useEffect, useState } from 'react';
import styles from './RankingTable.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface PlayerStats {
    nombre: string;
    victorias: number;
    empates: number;
    derrotas: number;
    }


export default function RankingTable() {
    const [ranking, setRanking] = useState<PlayerStats[]>([]);
    const refreshKey = useSelector((state: RootState) => state.ranking.refreshKey);
    const fetchRanking = async () => {
        try {
            const res = await fetch('/api/ranking');
            const data = await res.json();
            setRanking(data.ranking);
        } catch (err) {
            console.error('Error al cargar el ranking:', err);
        }
    };
    useEffect(() => {
        fetchRanking();
    }, []);

    useEffect(() => {
        fetchRanking();
    }, [refreshKey]);

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
            {ranking.map((jugador, idx) => (
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
