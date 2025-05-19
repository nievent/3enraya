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

//casos esquina
//que sea un tablero 3x3 con X/O/null
function isValidBoard(board: any): board is Player[] {
    return (
        Array.isArray(board) &&
        board.length === 9 &&
        board.every(cell => cell === 'X' || cell === 'O' || cell === null)
    );
}

//que no haya una victoria de ambos jugadores
function countWinners(board: Player[]): { x: number; o: number } {
    let xWins = 0;
    let oWins = 0;

    for (const [a, b, c] of winningLines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === 'X') xWins++;
            if (board[a] === 'O') oWins++;
        }
    }

    return { x: xWins, o: oWins };
}

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
        console.error('❌ Error interno en /api/ia-move:', err);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}