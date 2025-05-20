import { isValidBoard, countWinners, findBestMove } from '../utils/ai';

type Player = 'X' | 'O' | null;

describe('IA 3enRaya', () => {
    test('valida tablero correcto', () => {
        const board: Player[] = ['X', 'O', null, 'X', null, 'O', null, null, null];
        expect(isValidBoard(board)).toBe(true);
    });

    test('rechaza tablero incorrecto', () => {
        const badBoard = ['X', 'O', 'Z', null]; //corto y con valores no validos
        expect(isValidBoard(badBoard)).toBe(false);
    });

    test('detecta múltiples ganadores', () => {
        const board: Player[] = ['X', 'X', 'X', null, null, null, 'O', 'O', 'O'];
        const { x, o } = countWinners(board);
        expect(x).toBe(1);
        expect(o).toBe(1);
    });

    test('la IA gana si puede', () => {
        const board: Player[] = ['O', 'O', null, null, 'X', null, null, null, 'X'];
        const move = findBestMove(board);
        expect(move).toBe(2); 
    });

    test('la IA bloquea al jugador si está a punto de ganar', () => {
        const board: Player[] = ['X', 'X', null, null, 'O', null, null, null, null];
        const move = findBestMove(board);
        expect(move).toBe(2); 
    });
});
