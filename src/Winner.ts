export class Winner {
    constructor(
        readonly mark: string,
        readonly points: number[]
    ) {
    }

    static fieldSize = 4;
    static itemsInRow = 3;

    static row(index: number): number {
        return index / this.fieldSize;
    }

    static col(index: number): number {
        return index % this.fieldSize;
    }

    static nextHorizontal(index: number|undefined) : number | undefined {
        if (index === undefined) return index;
        const col = this.col(index);
        if (col<this.fieldSize-1) return index+1;
        return undefined;
    }

    static calculateWinner(squares: string[]) : Winner | undefined {
        for (let i=0; i<squares.length; i++) {
            const startMark = squares[i];
            if ((startMark?.length ?? 0) < 1) continue;

            let horizontals = [i];
            let nextHorizontalIndex : number | undefined = i;
            for (let j=0; j<this.itemsInRow; j++) {
                nextHorizontalIndex = this.nextHorizontal(nextHorizontalIndex);
                if (nextHorizontalIndex) {
                    const nextHorizontalMark = squares[nextHorizontalIndex];
                    if (startMark === nextHorizontalMark){
                        horizontals.push(nextHorizontalIndex);
                    }
                    else {
                        break;
                    }
                }
            }
            if (horizontals.length == this.itemsInRow) return  new Winner(startMark,horizontals);
        }
        return undefined;
    }
}