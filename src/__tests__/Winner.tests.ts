import { Winner } from '../Winner';

describe('Winner', () => {
    it('constructor should assign properties', () => {
        const mark = 'X';
        const points = [1, 2, 3];
        const winner = new Winner(mark, points);

        expect(winner.mark).toBe(mark);
        expect(winner.points).toBe(points);
    });

    it('should detect horizontal winner', () => {
        const gameField =
            [
                'O', 'X', 'X', 'X',
                '', '', '', '',
                '', '', '', '',
                '', '', '', ''
            ];
        const winner = Winner.calculateWinner(gameField);
        expect(winner).toBeTruthy();
    });

    it('should detect horizontal winner starting at zero', () => {
        const gameField =
            [
                'X', 'X', 'X', '',
                'O', 'O', '', '',
                '', '', '', '',
                '', '', '', ''
            ];
        const winner = Winner.calculateWinner(gameField);
        expect(winner).toBeTruthy();
        expect(winner?.points).toEqual([0,1,2]);
    });

    it('should not detect winner on first step', () => {
        const gameField =
            [
                'X', '', '', '',
                '', '', '', '',
                '', '', '', '',
                '', '', '', ''
            ];
        const winner = Winner.calculateWinner(gameField);
        expect(winner).toBeFalsy();
    });

    it('should not detect horizontal winner on separate rows', () => {
        const gameField =
            [
                '', '', 'X', 'X',
                'X', '', 'O', '',
                '', 'O', '', '',
                '', '', '', ''
            ];
        const winner = Winner.calculateWinner(gameField);
        expect(winner).toBeFalsy();
    });
});