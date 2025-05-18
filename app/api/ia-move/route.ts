import { NextResponse } from 'next/server';

type Player = 'X' | 'O' | null;

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//No se programar una inteligencia artificial, pero aquí van los casos en los que quiero que la IA sea más inteligente:
// IA = 'O', Jugador = 'X'
function findBestMove(board: Player[]): number | null {
  // 1. ¿Puedo ganar?
    for (const [a, b, c] of winningLines) {
        const line = [board[a], board[b], board[c]];
        if (line.filter(v => v === 'O').length === 2 && line.includes(null)) {
            return [a, b, c].find(i => board[i] === null)!;
        }
    }

    // 2. ¿Puede ganar el jugador? Bloquéalo
    for (const [a, b, c] of winningLines) {
        const line = [board[a], board[b], board[c]];
        if (line.filter(v => v === 'X').length === 2 && line.includes(null)) {
            return [a, b, c].find(i => board[i] === null)!;
        }
    }

  // 3. ¿Está el centro libre?
    if (board[4] === null) return 4;

  // 4. ¿Hay alguna esquina libre?
    const corners = [0, 2, 6, 8];
    for (const i of corners) {
        if (board[i] === null) return i;
    }

  // 5. Cualquier espacio libre
    const empty = board
        .map((cell, idx) => (cell === null ? idx : null))
        .filter((i): i is number => i !== null);

    return empty.length ? empty[0] : null;
}

export async function POST(req: Request) {
    const { board }: { board: Player[] } = await req.json();

    const move = findBestMove(board);
    return NextResponse.json({ move });
}
