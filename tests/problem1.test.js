/*
    Napisz funkcję 'map', przyjmującą jako argumenty  tablicę oraz funkcję mapującą i zwracającą nową
    tablicę, zawierającą wyniki wywołań funkcji mapującej z poszczególnymi elementami tablicy wejściowej

    Przykład:

    console.log(map([1,2,3], v => v + 1)) // [2,3,4]
*/

describe('problem1 - map', () => {
    it('returns an array', () => {
        expect(map([1, 2, 3], v => v)).toBeInstanceOf(Array);
    });

    it('calls the projection function on each element', () => {
        const projection = jest.fn(v => v);

        map([1, 2, 3], projection);

        expect(projection).toHaveBeenCalledTimes(3);
    });

    it('return an array with results of the projection function', () => {
        expect(map([1, 2, 3], v => v + 2)).toEqual([3, 4, 5]);
    });
});