import { NextResponse } from 'next/server';
import {
    isValidBoard,
    countWinners,
    findBestMove,
} from '@/utils/ai'; 


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const board = body.board;

        if (!isValidBoard(board)) {
            return NextResponse.json(
                { error: 'Tablero inválido. Debe ser un array de 9 elementos con "X", "O" o null.' },
                { status: 400 }
            );
        }

        const { x, o } = countWinners(board);
        if (x > 0 && o > 0) {
            return NextResponse.json(
                { error: 'El tablero es inválido: contiene más de un ganador.' },
                { status: 400 }
            );
            }

        const move = findBestMove(board);

        if (move === null) {
            return NextResponse.json(
                { error: 'No hay movimientos posibles.' },
                { status: 400 }
            );
        }

        return NextResponse.json({ move });
    } catch (err) {
        console.error('Error interno en /api/ia-move:', err);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}