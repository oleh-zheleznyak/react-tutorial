import { Winner } from '../Winner';

describe('Winner', ()=>{
    it('constructor should assign properties',()=> {
        const mark = 'X';
        const points = [1,2,3];
        const winner = new Winner(mark, points);

        expect(winner.mark).toBe(mark);
        expect(winner.points).toBe(points);
    })
});