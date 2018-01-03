/*
    Napisz funkcję "zip", przyjmującą tablicą dowolną ilość tablic i zwracającą nową tablicę, 
    elementami której będą tablice z kolejno: pierwszym elementem z pierwszej tablicy, 
    pierwszym elementem drugiej tablicy...pierwszym elementem z n-tej tablicy... itd.

    Przykład:

    zip([1, 2], ['a', 'b']) === [[1, 'a'], [2, 'b']]

    Zestawów elementów powinno być tyle, ile elementów w najkrótszej tablicy.
*/

describe('problem3 - zip', () => {
    it('returns an Array', () => {
        expect(zip([1, 2], ['a', 'b'])).toBeInstanceOf(Array);
    });

    it('matches a1[0] with a2[0]...an[0], a1[1] with a2[1]...an[1] etc.', () => {
        expect(zip([1, 2, 3], ['a', 'b', 'c'], [true, false, {}])).toEqual([
            [1, 'a', true],
            [2, 'b', false],
            [3, 'c', {}],
        ]);
    });

    it('returns as many pairs as elements in the shortest array', () => {
        expect(
            zip([1, 2, 3, 4, 5], ['a', 'b', 'c'], [true, false]).length,
        ).toBe(2);
    });
});
