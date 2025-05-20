export type Player = 'X' | 'O' | null;

export const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];



//casos esquina
//que sea un tablero 3x3 con X/O/null
export function isValidBoard(board: any): board is Player[] {
    return (
        Array.isArray(board) &&
        board.length === 9 &&
        board.every(cell => cell === 'X' || cell === 'O' || cell === null)
    );
}



//que no haya una victoria de ambos jugadores
export function countWinners(board: Player[]): { x: number; o: number } {
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
export function findBestMove(board: Player[]): number | null {
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
